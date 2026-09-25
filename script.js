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
