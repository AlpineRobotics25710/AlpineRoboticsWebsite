import { team } from "../data/teamData.js";

const groups = [
  { key: "captains", title: "Captains", targetId: "team-captains" },
  { key: "leads", title: "Subsystem Leads", targetId: "team-leads" },
  { key: "members", title: "Members", targetId: "team-members" },
  { key: "mentors", title: "Mentors", targetId: "team-mentors" }
];

const allMembers = [];
groups.forEach(({ key }) => {
  (team[key] || []).forEach((m) => allMembers.push(m));
});

function createCard(member, index) {
  const img = member.image || "../images/team/default.jpg";
  const btn = member.bio || member.funfact || member.links ? `<button class="team-card__btn" data-profile="${index}">View Profile</button>` : "";
  return `
    <article class="card team-card-modern" data-index="${index}">
      <img class="team-card__avatar" src="${img}" alt="${member.name} headshot" loading="lazy" decoding="async">
      <p class="team-card__role">${member.role}</p>
      <h3 class="team-card__name">${member.name}</h3>
      <p class="team-card__summary">${member.summary || ""}</p>
      <div class="team-card__actions">
        ${btn}
      </div>
    </article>
  `;
}

function renderGroup({ key, title, targetId }) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const members = team[key] || [];
  if (!members.length) {
    container.innerHTML = "";
    return;
  }
  const cards = members
    .map((m) => {
      const idx = allMembers.indexOf(m);
      return createCard(m, idx);
    })
    .join("");
  container.innerHTML = `
    <div class="section__header">
      <h2 class="section__title">${title}</h2>
    </div>
    <div class="team-grid">
      ${cards}
    </div>
  `;
}

function buildModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-name">
      <button class="modal__close" aria-label="Close profile">&times;</button>
      <div class="modal__header">
        <img class="modal__avatar" src="" alt="">
        <div>
          <p class="modal__role"></p>
          <h3 class="modal__name" id="modal-name"></h3>
        </div>
      </div>
      <div class="modal__body">
        <p class="modal__bio"></p>
        <div class="modal__meta"></div>
        <p class="modal__funfact"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function updateModal(modal, member) {
  const avatar = modal.querySelector(".modal__avatar");
  const role = modal.querySelector(".modal__role");
  const name = modal.querySelector(".modal__name");
  const bio = modal.querySelector(".modal__bio");
  const meta = modal.querySelector(".modal__meta");
  const funfact = modal.querySelector(".modal__funfact");

  avatar.src = member.image || "../images/team/default.jpg";
  avatar.alt = `${member.name} headshot`;
  role.textContent = member.role || "";
  name.textContent = member.name || "";
  bio.textContent = member.bio || member.summary || "";
  funfact.textContent = member.funfact ? `Fun fact: ${member.funfact}` : "";

  const links = [];
  if (member.email) links.push(`<a class="badge-link" href="mailto:${member.email}">Email</a>`);
  if (member.links?.github) links.push(`<a class="badge-link" href="${member.links.github}" target="_blank" rel="noreferrer">GitHub</a>`);
  if (member.links?.linkedin) links.push(`<a class="badge-link" href="${member.links.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>`);
  meta.innerHTML = links.join("") || "<span class=\"muted\">No links provided.</span>";
}

function initModal() {
  const modal = buildModal();
  const closeBtn = modal.querySelector(".modal__close");
  const dialog = modal.querySelector(".modal__dialog");
  let focusable = [];
  let previousFocus = null;

  function open(member) {
    previousFocus = document.activeElement;
    updateModal(modal, member);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    focusable = Array.from(dialog.querySelectorAll("button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])"));
    (focusable[0] || closeBtn).focus();
    document.addEventListener("keydown", handleKeydown);
  }

  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", handleKeydown);
    if (previousFocus) previousFocus.focus();
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      close();
    }
    if (e.key === "Tab" && focusable.length) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === closeBtn) close();
  });

  return { open };
}

function bindCards(modalApi) {
  document.addEventListener("click", (e) => {
    const btn = e.target instanceof HTMLElement ? e.target.closest("[data-profile]") : null;
    if (!btn) return;
    const idx = parseInt(btn.getAttribute("data-profile") || "0", 10);
    const member = allMembers[idx];
    if (member) modalApi.open(member);
  });
}

function initTeam() {
  groups.forEach(renderGroup);
  const modalApi = initModal();
  bindCards(modalApi);
}

document.addEventListener("DOMContentLoaded", initTeam);
