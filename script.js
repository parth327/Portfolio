/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute("href") === `#${id}` ? "var(--paper)" : "";
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => navObserver.observe(s));
}

/* ---------- Scroll progress bar ---------- */
const progressBar = document.getElementById("scrollProgress");
function updateProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
}
document.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ---------- Cursor glow (desktop only) ---------- */
const cursorGlow = document.getElementById("cursorGlow");
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  let rafId = null;
  document.addEventListener("mousemove", (e) => {
    cursorGlow.classList.add("active");
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  });
  document.addEventListener("mouseleave", () => cursorGlow.classList.remove("active"));
}

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = Math.min(i % 4, 3) * 70;
            setTimeout(() => el.classList.add("in-view"), delay);
            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // No IntersectionObserver support: show everything immediately rather than leaving it hidden.
    revealEls.forEach((el) => el.classList.add("in-view"));
  }
}

/* ---------- Count-up stats ---------- */
// Markup already shows the final value (e.g. "5+") so it's correct with no JS.
// When JS runs, reset to 0 first and animate up for the count-up effect.
const statEls = document.querySelectorAll(".stat-number");
if (statEls.length && "IntersectionObserver" in window) {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 900;
        el.textContent = "0" + suffix;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach((el) => statObserver.observe(el));
}

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.setProperty("--mx", `${x * 0.18}px`);
    el.style.setProperty("--my", `${y * 0.35}px`);
  });
  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  });
});

/* ---------- Timeline scroll-fill rail ---------- */
const timeline = document.querySelector(".timeline");
const railFill = document.getElementById("railFill");
if (timeline && railFill && window.matchMedia("(min-width: 561px)").matches) {
  document.querySelector(".timeline-rail").style.display = "block";
  function updateRail() {
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
    railFill.style.height = (total > 0 ? (visible / total) * 100 : 0) + "%";
  }
  document.addEventListener("scroll", updateRail, { passive: true });
  updateRail();
}

/* ---------- Terminal typing effect ---------- */
const terminal = document.getElementById("terminal");
const terminalBody = document.getElementById("terminalBody");

const terminalLines = [
  { text: "> Build a booking web app: auth, admin panel, Postgres schema", cls: "prompt" },
  { text: "⏺ Scaffolding project structure", cls: "tool" },
  { text: "⏺ Bash(git init)", cls: "tool" },
  { text: "    Initialized empty Git repository", cls: "detail" },
  { text: "⏺ Write(schema.sql)", cls: "tool" },
  { text: "    8 tables, seed data generated", cls: "detail" },
  { text: "⏺ Write(auth/middleware.ts)", cls: "tool" },
  { text: "    JWT auth wired to admin routes", cls: "detail" },
  { text: "⏺ Write(admin/dashboard.tsx)", cls: "tool" },
  { text: "    12 components, wired to schema", cls: "detail" },
  { text: "⏺ Bash(npm run build && npm test)", cls: "tool" },
  { text: "    ✓ Build succeeded · 24 tests passed", cls: "detail-ok" },
  { text: '⏺ Bash(git add -A && git commit -m "Booking app: auth, admin, schema")', cls: "tool" },
  { text: "    [main a3f9c21] 22 files changed", cls: "detail" },
  { text: "⏺ Done — app running on localhost:3000", cls: "ok" },
];

// Static fallback content lives in the HTML for no-JS users. Clear it immediately
// so JS users don't see a flash of full text before the typing animation runs.
if (terminalBody) terminalBody.textContent = "";

let terminalTyped = false;
function typeTerminal() {
  if (terminalTyped || !terminalBody) return;
  terminalTyped = true;
  let lineIndex = 0;
  let charIndex = 0;
  terminalBody.textContent = "";
  const caret = document.createElement("span");
  caret.className = "terminal-caret";

  function typeChar() {
    if (lineIndex >= terminalLines.length) {
      terminalBody.appendChild(caret);
      return;
    }
    const line = terminalLines[lineIndex];
    let lineEl = terminalBody.querySelector(`[data-line="${lineIndex}"]`);
    if (!lineEl) {
      lineEl = document.createElement("div");
      lineEl.setAttribute("data-line", String(lineIndex));
      lineEl.className = line.cls;
      terminalBody.appendChild(lineEl);
    }
    charIndex++;
    lineEl.textContent = line.text.slice(0, charIndex);

    if (charIndex >= line.text.length) {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 220);
    } else {
      setTimeout(typeChar, 14);
    }
  }
  typeChar();
}

if (terminal) {
  if ("IntersectionObserver" in window) {
    const termObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeTerminal();
            termObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    termObserver.observe(terminal);
  } else {
    typeTerminal();
  }
}

/* ---------- Theme toggle (light/dark, persisted) ---------- */
const THEME_KEY = "pp-theme";
const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  }
}
if (themeToggle) {
  let current = "dark";
  try {
    current = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch (e) {}
  applyTheme(current);
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
  });
}

/* ---------- Back to top ---------- */
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  function toggleBackToTop() {
    if (window.scrollY > 600) backToTop.classList.add("visible");
    else backToTop.classList.remove("visible");
  }
  document.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Copy email to clipboard ---------- */
const copyEmailBtn = document.getElementById("copyEmailBtn");
if (copyEmailBtn) {
  const email = "pp744336@gmail.com";
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      return;
    }
    const original = copyEmailBtn.textContent;
    copyEmailBtn.textContent = "Copied!";
    copyEmailBtn.classList.add("copied");
    setTimeout(() => {
      copyEmailBtn.textContent = original;
      copyEmailBtn.classList.remove("copied");
    }, 1800);
  });
}
