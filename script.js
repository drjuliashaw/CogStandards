// Keeps the copyright year in the footer current.
document.getElementById('year').textContent = new Date().getFullYear();

// Paper pages: the reference list is folded away. Clicking a citation like [12] unfolds it first.
(function () {
  var refs = document.querySelector('details.refs');
  if (!refs) return;
  function openIfRef(hash) { if (hash && hash.indexOf('#ref-') === 0) refs.open = true; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#ref-"]');
    if (a) openIfRef(a.getAttribute('href'));
  });
  openIfRef(location.hash);
})();

// Header logo: hidden while the homepage banner (which already shows the full logo) is on screen.
(function () {
  var banner = document.querySelector('.hero-banner');
  var header = document.querySelector('.site-header');
  if (!banner || !header || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (entries) {
    header.classList.toggle('logo-off', entries[0].isIntersecting);
  }, { rootMargin: '-64px 0px 0px 0px', threshold: 0.35 }).observe(banner);
})();

// Updates: filter buttons and the "coming soon" note switch on and off depending on whether there are entries.
(function () {
  var list = document.querySelector('[data-updates]');
  if (!list) return;
  var section = list.closest('section');
  var items = list.querySelectorAll('.up-item');
  var filters = section.querySelector('.up-filters');
  var empty = section.querySelector('.up-empty');
  if (!items.length) return;
  if (empty) empty.hidden = true;
  if (!filters) return;
  filters.hidden = false;
  var buttons = filters.querySelectorAll('[data-filter]');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      items.forEach(function (it) { it.hidden = f !== 'all' && it.getAttribute('data-type') !== f; });
    });
  });
})();
