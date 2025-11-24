const imageRoot = "../images/galleryImages";

const galleries = [
  {
    folder: "MercerCountyFair",
    title: "Mercer County Fair",
    description: "Community STEM demos, robot drive sessions, and hands-on controls for visitors.",
    files: ["Fair1.jpg", "Fair2.jpg", "Fair3.jpg", "Fair4.jpg", "Fair5.jpg"]
  },
  {
    folder: "NJLeepOutreach",
    title: "NJ LEEP Outreach",
    description: "Workshops, coding demos, and robot trials with NJ LEEP students.",
    files: ["NJLeep1.jpg", "NJLeep2.jpg", "NJLeep3.jpg", "NJLeep4.jpg", "NJLeep5.jpg", "NJLeep6.jpg", "NJLeep7.jpg"]
  },
  {
    folder: "Robocon",
    title: "Robocon",
    description: "Competition field time, scouting practice, and pit walkthroughs.",
    files: ["Robocon1.jpg", "Robocon2.jpg", "Robocon3.jpg", "Robocon4.jpg", "Robocon5.jpg", "Robocon6.jpg", "Robocon7.jpg"]
  }
];

function slugify(folder) {
  return folder.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();
}

function renderSidebar() {
  const nav = document.querySelector("#sidebar-nav");
  if (!nav) return;
  nav.innerHTML = galleries
    .map(
      (g, idx) =>
        `<a class="sidebar__link" href="#${slugify(g.folder)}" data-target="${slugify(g.folder)}">${idx + 1 < 10 ? `0${idx + 1}` : idx + 1} · ${g.title}</a>`
    )
    .join("");
}

function renderSections() {
  const container = document.querySelector("#gallery-sections");
  if (!container) return;
  container.innerHTML = galleries
    .map((g) => {
      const id = slugify(g.folder);
      const images = g.files
        .map(
          (file, i) => `
            <figure class="masonry__item">
              <img src="${imageRoot}/${g.folder}/${file}" loading="lazy" decoding="async" alt="${g.title} photo ${i + 1}" data-section="${id}">
            </figure>`
        )
        .join("");
      return `
        <section class="gallery-section" id="${id}">
          <div class="gallery-section__header">
            <h2 class="gallery-section__title">${g.title}</h2>
            <p class="gallery-section__description">${g.description}</p>
          </div>
          <div class="masonry">
            ${images}
          </div>
        </section>
      `;
    })
    .join("");
}

function initSidebarToggle() {
  const toggle = document.querySelector(".sidebar__toggle");
  const nav = document.querySelector(".sidebar__nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

function initLightbox() {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const closeBtn = lightbox?.querySelector(".lightbox__close");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  };

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName === "IMG" && target.closest(".masonry__item")) {
      const src = target.getAttribute("src");
      const alt = target.getAttribute("alt") || "Gallery image";
      if (src) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
      }
    }
    if (target.classList.contains("lightbox__backdrop") || target.classList.contains("lightbox__close")) {
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
    }
  });
}

function initActiveLinkHighlight() {
  const links = Array.from(document.querySelectorAll(".sidebar__link"));
  if (!links.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (!id) return;
        const link = links.find((l) => l.dataset.target === id);
        if (link) {
          link.classList.toggle("is-active", entry.isIntersecting);
        }
      });
    },
    { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
  );
  document.querySelectorAll(".gallery-section").forEach((section) => observer.observe(section));
}

function initGalleryPage() {
  renderSidebar();
  renderSections();
  initSidebarToggle();
  initLightbox();
  initActiveLinkHighlight();
}

document.addEventListener("DOMContentLoaded", initGalleryPage);
