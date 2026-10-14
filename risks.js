// "What are epistemic risks?" section: selecting a circle in the diagram (or the highlighted
// "compound one another" phrase) shows its note. Without this script every note stays visible as a plain list.
(function () {
  var root = document.querySelector('[data-er]');
  if (!root) return;
  root.classList.add('er-js');
  var terms = root.querySelectorAll('[data-er-key]');
  var notes = root.querySelectorAll('[data-er-note]');
  var rings = root.querySelectorAll('[data-er-ring]');

  function show(key) {
    terms.forEach(function (t) { t.setAttribute('aria-pressed', String(t.getAttribute('data-er-key') === key)); });
    notes.forEach(function (n) { n.hidden = n.getAttribute('data-er-note') !== key; });
    rings.forEach(function (r) {
      var k = r.getAttribute('data-er-ring');
      r.classList.toggle('is-on', key === 'compound' || k === key);
      r.setAttribute('aria-pressed', String(k === key));
    });
  }

  terms.forEach(function (t) {
    t.addEventListener('click', function () { show(t.getAttribute('data-er-key')); });
  });
  rings.forEach(function (r) {
    var key = r.getAttribute('data-er-ring');
    r.addEventListener('click', function () { show(key); });
    r.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(key); }
    });
  });
  show('persuasion');
})();
