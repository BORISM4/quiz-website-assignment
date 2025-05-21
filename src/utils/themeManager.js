export function initializeThemeToggle(containerElement) {
  const themeToggleSwitch = containerElement.querySelector(
    '.theme-toggle input[type="checkbox"]'
  );

  if (themeToggleSwitch) {
    if (document.body.classList.contains("dark-theme")) {
      themeToggleSwitch.checked = true;
    } else {
      themeToggleSwitch.checked = false;
    }

    themeToggleSwitch.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    });
  }
}

export function getThemeToggleHTML() {
  return `
    <div class="theme-toggle">
      <span class="light-icon">☀️</span>
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      <span class="dark-icon">🌙</span>
    </div>
  `;
}
