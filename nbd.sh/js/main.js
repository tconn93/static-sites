/* ==========================================================================
   nbd.sh — interactions
   Theme toggle · mobile nav · scroll-reveal · stat counters ·
   hero terminal typing · copy-to-clipboard · active-section nav highlight
   No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme toggle ---------- */
  // Default is dark (set in HTML). Persist the user's choice.
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = docEl.dataset.theme === "dark" ? "light" : "dark";
      docEl.dataset.theme = next;
      try {
        localStorage.setItem("nbd-theme", next);
      } catch (e) {
        /* private mode: ignore */
      }
    });
  }

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  var menu = document.getElementById("navMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    // close the panel after choosing a section
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- scroll-triggered reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // old browser or reduced motion: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---------- animated stat counters ---------- */
  // Counts up when the stats grid scrolls into view.
  function animateCount(el) {
    var target = parseFloat(el.dataset.count || "0");
    var decimals = parseInt(el.dataset.decimals || "0", 10);
    var suffix = el.dataset.suffix || "";
    var duration = 1400;
    var start = null;

    function format(v) {
      return (
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + suffix
      );
    }

    if (reducedMotion) {
      el.textContent = format(target);
      return;
    }

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statEls = document.querySelectorAll(".stat__num");
  if (statEls.length) {
    if ("IntersectionObserver" in window) {
      var statObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              statObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      statEls.forEach(function (el) {
        statObserver.observe(el);
      });
    } else {
      statEls.forEach(animateCount);
    }
  }

  /* ---------- hero terminal typing ---------- */
  // Types a short deploy session into the hero terminal, then loops.
  var term = document.getElementById("heroTerm");
  if (term) {
    // [cssClass, text, isTyped] — typed lines animate char-by-char,
    // output lines appear after a short beat like real command output.
    var SCRIPT = [
      ["ln-cmd", "$ ship --prod --region all", true],
      ["ln-dim", "  building… ok (0.4s)", false],
      ["ln-dim", "  tests: 2,148 passed, 0 failed", false],
      ["ln-ok", "  ✓ deployed to 9 regions in 1.2s", false],
      ["ln-cmd", "$ uptime --check", true],
      ["ln-ok", "  ✓ 99.999% — as always", false],
      ["ln-accent", "  nbd.", false]
    ];

    function renderStatic() {
      term.innerHTML = SCRIPT.map(function (l) {
        return '<span class="' + l[0] + '">' + escapeHtml(l[1]) + "</span>";
      }).join("\n");
    }

    function escapeHtml(s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    if (reducedMotion) {
      renderStatic();
    } else {
      runScript();
    }

    function runScript() {
      term.textContent = "";
      var li = 0;

      function nextLine() {
        if (li >= SCRIPT.length) {
          // hold the finished session, then loop
          setTimeout(function () {
            term.textContent = "";
            li = 0;
            nextLine();
          }, 4200);
          return;
        }
        var line = SCRIPT[li];
        var span = document.createElement("span");
        span.className = line[0];
        term.appendChild(span);

        if (line[2]) {
          // typed command: char-by-char with a caret
          var caret = document.createElement("span");
          caret.className = "type-caret";
          term.appendChild(caret);
          var ci = 0;
          (function typeChar() {
            if (ci < line[1].length) {
              span.textContent += line[1].charAt(ci++);
              setTimeout(typeChar, 26 + Math.random() * 40);
            } else {
              caret.remove();
              term.appendChild(document.createTextNode("\n"));
              li++;
              setTimeout(nextLine, 180);
            }
          })();
        } else {
          // output line: appears whole after a beat
          span.textContent = line[1];
          term.appendChild(document.createTextNode("\n"));
          li++;
          setTimeout(nextLine, 300 + Math.random() * 250);
        }
      }
      nextLine();
    }
  }

  /* ---------- copy install command ---------- */
  var copyBtn = document.getElementById("copyBtn");
  var copyLabel = document.getElementById("copyLabel");
  var installCmd = document.getElementById("installCmd");
  if (copyBtn && installCmd) {
    copyBtn.addEventListener("click", function () {
      var text = installCmd.textContent;
      function done() {
        copyBtn.classList.add("copied");
        if (copyLabel) copyLabel.textContent = "copied!";
        setTimeout(function () {
          copyBtn.classList.remove("copied");
          if (copyLabel) copyLabel.textContent = "copy";
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallbackCopy);
      } else {
        fallbackCopy();
      }
      function fallbackCopy() {
        // execCommand fallback for older browsers / non-secure contexts
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done();
        } catch (e) {
          /* clipboard unavailable — nothing else to do */
        }
        ta.remove();
      }
    });
  }

  /* ---------- active-section nav highlight ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav__link[href^='#']");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var current = null;
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) current = entry.target.id;
        });
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + current
          );
        });
      },
      // fire when a section occupies the middle band of the viewport
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) {
      sectionObserver.observe(s);
    });
  }
})();
