// "What are epistemic risks?" section: clicking a highlighted term (or a ring in the diagram)
// shows its note. Without this script every note stays visible as a plain list.
(function () {
  var root = document.querySelector('[data-er]');
  if (!root) return;
  root.classList.add('er-js');
  var terms = root.querySelectorAll('[data-er-key]');
  var notes = root.querySelectorAll('[data-er-note]');
  var rings = root.querySelectorAll('[data-er-ring]');

  function show(key) {
    root.setAttribute('data-er-active', key);
    terms.forEach(function (t) { t.setAttribute('aria-pressed', String(t.getAttribute('data-er-key') === key)); });
    notes.forEach(function (n) { n.hidden = n.getAttribute('data-er-note') !== key; });
    rings.forEach(function (r) {
      var k = r.getAttribute('data-er-ring');
      r.classList.toggle('is-on', key === 'compound' || k === key);
    });
  }

  terms.forEach(function (t) {
    t.addEventListener('click', function () { show(t.getAttribute('data-er-key')); });
  });
  rings.forEach(function (r) {
    r.addEventListener('click', function () { show(r.getAttribute('data-er-ring')); });
  });
  show('persuasion');
})();
