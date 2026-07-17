/**
 * grok.hot — main client script
 * Theme toggle · nav · smooth scroll · reveals · embers · form · stats
 * Lightweight, no dependencies.
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* --------------------------------------------------------------------------
   * Theme toggle (dark default, persisted)
   * ------------------------------------------------------------------------ */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const THEME_KEY = "grok-hot-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* private mode / blocked storage — ignore */
    }
    if (themeToggle) {
      const next = theme === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", `Switch to ${next} mode`);
    }
    // Sync browser chrome color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0a0a0b" : "#f7f2ec");
    }
  }

  // Init from storage or keep HTML default (dark)
  const stored = getStoredTheme();
  if (stored === "light" || stored === "dark") {
    setTheme(stored);
  } else {
    setTheme("dark");
  }

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  /* --------------------------------------------------------------------------
   * Mobile nav
   * ------------------------------------------------------------------------ */
  const burger = document.getElementById("nav-burger");
  const nav = document.getElementById("primary-nav");
  const navLinks = nav?.querySelectorAll(".nav-link") ?? [];

  function setNavOpen(open) {
    nav?.classList.toggle("is-open", open);
    burger?.setAttribute("aria-expanded", String(open));
    burger?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  burger?.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    setNavOpen(open);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });

  /* --------------------------------------------------------------------------
   * Header scroll state + active section spy
   * ------------------------------------------------------------------------ */
  const header = document.querySelector(".site-header");
  const sectionIds = ["about", "features", "gallery", "testimonials", "contact"];

  function onScrollChrome() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function updateActiveNav() {
    const offset = header ? header.offsetHeight + 40 : 100;
    let current = "";

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top - offset <= 0) current = id;
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const match = href === `#${current}`;
      link.classList.toggle("is-active", match);
    });
  }

  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        onScrollChrome();
        updateActiveNav();
        scrollTicking = false;
      });
    },
    { passive: true }
  );

  onScrollChrome();
  updateActiveNav();

  /* --------------------------------------------------------------------------
   * Smooth scroll for in-page anchors (respects reduced motion)
   * ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const headerH = header?.offsetHeight ?? 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerH + 1;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      // Move focus for a11y without jumping
      if (typeof target.focus === "function") {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  /* --------------------------------------------------------------------------
   * Scroll-triggered reveals (IntersectionObserver)
   * ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* --------------------------------------------------------------------------
   * Hero stat counters
   * ------------------------------------------------------------------------ */
  function animateCount(el, target, duration) {
    if (prefersReducedMotion) {
      el.textContent = String(target);
      return;
    }

    const start = performance.now();
    const from = 0;

    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(from + (target - from) * eased));
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const statValues = document.querySelectorAll("[data-count]");
  if (statValues.length && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.getAttribute("data-count") || 0);
          animateCount(el, target, 1400);
          obs.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    statValues.forEach((el) => statsObserver.observe(el));
  } else {
    statValues.forEach((el) => {
      el.textContent = el.getAttribute("data-count") || el.textContent;
    });
  }

  /* --------------------------------------------------------------------------
   * Ember particle canvas (decorative, paused when off-screen / reduced motion)
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById("ember-canvas");

  if (canvas && !prefersReducedMotion && canvas.getContext) {
    const ctx = canvas.getContext("2d", { alpha: true });
    let particles = [];
    let rafId = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales gently with viewport; cap for mobile perf
      const count = Math.min(48, Math.floor((width * height) / 28000));
      particles = Array.from({ length: count }, () => spawn(true));
    }

    function spawn(randomY) {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.25 + Math.random() * 0.85,
        vx: (Math.random() - 0.5) * 0.35,
        life: 0.35 + Math.random() * 0.65,
        hue: Math.random() > 0.5 ? 18 : 350, // orange / hot pink
      };
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.15;
        p.life -= 0.0015;

        if (p.life <= 0 || p.y < -10) {
          particles[i] = spawn(false);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.life * 0.7})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    resize();
    start();

    let resizeTimer;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
      },
      { passive: true }
    );

    // Pause when tab hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });
  }

  /* --------------------------------------------------------------------------
   * Contact form (client-side validation + simulated success)
   * Production: swap submit handler for your API / Formspree / etc.
   * ------------------------------------------------------------------------ */
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  function showFieldError(name, show) {
    const input = form?.elements.namedItem(name);
    const err = form?.querySelector(`[data-error-for="${name}"]`);
    if (input && "classList" in input) {
      input.classList.toggle("is-invalid", show);
    }
    if (err) {
      err.hidden = !show;
    }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form || !submitBtn || !statusEl) return;

    // Use elements.namedItem — form.name is the form's name property, not the input
    const nameInput = form.elements.namedItem("name");
    const emailInput = form.elements.namedItem("email");
    const messageInput = form.elements.namedItem("message");
    const name = String((nameInput && "value" in nameInput ? nameInput.value : "") || "").trim();
    const email = String((emailInput && "value" in emailInput ? emailInput.value : "") || "").trim();
    const message = String((messageInput && "value" in messageInput ? messageInput.value : "") || "").trim();

    let valid = true;
    showFieldError("name", name.length < 2);
    if (name.length < 2) valid = false;
    showFieldError("email", !validateEmail(email));
    if (!validateEmail(email)) valid = false;
    showFieldError("message", message.length < 10);
    if (message.length < 10) valid = false;

    if (!valid) {
      statusEl.hidden = false;
      statusEl.className = "form-status is-error";
      statusEl.textContent = "Fix the fields above and try again.";
      return;
    }

    const label = submitBtn.querySelector(".btn-label");
    const loading = submitBtn.querySelector(".btn-loading");
    submitBtn.disabled = true;
    if (label) label.hidden = true;
    if (loading) loading.hidden = false;

    // Simulated network — replace with real endpoint in production backend
    await new Promise((r) => setTimeout(r, 900));

    // Demo success payload (no external network required for static deploy)
    console.info("[grok.hot] contact signal", { name, email, message });

    form.reset();
    ["name", "email", "message"].forEach((f) => showFieldError(f, false));

    statusEl.hidden = false;
    statusEl.className = "form-status is-success";
    statusEl.textContent = "Signal received. We’ll be in touch — stay hot.";

    submitBtn.disabled = false;
    if (label) label.hidden = false;
    if (loading) loading.hidden = true;
  });

  // Live-clear errors on input
  form?.addEventListener("input", (e) => {
    const t = e.target;
    if (t && t.name) showFieldError(t.name, false);
  });

  /* --------------------------------------------------------------------------
   * Footer year
   * ------------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
