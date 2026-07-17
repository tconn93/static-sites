/* ============================================================
   YEET.PW — Main JavaScript
   Dark/light toggle, scroll animations, particles, counters,
   smooth scroll, mobile menu, form handling, feature card glow
   ============================================================ */

;(function () {
  'use strict';

  /* --------------------------------------------------------
     DOM REFS
     -------------------------------------------------------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  const header      = $('#header');
  const hamburger   = $('#hamburger');
  const mobileMenu  = $('#mobileMenu');
  const navLinks    = $$('.nav__link, .mobile-menu__link');
  const themeToggle = $('#themeToggle');
  const html        = document.documentElement;
  const signupForm  = $('#signupForm');
  const formMessage = $('#formMessage');
  const particleCanvas = $('#particleCanvas');
  const revealEls   = $$('.reveal-up, .reveal-up-delay, .reveal-up-delay-2, .reveal-up-delay-3, .reveal-up-delay-4');
  const featureCards = $$('.feature-card');
  const statNumbers = $$('.stat-card__number[data-count]');

  /* --------------------------------------------------------
     THEME TOGGLE
     -------------------------------------------------------- */
  function getTheme() {
    return localStorage.getItem('yeet-theme') || 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('yeet-theme', theme);
    const metaTheme = $('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#050505' : '#fafafa';
    }
    const colorScheme = $('meta[name="color-scheme"]');
    if (colorScheme) {
      colorScheme.content = theme === 'dark' ? 'dark light' : 'light dark';
    }
  }

  // Initialize theme from localStorage
  setTheme(getTheme());

  themeToggle.addEventListener('click', function () {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    // Add a quick transition class to body for smooth color change
    document.body.style.transition = 'background 0.4s cubic-bezier(0.65, 0, 0.35, 1), color 0.4s cubic-bezier(0.65, 0, 0.35, 1)';
    setTheme(next);
    // Re-init particles with new theme colors
    if (particles) initParticles();
    setTimeout(function () {
      document.body.style.transition = '';
    }, 400);
  });

  /* --------------------------------------------------------
     MOBILE MENU
     -------------------------------------------------------- */
  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (hamburger.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a mobile link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  /* --------------------------------------------------------
     HEADER SCROLL STATE
     -------------------------------------------------------- */
  let lastScrollY = 0;

  function updateHeader() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
    requestAnimationFrame(updateHeaderRAF);
  }

  var headerTicking = false;
  function updateHeaderRAF() {
    headerTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!headerTicking) {
      requestAnimationFrame(function () {
        updateHeader();
        headerTicking = false;
      });
      headerTicking = true;
    }
  }, { passive: true });

  // Initial check
  updateHeader();

  /* --------------------------------------------------------
     SCROLL-TRIGGERED REVEAL ANIMATIONS
     -------------------------------------------------------- */
  var revealObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Don't unobserve — let elements re-reveal if they scroll back
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* --------------------------------------------------------
     COUNTER ANIMATION (Stat numbers)
     -------------------------------------------------------- */
  function animateCounters() {
    statNumbers.forEach(function (el) {
      if (el.dataset.animated) return;

      var target = parseFloat(el.dataset.count);
      var isFloat = el.dataset.count.includes('.');
      var duration = 2000; // ms
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = target * eased;

        if (isFloat) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = Math.floor(current).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
        }
      }

      el.dataset.animated = 'true';
      requestAnimationFrame(step);
    });
  }

  // Observe stat cards for counter animation
  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    var statsSection = $('#about');
    if (statsSection) counterObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  /* --------------------------------------------------------
     PARTICLE SYSTEM (Hero canvas)
     -------------------------------------------------------- */
  var particles = null;

  function initParticles() {
    if (!particleCanvas) return;

    var ctx = particleCanvas.getContext('2d');
    var isDark = getTheme() === 'dark';

    // Resize canvas to match display size
    function resize() {
      var rect = particleCanvas.parentElement.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for perf
      particleCanvas.width = rect.width * dpr;
      particleCanvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);
      return { w: rect.width, h: rect.height };
    }

    var size = resize();

    // Create particles
    var count = Math.min(Math.floor((size.w * size.h) / 12000), 80);
    var dots = [];

    for (var i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * size.w,
        y: Math.random() * size.h,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        alphaSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    /** Draw a frame */
    function draw() {
      ctx.clearRect(0, 0, size.w, size.h);

      var primaryColor = isDark ? '0, 255, 136' : '0, 168, 90';
      var secondaryColor = isDark ? '255, 51, 102' : '212, 42, 85';

      // Draw connections
      for (var i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
          var dx = dots[i].x - dots[j].x;
          var dy = dots[i].y - dots[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            var alpha = (1 - dist / 100) * 0.08;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(' + primaryColor + ',' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach(function (d) {
        // Update position
        d.x += d.vx;
        d.y += d.vy;
        d.alpha += d.alphaSpeed;

        // Wrap around edges
        if (d.x < -10) d.x = size.w + 10;
        if (d.x > size.w + 10) d.x = -10;
        if (d.y < -10) d.y = size.h + 10;
        if (d.y > size.h + 10) d.y = -10;

        // Clamp alpha
        if (d.alpha > 0.6) d.alphaSpeed = -Math.abs(d.alphaSpeed);
        if (d.alpha < 0.1) d.alphaSpeed = Math.abs(d.alphaSpeed);
        d.alpha = Math.max(0.1, Math.min(0.6, d.alpha));

        // Draw dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        var color = Math.random() > 0.7 ? secondaryColor : primaryColor;
        ctx.fillStyle = 'rgba(' + color + ',' + d.alpha.toFixed(3) + ')';
        ctx.fill();
      });

      particles = requestAnimationFrame(draw);
    }

    // Cancel previous animation if any
    if (particles) cancelAnimationFrame(particles);
    draw();

    // Handle resize
    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        size = resize();
      }, 200);
    }, { passive: true });
  }

  // Start particles
  if (particleCanvas) initParticles();

  /* --------------------------------------------------------
     FEATURE CARD MOUSE GLOW TRACKING
     -------------------------------------------------------- */
  featureCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });

    card.addEventListener('mouseleave', function () {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });

  /* --------------------------------------------------------
     SMOOTH SCROLL FOR ALL ANCHOR LINKS
     (html scroll-behavior handles this but we add offset
      for the fixed header)
     -------------------------------------------------------- */
  // Adjust scroll position to account for fixed header
  // Using CSS scroll-padding-top on html would be ideal, but we add it via JS
  // for broader compat:
  html.style.scrollPaddingTop = getComputedStyle(html).getPropertyValue('--nav-height') || '4rem';

  /* --------------------------------------------------------
     SIGNUP FORM HANDLING
     -------------------------------------------------------- */
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailInput = $('#emailInput');
      var submitBtn = signupForm.querySelector('.cta__submit');
      var email = emailInput.value.trim();

      // Reset states
      emailInput.classList.remove('error');
      formMessage.textContent = '';
      formMessage.className = 'cta__form-message';

      // Validate
      if (!email) {
        emailInput.classList.add('error');
        formMessage.textContent = 'Email is required. Don\'t leave us hanging.';
        formMessage.classList.add('error');
        emailInput.focus();
        return;
      }

      // Basic email regex
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        formMessage.textContent = 'That doesn\'t look like a valid email. Try again.';
        formMessage.classList.add('error');
        emailInput.focus();
        return;
      }

      // Simulate submission
      submitBtn.classList.add('submitting');
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.classList.remove('submitting');
        submitBtn.disabled = false;
        formMessage.textContent = 'You\'re on the list! We\'ll hit you up when your spot opens. 🚀';
        formMessage.classList.add('success');
        emailInput.value = '';
        emailInput.blur();
      }, 1500);
    });

    // Clear error on input
    $('#emailInput').addEventListener('input', function () {
      this.classList.remove('error');
      formMessage.textContent = '';
      formMessage.className = 'cta__form-message';
    });
  }

  /* --------------------------------------------------------
     ACTIVE NAV LINK HIGHLIGHT ON SCROLL
     -------------------------------------------------------- */
  var sectionIds = ['hero', 'about', 'features', 'showcase', 'testimonials', 'cta'];
  var navLinkEls = $$('.nav__link');

  function updateActiveNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    var current = 'hero';

    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var top = el.offsetTop - 100;
      if (scrollY >= top) {
        current = id;
      }
    });

    navLinkEls.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + current) {
        link.style.color = 'var(--clr-primary)';
      } else {
        link.style.color = '';
      }
    });
  }

  var navTicking = false;
  window.addEventListener('scroll', function () {
    if (!navTicking) {
      requestAnimationFrame(function () {
        updateActiveNav();
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  /* --------------------------------------------------------
     PERFORMANCE: LAZY LOAD BENTO OVERLAYS
     (Show overlays immediately on touch devices since
      hover doesn't work)
     -------------------------------------------------------- */
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.documentElement.classList.add('touch-device');
    // On touch devices, bento overlays are always visible with reduced opacity
    var bentoCards = $$('.bento-card');
    bentoCards.forEach(function (card) {
      var overlay = card.querySelector('.bento-card__overlay');
      if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.background = 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.4) 50%, transparent 100%)';
      }
    });
  }

  /* --------------------------------------------------------
     INIT LOG
     -------------------------------------------------------- */
  if (typeof console !== 'undefined' && console.log) {
    var style = 'color: #00ff88; font-size: 1.2em; font-weight: bold;';
    console.log('%c🥏 YEET — thrown into orbit.', style);
    console.log('%cInterested in how this was built? Check the source — it\'s all vanilla.', 'color: #888;');
  }
})();
