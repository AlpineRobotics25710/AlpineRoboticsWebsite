const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const show = filter === "all" || category === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

function setupLightbox() {
  const overlay = document.querySelector(".lightbox");
  const overlayImg = overlay?.querySelector("img");
  if (!overlay || !overlayImg) return;

  const cards = document.querySelectorAll(".gallery-card img");
  cards.forEach((img) => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlay.classList.add("is-open");
      if (!prefersReducedMotion) overlay.classList.add("animate-in");
    });
  });

  const close = () => overlay.classList.remove("is-open", "animate-in");
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  setupLightbox();
});
