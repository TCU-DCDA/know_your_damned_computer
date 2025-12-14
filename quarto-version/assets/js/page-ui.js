// Minimal page UI helpers for Quarto pages that use custom HTML components.

function initPlatformTabs(root = document) {
  const containers = root.querySelectorAll(".platform-tabs");
  containers.forEach((container) => {
    const buttons = container.querySelectorAll(".tab-btn[data-tab]");
    const contents = container.querySelectorAll(".tab-content");
    if (buttons.length === 0 || contents.length === 0) return;

    const setActive = (tabName) => {
      buttons.forEach((b) => b.classList.toggle("active", b.dataset.tab === tabName));
      contents.forEach((c) => {
        const isActive = c.classList.contains(tabName);
        c.classList.toggle("active", isActive);
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => setActive(button.dataset.tab));
    });

    const initiallyActive = Array.from(buttons).find((b) => b.classList.contains("active"));
    setActive(initiallyActive?.dataset.tab ?? buttons[0].dataset.tab);
  });
}

window.showExplanation = function showExplanation(button, text) {
  const explanation = button?.nextElementSibling;
  if (!explanation) return;
  explanation.textContent = text;
  explanation.style.display = explanation.style.display === "none" ? "block" : "none";
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initPlatformTabs());
} else {
  initPlatformTabs();
}

window.addEventListener("quarto:page-load", () => initPlatformTabs());

