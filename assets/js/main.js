// Basic motion hooks; respects prefers-reduced-motion.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimations();
  initParallax();
  initScrollReveals();
});
