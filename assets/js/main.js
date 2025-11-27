// Basic motion hooks; respects prefers-reduced-motion.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const storageKey = "alpine-theme";

function initHeroAnimations() {
  if (prefersReducedMotion || typeof gsap === "undefined") return;

  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.9 } });
  tl.from(".hero__eyebrow", { y: 10, opacity: 0 })
    .from(".hero__title", { y: 20, opacity: 0 }, "-=0.4")
    .from(".hero__subtitle", { y: 20, opacity: 0 }, "-=0.5")
    .from(".hero__actions .btn", { y: 16, opacity: 0, stagger: 0.08 }, "-=0.4")
    .from(".metrics .metric", { y: 20, opacity: 0, stagger: 0.08 }, "-=0.2");

  gsap.from(".hero__card", {
    scale: 0.96,
    opacity: 0,
    rotateX: 8,
    transformOrigin: "center center",
    duration: 1,
    ease: "expo.out",
    delay: 0.3
  });
}

function initParallax() {
  if (prefersReducedMotion) return;
  const target = document.querySelector(".hero__card");
  if (!target) return;
  document.addEventListener("pointermove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / innerWidth;
    const y = (e.clientY - innerHeight / 2) / innerHeight;
    target.style.transform = `rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(0)`;
  });
}

function initScrollReveals() {
  if (prefersReducedMotion || typeof gsap === "undefined" || !gsap.registerPlugin) return;
  if (typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  const headers = document.querySelectorAll(".section__header");
  headers.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  const tiles = document.querySelectorAll(".tile, .list-tile, .team-card, .gallery-card, .contact-card");
  tiles.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse"
      }
    });
  });

  const missionHeading = document.querySelector(".mission-heading");
  if (missionHeading) {
    gsap.fromTo(
      missionHeading,
      { opacity: 0, y: "10%", letterSpacing: "0px" },
      {
        opacity: 1,
        y: "0%",
        letterSpacing: "1.5px",
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionHeading,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }
}

function initMountainParallax() {
  if (prefersReducedMotion) return;
  const layers = document.querySelectorAll(".parallax-layer");
  if (!layers.length) return;

  const onScroll = () => {
    const sc = window.scrollY;
    layers.forEach((el, i) => {
      const speed = 0.12 + i * 0.05;
      el.style.setProperty("--offset", `${sc * speed}px`);
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function applyTheme(theme) {
  const target = document.body;
  target.setAttribute("data-theme", theme);
}

function initThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  const stored = localStorage.getItem(storageKey);
  const initial = stored === "dark" || stored === "light" ? stored : "dark";
  applyTheme(initial);
  if (!toggle) return;
  toggle.setAttribute("aria-pressed", String(initial === "dark"));

  toggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(storageKey, next);
    toggle.setAttribute("aria-pressed", String(next === "dark"));
  });
}

function initNavToggle() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("is-open");
  };

  const toggleMenu = () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  };

  toggle.addEventListener("click", toggleMenu);
  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (!menu.contains(target) && !toggle.contains(target)) {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimations();
  initParallax();
  initScrollReveals();
  initMissionAnimation();
  initMountainParallax();
  initThemeToggle();
  initNavToggle();
});

function initMissionAnimation() {
  const title = document.querySelector(".mission-section .mission-title");
  if (!title) return;
  if (prefersReducedMotion) {
    title.classList.add("animate-in");
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === title) {
          entry.target.classList.add("animate-in");
        }
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.8 }
  );

  observer.observe(title);
}
