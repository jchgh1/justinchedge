(() => {
  const root = document.documentElement, themeButton = document.getElementById('theme-toggle');
  const setTheme = theme => { root.dataset.theme = theme; try { localStorage.setItem('theme', theme); } catch (e) {} if (themeButton) themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); };
  if (themeButton) { setTheme(root.dataset.theme || 'light'); themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')); }
  document.querySelectorAll('.copy-template').forEach(button => button.addEventListener('click', async () => {
    const text = button.closest('.template-card').querySelector('pre code').innerText;
    try { await navigator.clipboard.writeText(text); button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy markdown'; }, 1600); }
    catch (e) { button.textContent = 'Select and copy'; }
  }));
  const rows = [...document.querySelectorAll('.post-row')]; if (!rows.length) return;
  const search = document.getElementById('post-search'), year = document.getElementById('filter-year'), month = document.getElementById('filter-month'), format = document.getElementById('filter-format'), toggle = document.getElementById('filter-toggle'), filters = document.getElementById('filters'), empty = document.getElementById('empty-state');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const fill = (select, values) => values.forEach(([value, label]) => { const option = document.createElement('option'); option.value = value; option.textContent = label; select.append(option); });
  fill(year, [...new Set(rows.map(row => row.dataset.year))].sort().reverse().map(value => [value, value]));
  fill(month, [...new Set(rows.map(row => row.dataset.month))].sort().map(value => [value, months[Number(value)-1]]));
  fill(format, [...new Set(rows.map(row => row.dataset.format))].sort().map(value => [value, value.replace(/\b\w/g, char => char.toUpperCase())]));
  const update = () => { const query = search.value.trim().toLowerCase(); let visible = 0; rows.forEach(row => { const match = row.dataset.title.includes(query) && (!year.value || row.dataset.year === year.value) && (!month.value || row.dataset.month === month.value) && (!format.value || row.dataset.format === format.value); row.hidden = !match; if (match) visible++; }); empty.hidden = visible > 0; };
  [search, year, month, format].forEach(control => control.addEventListener('input', update));
  toggle.addEventListener('click', () => { filters.hidden = !filters.hidden; toggle.setAttribute('aria-expanded', String(!filters.hidden)); toggle.setAttribute('aria-label', filters.hidden ? 'Show filters' : 'Hide filters'); });
  document.getElementById('clear-filters').addEventListener('click', () => { search.value=''; year.value=''; month.value=''; format.value=''; update(); });
})();
