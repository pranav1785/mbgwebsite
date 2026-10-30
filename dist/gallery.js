(() => {
  const viewer = document.querySelector('.lightbox');
  if (!viewer) return;
  const items = [...document.querySelectorAll('[data-full]')];
  const image = viewer.querySelector('figure img');
  const caption = viewer.querySelector('figcaption');
  const count = viewer.querySelector('.viewer-count');
  let index = 0, trigger = null;
  function show(next) {
    index = (next + items.length) % items.length;
    const item = items[index];
    image.src = item.dataset.full; image.alt = item.dataset.caption;
    caption.textContent = item.dataset.caption;
    count.textContent = `${index + 1} / ${items.length}`;
  }
  items.forEach((item, i) => item.addEventListener('click', () => {
    trigger = item; show(i); viewer.showModal(); document.body.classList.add('viewer-open');
  }));
  viewer.querySelector('.previous-image').addEventListener('click', () => show(index-1));
  viewer.querySelector('.next-image').addEventListener('click', () => show(index+1));
  viewer.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index+1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index-1); }
  });
  viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('viewer-open'); trigger?.focus({ preventScroll: true });
  });
})();
