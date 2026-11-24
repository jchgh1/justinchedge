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
  rows.forEach(row => {
    const openPost = () => { window.location.href = row.dataset.postUrl; };
    row.addEventListener('click', event => {
      if (event.target.closest('a, button, iframe, [role=button]')) return;
      openPost();
    });
    row.addEventListener('keydown', event => {
      if (event.target === row && event.key === 'Enter') { event.preventDefault(); openPost(); }
    });
  });
  const search = document.getElementById('post-search');
  const lightbox = document.getElementById('media-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  let lastFocusedImage = null;

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (lastFocusedImage) lastFocusedImage.focus();
  };
  const openLightbox = image => {
    if (!lightbox || !lightboxImage) return;
    lastFocusedImage = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    lightboxClose?.focus();
  };

  document.querySelectorAll('.post-card--text .post-media img, .post-card--image .post-media img, .article-cover, .prose img').forEach(image => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || 'Image'} — open full size`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    rows.forEach(row => { row.classList.add('reveal'); revealObserver.observe(row); });
  } else {
    rows.forEach(row => row.classList.add('is-visible'));
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
    const target = event.target;
    const typing = target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
    if (event.key === '/' && search && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      search.focus();
    }
  });

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
