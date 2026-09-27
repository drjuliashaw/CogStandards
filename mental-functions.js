/* =====================================================================
   Mental functions visualisation (CogGuide)
   Source: WHO International Classification of Functioning, Disability
   and Health (ICF), 2026 release, as summarised in the CogGuide
   document "Mental Functions and AI: A Framework for CogGuide".

   Usage: add <div data-mental-functions></div> to a page, then load
   mental-functions.css and this file. No inline scripts or styles are
   needed, so it works under the site's Content-Security-Policy.
   ===================================================================== */
(function () {
  'use strict';

  var DATA = {
    intro: 'The ICF defines 11 specific mental functions.',
    specific: {
      name: 'Specific mental functions',
      description: 'Separate capacities, each of which can be assessed on its own. These each have subcategories that help to explain what, precisely, is meant by these capacities.',
      items: [
        { name: 'Attention', ring: ['Attention'], lines: ['Attention'], definition: 'Focusing on something outside or inside oneself for as long as needed.', subs: [
          ['Sustaining attention', 'Keeping concentration for as long as a task requires.'],
          ['Shifting attention', 'Moving concentration from one thing to another.'],
          ['Dividing attention', 'Focusing on two or more things at once.'],
          ['Sharing attention', 'Two or more people focusing on the same thing.']] },
        { name: 'Memory', ring: ['Memory'], lines: ['Memory'], definition: 'Registering and storing information, and retrieving it when needed.', subs: [
          ['Short-term memory', 'A temporary store lasting around 30 seconds, from which information is lost unless it is consolidated into long-term memory.'],
          ['Long-term memory', 'Lasting storage, covering both autobiographical memory of past events and semantic memory of language and facts.'],
          ['Retrieval and processing of memory', 'Recalling information stored in long-term memory and bringing it into awareness.'],
          ['Working memory', 'Comparing and processing information drawn from short-term and long-term memory.']] },
        { name: 'Psychomotor skills', ring: ['Psychomotor', 'skills'], lines: ['Psychomotor', 'skills'], definition: 'Mental control over the speed and quality of bodily responses.', subs: [
          ['Psychomotor control', 'Regulating the speed of behaviour and response time, which has both motor and psychological components.'],
          ['Quality of psychomotor functions', 'Producing nonverbal behaviour in the right sequence and form, such as hand–eye coordination or gait.']] },
        { name: 'Emotion', ring: ['Emotion'], lines: ['Emotion'], definition: 'The feeling and affective side of mental processes.', subs: [
          ['Appropriateness of emotion', 'Feelings that fit the situation.'],
          ['Regulation of emotion', 'Controlling how emotions are experienced and shown.'],
          ['Range of emotion', 'Experiencing the full spectrum of feelings, such as love, hate, anxiety, sorrow, joy, fear and anger.']] },
        { name: 'Perception', ring: ['Perception'], lines: ['Perception'], definition: 'Recognising and interpreting what the senses take in.', subs: [
          ['Auditory perception', 'Telling apart sounds, tones and pitches.'],
          ['Visual perception', 'Telling apart shape, size, colour and other visual features.'],
          ['Olfactory perception', 'Telling apart smells.'],
          ['Gustatory perception', 'Telling apart tastes such as sweet, sour, salty and bitter.'],
          ['Tactile perception', 'Telling apart textures by touch.'],
          ['Visuospatial perception', 'Judging by sight where objects are, relative to each other and to oneself.']] },
        { name: 'Thought', ring: ['Thought'], lines: ['Thought'], definition: 'Forming and working with ideas.', subs: [
          ['Pace of thought', 'The speed of thinking.'],
          ['Form of thought', 'Organising thinking so that it is coherent and logical.'],
          ['Content of thought', 'The ideas present in thinking, and what is being conceptualised, including beliefs.'],
          ['Control of thought', 'Voluntary control over thinking, which the person recognises as their own.']] },
        { name: 'Higher-level cognitions', ring: ['Higher-level', 'cognitions'], lines: ['Higher-level', 'cognitions'], definition: 'Goal-directed functions that depend mainly on the frontal lobes, often called executive functions.', subs: [
          ['Abstraction', 'Forming general ideas out of specific objects or instances.'],
          ['Organisation and planning', 'Coordinating parts into a whole and working out a method of proceeding.'],
          ['Time management', 'Putting events in chronological order and allocating time to activities.'],
          ['Cognitive flexibility', 'Changing strategy or shifting mental set, especially when solving problems.'],
          ['Insight', 'Awareness and understanding of oneself and one’s own behaviour.'],
          ['Judgement', 'Discriminating between and evaluating options, as in forming an opinion.'],
          ['Problem-solving', 'Identifying, analysing and integrating conflicting information into a solution.']] },
        { name: 'Language', ring: ['Language'], lines: ['Language'], definition: 'Recognising and using signs, symbols and other parts of a language.', subs: [
          ['Reception of language', 'Decoding spoken, written, signed or gestured messages to obtain their meaning.'],
          ['Expression of language', 'Producing meaningful spoken, written, signed or gestured messages.'],
          ['Integrative language functions', 'Organising meaning, grammar and ideas to produce a message.']] },
        { name: 'Calculation', ring: ['Calculation'], lines: ['Calculation'], definition: 'Estimating, working out and manipulating mathematical symbols and processes.', subs: [
          ['Simple calculation', 'Computing with numbers, such as adding, subtracting, multiplying and dividing.'],
          ['Complex calculation', 'Turning word problems or formulas into arithmetic, and other complex work with numbers.']] },
        { name: 'Sequencing complex movements', ring: ['Sequencing', 'complex', 'movements'], lines: ['Sequencing complex', 'movements'], definition: 'Ordering and coordinating complex, purposeful movements.', subs: [] },
        { name: 'Experience of self and time', ring: ['Experience', 'of self', 'and time'], lines: ['Experience of', 'self and time'], definition: 'Awareness of one’s identity, one’s body, one’s place in reality and the passage of time.', subs: [
          ['Experience of self', 'Awareness of one’s own identity and of one’s position in the reality of one’s surroundings.'],
          ['Body image', 'Representation and awareness of one’s own body.'],
          ['Experience of time', 'The subjective experience of how long things take and of time passing.']] }
      ]
    },
    noSubs: 'The ICF has no subcategories for this function.',
    source: 'Source: WHO International Classification of Functioning, Disability and Health (ICF), 2026 release. Definitions condensed.'
  };

  var SVGNS = 'http://www.w3.org/2000/svg';
  var W = 900, H = 720, CX = 450, CY = 360;
  var R = { core: 96, s0: 106, s1: 250, u0: 256, u1: 272 };
  var TAU = Math.PI * 2;
  var uid = 0;

  function el(tag, attrs, parent, ns) {
    var n = ns ? document.createElementNS(SVGNS, tag) : document.createElement(tag);
    if (attrs) for (var k in attrs) if (attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function s(tag, attrs, parent) { return el(tag, attrs, parent, true); }
  function pt(r, a) { return [CX + r * Math.sin(a), CY - r * Math.cos(a)]; }
  function f(n) { return Math.round(n * 100) / 100; }

  function sector(r0, r1, a0, a1) {
    var large = (a1 - a0) > Math.PI ? 1 : 0;
    var p0 = pt(r1, a0), p1 = pt(r1, a1), p2 = pt(r0, a1), p3 = pt(r0, a0);
    return 'M' + f(p0[0]) + ' ' + f(p0[1]) +
      'A' + r1 + ' ' + r1 + ' 0 ' + large + ' 1 ' + f(p1[0]) + ' ' + f(p1[1]) +
      'L' + f(p2[0]) + ' ' + f(p2[1]) +
      'A' + r0 + ' ' + r0 + ' 0 ' + large + ' 0 ' + f(p3[0]) + ' ' + f(p3[1]) + 'Z';
  }
  function arcLine(r, a0, a1, reverse) {
    var p0 = pt(r, reverse ? a1 : a0), p1 = pt(r, reverse ? a0 : a1);
    return 'M' + f(p0[0]) + ' ' + f(p0[1]) + 'A' + r + ' ' + r + ' 0 0 ' + (reverse ? 0 : 1) + ' ' + f(p1[0]) + ' ' + f(p1[1]);
  }

  function build(host) {
    var id = 'mfv' + (++uid);
    host.classList.add('mfv');
    host.innerHTML = '';

    var stage = el('div', { 'class': 'mfv-stage' }, host);
    var svg = s('svg', { viewBox: (CX - R.u1 - 10) + ' ' + (CY - R.u1 - 10) + ' ' + (2 * R.u1 + 20) + ' ' + (2 * R.u1 + 20), 'class': 'mfv-svg', role: 'group',
      'aria-label': 'Interactive diagram of the 11 specific mental functions in the ICF' }, stage);
    var defs = s('defs', null, svg);
    var tip = el('div', { 'class': 'mfv-tip', role: 'status' }, stage);

    var panel = el('aside', { 'class': 'mfv-panel', 'aria-live': 'polite' }, host);

    var nodes = []; // {group, index, el, subs:[]}
    var state = { sel: null, sub: -1, group: null };

    // Core
    var core = s('g', { 'class': 'mfv-core', tabindex: '0', role: 'button', 'aria-label': 'Show overview of all mental functions' }, svg);
    s('circle', { cx: CX, cy: CY, r: R.core, 'class': 'mfv-core-circle' }, core);
    var coreT1 = s('text', { x: CX, y: CY - 6, 'class': 'mfv-core-title' }, core);
    var coreT2 = s('text', { x: CX, y: CY + 18, 'class': 'mfv-core-sub' }, core);

    // Specific ring
    var sItems = DATA.specific.items, sn = sItems.length, sGap = 0.012;
    sItems.forEach(function (it, i) {
      var a0 = i * TAU / sn + sGap, a1 = (i + 1) * TAU / sn - sGap, mid = (a0 + a1) / 2;
      var g = s('g', { 'class': 'mfv-node mfv-specific', tabindex: '0', role: 'button',
        'aria-label': it.name + ', specific mental function, ' + (it.subs.length ? it.subs.length + ' subcategories' : 'no subcategories') }, svg);
      s('path', { d: sector(R.s0, R.s1, a0, a1), 'class': 'mfv-seg' }, g);

      // name inside the segment, curved along the ring (lines stack towards the centre)
      var sflip = mid > Math.PI / 2 && mid < Math.PI * 1.5, slh = 17, sn2 = it.ring.length;
      it.ring.forEach(function (line, li) {
        var off = (li - (sn2 - 1) / 2) * slh, rr = (R.s0 + R.s1) / 2 + 14 + (sflip ? off : -off);
        var spid = id + '-s' + i + '-' + li;
        s('path', { id: spid, d: arcLine(rr, a0, a1, sflip), fill: 'none', stroke: 'none' }, defs);
        var st = s('text', { 'class': 'mfv-seg-label', dy: '0.36em' }, g);
        var stp = s('textPath', { href: '#' + spid, startOffset: '50%' }, st);
        stp.textContent = line;
      });

      // subcategory arcs
      var subs = [];
      var k = it.subs.length;
      if (k) {
        var sg = 0.008, span = (a1 - a0) / k;
        it.subs.forEach(function (sub, j) {
          var b0 = a0 + j * span + sg, b1 = a0 + (j + 1) * span - sg;
          var p = s('path', { d: sector(R.u0, R.u1, b0, b1), 'class': 'mfv-sub' }, svg);
          p.addEventListener('mouseenter', function (e) { showTip(sub[0], e); hover(i, j); });
          p.addEventListener('mousemove', function (e) { moveTip(e); });
          p.addEventListener('mouseleave', function () { hideTip(); hover(null); });
          p.addEventListener('click', function () { select(i, j); });
          subs.push(p);
        });
      } else {
        s('path', { d: sector(R.u0, R.u1, a0, a1), 'class': 'mfv-sub mfv-sub-empty' }, svg);
      }

      nodes.push({ group: 'specific', index: i, item: it, el: g, subs: subs });
    });

    // Interaction wiring
    nodes.forEach(function (n, idx) {
      n.el.addEventListener('mouseenter', function () { hover(idx, -1); });
      n.el.addEventListener('mouseleave', function () { hover(null); });
      n.el.addEventListener('click', function () { select(idx, -1); });
      n.el.addEventListener('keydown', function (e) { key(e, idx); });
      n.el.addEventListener('focus', function () { hover(idx, -1); });
      n.el.addEventListener('blur', function () { hover(null); });
    });
    core.addEventListener('click', function () { reset(); });
    core.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reset(); }
    });
    host.addEventListener('keydown', function (e) { if (e.key === 'Escape') reset(); });

    function key(e, idx) {
      var n = nodes[idx], list = nodes.filter(function (x) { return x.group === n.group; });
      var pos = list.indexOf(n), next = null;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(idx, -1); return; }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = list[(pos + 1) % list.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = list[(pos - 1 + list.length) % list.length];
      if (next) { e.preventDefault(); next.el.focus(); }
    }

    function paint(focusIdx, subIdx) {
      svg.classList.toggle('mfv-has-focus', focusIdx != null || state.group != null);
      nodes.forEach(function (n, i) {
        var on = focusIdx != null ? i === focusIdx : (state.group ? n.group === state.group : false);
        n.el.classList.toggle('is-on', on);
        n.el.classList.toggle('is-selected', i === state.sel);
        n.subs.forEach(function (p, j) {
          p.classList.toggle('is-on', on);
          p.classList.toggle('is-sub', i === focusIdx && j === subIdx);
        });
      });
      var ref = focusIdx != null ? nodes[focusIdx] : null;
      if (ref) {
        setCore(ref.item.name, '');
      } else if (state.group) {
        setCore(DATA[state.group].name.replace(' mental functions', ''), '');
      } else {
        setCore('Mental functions', '');
      }
    }

    function setCore(title, sub) {
      var words = title.split(' '), linesOut = [], cur = '';
      words.forEach(function (w) {
        if ((cur + ' ' + w).trim().length > 14 && cur) { linesOut.push(cur); cur = w; } else { cur = (cur + ' ' + w).trim(); }
      });
      linesOut.push(cur);
      linesOut = linesOut.slice(0, 3);
      coreT1.textContent = '';
      // Centre the whole block (title lines plus optional subtitle) on the circle's centre.
      var lh = 20, subGap = sub ? 22 : 0;
      var top = CY - (linesOut.length * lh + subGap) / 2;
      linesOut.forEach(function (l, i) {
        var ts = s('tspan', { x: CX, y: f(top + lh * (i + 0.5)), dy: '0.35em' }, coreT1);
        ts.textContent = l;
      });
      coreT2.setAttribute('y', f(top + linesOut.length * lh + subGap / 2 + 2));
      coreT2.setAttribute('dy', '0.35em');
      coreT2.textContent = sub;
    }

    function hover(idx, subIdx) {
      if (idx == null) { paint(state.sel, state.sub); return; }
      paint(idx, subIdx);
    }

    function select(idx, subIdx) {
      state.sel = idx; state.sub = subIdx; state.group = null;
      paint(idx, subIdx);
      renderFunction(nodes[idx], subIdx);
    }
    function selectGroup(g) {
      state.sel = null; state.sub = -1; state.group = g;
      paint(null, -1);
      renderGroup(g);
    }
    function reset() {
      state.sel = null; state.sub = -1; state.group = null;
      paint(null, -1);
      renderOverview();
    }

    // Tooltip
    function showTip(text, e) { tip.textContent = text; tip.classList.add('is-on'); moveTip(e); }
    function moveTip(e) {
      var r = stage.getBoundingClientRect();
      tip.style.left = (e.clientX - r.left) + 'px';
      tip.style.top = (e.clientY - r.top - 14) + 'px';
    }
    function hideTip() { tip.classList.remove('is-on'); }

    // Panel renderers
    function h(tag, cls, text, parent) { var n = el(tag, cls ? { 'class': cls } : null, parent); if (text != null) n.textContent = text; return n; }

    function groupCard(g, parent) {
      var d = DATA[g];
      var b = el('button', { type: 'button', 'class': 'mfv-card mfv-card-' + g }, parent);
      var top = h('span', 'mfv-card-top', null, b);
      h('span', 'mfv-swatch mfv-swatch-' + g, null, top);
      h('span', 'mfv-card-name', d.name, top);
      h('span', 'mfv-card-count', d.items.length, top);
      h('span', 'mfv-card-desc', d.description, b);
      b.addEventListener('click', function () { selectGroup(g); });
    }

    function renderOverview() {
      panel.innerHTML = '';
      h('p', 'mfv-eyebrow', 'ICF mental functions', panel);
      h('h3', 'mfv-title', 'Mental functions', panel);
      h('p', 'mfv-text', DATA.intro, panel);
      groupCard('specific', panel);
      if (host.classList.contains('mfv-compact')) {
        ['specific'].forEach(function (g) {
          h('h4', 'mfv-subhead', DATA[g].name, panel);
          var ul = h('ul', 'mfv-list mfv-list-compact', null, panel);
          nodes.forEach(function (n, idx) {
            if (n.group !== g) return;
            var b = el('button', { type: 'button', 'class': 'mfv-list-btn' }, h('li', null, null, ul));
            h('span', 'mfv-list-name', n.item.name, b);
            b.addEventListener('click', function () { select(idx, -1); });
          });
        });
      } else {
        h('p', 'mfv-hint', 'Select any segment to see its definition. The outer ticks are subcategories.', panel);
      }
      h('p', 'mfv-source', DATA.source, panel);
    }

    function renderGroup(g) {
      var d = DATA[g];
      panel.innerHTML = '';
      backButton();
      h('p', 'mfv-eyebrow', 'ICF mental functions', panel);
      h('h3', 'mfv-title', d.name, panel);
      h('p', 'mfv-text', d.description, panel);
      var ul = h('ul', 'mfv-list', null, panel);
      nodes.forEach(function (n, idx) {
        if (n.group !== g) return;
        var li = h('li', null, null, ul);
        var b = el('button', { type: 'button', 'class': 'mfv-list-btn' }, li);
        h('span', 'mfv-list-name', n.item.name, b);
        h('span', 'mfv-list-def', n.item.definition, b);
        b.addEventListener('click', function () { select(idx, -1); });
      });
    }

    function renderFunction(n, subIdx) {
      var it = n.item;
      panel.innerHTML = '';
      backButton();
      h('h3', 'mfv-title', it.name, panel);
      h('p', 'mfv-text mfv-definition', it.definition, panel);
      if (n.group === 'specific') {
        if (it.subs.length) {
          h('h4', 'mfv-subhead', 'Subcategories (' + it.subs.length + ')', panel);
          var dl = h('dl', 'mfv-subs', null, panel);
          it.subs.forEach(function (sub, j) {
            var row = h('div', 'mfv-subrow' + (j === subIdx ? ' is-active' : ''), null, dl);
            h('dt', null, sub[0], row);
            h('dd', null, sub[1], row);
            row.addEventListener('mouseenter', function () { paint(nodes.indexOf(n), j); });
            row.addEventListener('mouseleave', function () { paint(state.sel, state.sub); });
          });
        } else {
          h('p', 'mfv-note', DATA.noSubs, panel);
        }
      }
      var nav = h('div', 'mfv-nav', null, panel);
      var same = nodes.filter(function (x) { return x.group === n.group; });
      var pos = same.indexOf(n);
      var prev = same[(pos - 1 + same.length) % same.length], next = same[(pos + 1) % same.length];
      navBtn(nav, '← ' + prev.item.name, prev);
      navBtn(nav, next.item.name + ' →', next);
    }
    function navBtn(parent, label, target) {
      var b = el('button', { type: 'button', 'class': 'mfv-navbtn' }, parent);
      b.textContent = label;
      b.addEventListener('click', function () { select(nodes.indexOf(target), -1); });
    }
    function backButton() {
      var b = el('button', { type: 'button', 'class': 'mfv-back' }, panel);
      b.textContent = '← All mental functions';
      b.addEventListener('click', reset);
    }

    var compact = null;
    var m = R.u1 + 10, CROP = (CX - m) + ' ' + (CY - m) + ' ' + (2 * m) + ' ' + (2 * m), FULL = CROP;
    function layout() {
      var w = host.clientWidth;
      host.classList.toggle('mfv-stacked', w < 820);
      var c = w < 600;
      if (c === compact) return;
      compact = c;
      host.classList.toggle('mfv-compact', c);
      svg.setAttribute('viewBox', c ? CROP : FULL);
      if (state.sel == null && state.group == null) renderOverview();
    }
    layout();
    if (window.ResizeObserver) new ResizeObserver(layout).observe(host);
    else window.addEventListener('resize', layout);

    reset();
  }

  function init() {
    var hosts = document.querySelectorAll('[data-mental-functions]');
    for (var i = 0; i < hosts.length; i++) build(hosts[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
