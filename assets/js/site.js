(() => {
  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeIcon = document.querySelector("[data-theme-icon]");
  const root = document.documentElement;
  const currentTheme = () => root.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const syncThemeControl = () => {
    const dark = currentTheme() === "dark";
    const label = dark ? "Switch to light mode" : "Switch to dark mode";
    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;
    themeIcon.textContent = dark ? "☀" : "☾";
  };

  if (themeButton && themeIcon) {
    themeButton.addEventListener("click", () => {
      const nextTheme = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      try { localStorage.setItem("site-theme", nextTheme); } catch (_) {}
      syncThemeControl();
    });
    syncThemeControl();
  }

  const filterToggle = document.querySelector("[data-filter-toggle]");
  const filterPanel = document.querySelector("[data-filter-panel]");
  if (filterToggle && filterPanel) {
    filterToggle.addEventListener("click", () => {
      const open = filterToggle.getAttribute("aria-expanded") !== "true";
      filterToggle.setAttribute("aria-expanded", String(open));
      filterToggle.setAttribute("aria-label", open ? "Hide filters" : "Show filters");
      filterToggle.title = open ? "Hide filters" : "Show filters";
      filterPanel.classList.toggle("is-open", open);
      filterPanel.inert = !open;
    });
  }

  const avatarFallbacks = ["/IMG_4732.jpg", "/assets/images/IMG_4732.jpg", "/assets/images/justin-avatar.svg"];
  document.querySelectorAll("[data-author-avatar]").forEach((avatar) => {
    let fallbackIndex = 0;
    avatar.addEventListener("error", () => {
      fallbackIndex += 1;
      if (fallbackIndex < avatarFallbacks.length) avatar.src = new URL(avatarFallbacks[fallbackIndex], window.location.origin).href;
    });
  });

  const items = Array.from(document.querySelectorAll("[data-feed-item]"));
  if (!items.length) return;

  const titleInput = document.querySelector("[data-filter-title]");
  const yearSelect = document.querySelector("[data-filter-year]");
  const monthSelect = document.querySelector("[data-filter-month]");
  const formatSelect = document.querySelector("[data-filter-format]");
  const resetButton = document.querySelector("[data-filter-reset]");
  const status = document.querySelector("[data-feed-status]");
  const noResults = document.querySelector("[data-no-results]");
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const appendOption = (select, value, label) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.append(option);
  };

  const years = [...new Set(items.map((item) => item.dataset.year))].sort((a, b) => b.localeCompare(a));
  years.forEach((year) => appendOption(yearSelect, year, year));

  const updateMonths = () => {
    const previousMonth = monthSelect.value;
    const selectedYear = yearSelect.value;
    const availableMonths = new Set(
      items
        .filter((item) => !selectedYear || item.dataset.year === selectedYear)
        .map((item) => item.dataset.month)
    );

    monthSelect.replaceChildren(new Option("Any month", ""));
    monthNames.forEach((month, index) => {
      const value = String(index + 1).padStart(2, "0");
      if (availableMonths.has(value)) appendOption(monthSelect, value, month);
    });
    if (availableMonths.has(previousMonth)) monthSelect.value = previousMonth;
  };

  const updateFeed = () => {
    const query = titleInput.value.trim().toLocaleLowerCase();
    const year = yearSelect.value;
    const month = monthSelect.value;
    const format = formatSelect.value;
    let visible = 0;

    items.forEach((item) => {
      const matches = (!query || item.dataset.title.toLocaleLowerCase().includes(query))
        && (!year || item.dataset.year === year)
        && (!month || item.dataset.month === month)
        && (!format || item.dataset.format === format);
      item.hidden = !matches;
      if (matches) visible += 1;
    });

    status.textContent = `${visible} ${visible === 1 ? "post" : "posts"}`;
    noResults.hidden = visible !== 0;
  };

  titleInput.addEventListener("input", updateFeed);
  yearSelect.addEventListener("change", () => {
    updateMonths();
    updateFeed();
  });
  monthSelect.addEventListener("change", updateFeed);
  formatSelect.addEventListener("change", updateFeed);
  resetButton.addEventListener("click", () => {
    titleInput.value = "";
    yearSelect.value = "";
    formatSelect.value = "";
    updateMonths();
    updateFeed();
  });

  updateMonths();
  updateFeed();
})();
