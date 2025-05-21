import {
  getThemeToggleHTML,
  initializeThemeToggle,
} from "../utils/themeManager.js";

export function renderHeader(parentElement) {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("top-right");
  headerDiv.innerHTML = getThemeToggleHTML();
  parentElement.prepend(headerDiv);

  initializeThemeToggle(headerDiv);
}
