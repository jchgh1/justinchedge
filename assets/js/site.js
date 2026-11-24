(() => {
  const filterButton = document.getElementById('filter-toggle');
  const filters = document.getElementById('filters');
  if (filterButton && filters) {
    filterButton.addEventListener('click', () => {
      const isOpen = filterButton.getAttribute('aria-expanded') !== 'true';
      filterButton.setAttribute('aria-expanded', String(isOpen));
      filterButton.setAttribute('aria-label', isOpen ? 'Hide filters' : 'Show filters');
      filters.hidden = !isOpen;
    });
  }

  const rows = [...document.querySelectorAll('.post-row')];
  const search = document.getElementById('post-search');
  const year = document.getElementById('filter-year');
  const month = document.getElementById('filter-month');
  const format = document.getElementById('filter-format');
  const empty = document.getElementById('empty-state');
  const clear = document.getElementById('clear-filters');
  if (!search || !year || !month || !format) return;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const addOptions = (select, options) => options.forEach(([value, label]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.append(option);
  });
  addOptions(year, [...new Set(rows.map(row => row.dataset.year))].sort().reverse().map(value => [value, value]));
  addOptions(month, [...new Set(rows.map(row => row.dataset.month))].sort().map(value => [value, monthNames[Number(value) - 1]]));
  addOptions(format, [...new Set(rows.map(row => row.dataset.format))].sort().map(value => [value, value.replace(/\b\w/g, letter => letter.toUpperCase())]));

  const updateFeed = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let shown = 0;
    rows.forEach(row => {
      const matches = row.dataset.title.includes(query)
        && (!year.value || row.dataset.year === year.value)
        && (!month.value || row.dataset.month === month.value)
        && (!format.value || row.dataset.format === format.value);
      row.hidden = !matches;
      if (matches) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  };

  search.addEventListener('input', updateFeed);
  [year, month, format].forEach(select => select.addEventListener('change', updateFeed));
  if (clear) clear.addEventListener('click', () => {
    search.value = '';
    year.value = '';
    month.value = '';
    format.value = '';
    updateFeed();
  });
})();
