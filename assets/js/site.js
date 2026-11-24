(() => {
  document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', async () => {
      const { shareUrl, shareTitle, shareText } = button.dataset;
      const status = button.nextElementSibling;
      try {
        if (navigator.share) {
          await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl);
          status.textContent = 'Link copied';
          setTimeout(() => { status.textContent = ''; }, 1800);
        } else {
          window.prompt('Copy this link', shareUrl);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          status.textContent = 'Could not share';
          setTimeout(() => { status.textContent = ''; }, 1800);
        }
      }
    });
  });

  const rows = [...document.querySelectorAll('.post-card')];
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
