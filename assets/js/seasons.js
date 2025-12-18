document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".season-tab"));
  const panels = Array.from(document.querySelectorAll(".season-panel"));
  const indicator = document.querySelector(".season-tabs__indicator");
  if (!tabs.length || !panels.length) return;

  const moveIndicator = (tab) => {
    if (!indicator || !tab) return;
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.left = `${tab.offsetLeft}px`;
  };

  const activate = (targetId) => {
    tabs.forEach((tab) => {
      const isActive = tab.getAttribute("aria-controls") === targetId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
      if (isActive) moveIndicator(tab);
    });

    panels.forEach((panel) => {
      const isMatch = panel.id === targetId;
      if (isMatch) {
        panel.hidden = false;
        panel.classList.add("is-active");
        requestAnimationFrame(() => panel.classList.add("is-visible"));
      } else {
        panel.classList.remove("is-visible");
        panel.classList.remove("is-active");
        panel.hidden = true;
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("aria-controls");
      if (targetId) activate(targetId);
    });
    tab.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tab.click();
      }
    });
  });

  // Initialize indicator to the active tab
  const initialActive = tabs.find((t) => t.classList.contains("is-active")) || tabs[0];
  if (initialActive) moveIndicator(initialActive);

  window.addEventListener("resize", () => {
    const current = tabs.find((t) => t.classList.contains("is-active")) || tabs[0];
    if (current) moveIndicator(current);
  });
});
