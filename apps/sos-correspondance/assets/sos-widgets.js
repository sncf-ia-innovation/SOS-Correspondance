/* SOS Correspondance — widgets partagés (autocomplete gares + sélecteur de date).
   Dépend de assets/gares.js (window.SOS_GARES) et du curated suggestion-liste.css.
   Exposé global : window.SOSW */
(function () {
  'use strict';

  /* --- Normalisation accents/casse/tirets pour la recherche --- */
  function norm(s) {
    return (s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[-'’.]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* --- Recherche de gares : préfixe d'abord, puis contenu (max n résultats) --- */
  function searchGares(q, max) {
    max = max || 8;
    var gares = window.SOS_GARES || [];
    var nq = norm(q);
    if (nq.length < 2) { return []; }
    var pref = [], sub = [];
    for (var i = 0; i < gares.length && (pref.length + sub.length) < 60; i++) {
      var nn = norm(gares[i][0]);
      if (nn.indexOf(nq) === 0) { pref.push(gares[i]); }
      else if (nn.indexOf(nq) !== -1) { sub.push(gares[i]); }
    }
    return pref.concat(sub).slice(0, max);
  }

  /* --- Autocomplete : branche une liste de suggestions sous un input.
     opts.list : <ul class="ds-suggestion-liste"> existant (sinon créé après l'input).
     opts.onPick(nom) : callback à la sélection. --- */
  function autocomplete(input, opts) {
    opts = opts || {};
    var list = opts.list;
    if (!list) {
      var wrap = input.closest('.sos-autocomplete, .sos-ac') || input.parentElement;
      wrap.classList.add('sos-ac');
      list = document.createElement('ul');
      list.className = 'ds-suggestion-liste';
      list.setAttribute('role', 'listbox');
      list.setAttribute('aria-label', 'Suggestions de gares');
      list.hidden = true;
      wrap.appendChild(list);
      input.setAttribute('role', 'combobox');
      input.setAttribute('aria-autocomplete', 'list');
      input.setAttribute('aria-expanded', 'false');
    }
    var box = list.parentElement;

    function close() {
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
    }
    function pick(name) {
      input.value = name;
      close();
      input.focus();
      if (opts.onPick) { opts.onPick(name); }
    }
    function render() {
      var res = searchGares(input.value, opts.max || 8);
      list.innerHTML = '';
      if (!res.length) { close(); return; }
      res.forEach(function (g) {
        var li = document.createElement('li');
        li.className = 'ds-suggestion-liste__item';
        li.setAttribute('role', 'option');
        li.setAttribute('tabindex', '0');
        li.setAttribute('aria-selected', 'false');
        var lab = document.createElement('span');
        lab.className = 'ds-suggestion-liste__label';
        lab.textContent = g[0];
        var det = document.createElement('span');
        det.className = 'ds-suggestion-liste__detail';
        det.textContent = '(' + g[1] + ')';
        li.appendChild(lab); li.appendChild(det);
        li.addEventListener('click', function () { pick(g[0]); });
        li.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(g[0]); }
        });
        list.appendChild(li);
      });
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); }
      if (e.key === 'ArrowDown' && !list.hidden) {
        e.preventDefault();
        var first = list.querySelector('.ds-suggestion-liste__item');
        if (first) { first.focus(); }
      }
    });
    document.addEventListener('click', function (e) {
      if (!box.contains(e.target)) { close(); }
    });
    return { close: close, render: render };
  }

  /* --- Sélecteur de date (calendrier DS) : box = conteneur cliquable, input = champ jj/mm/aaaa.
     opts.onPick(dateStr) : callback à la sélection. --- */
  function datepicker(box, input, opts) {
    opts = opts || {};
    var field = box.closest('.sos-field');
    field.classList.add('sos-field--dp');
    var pop = document.createElement('div');
    pop.className = 'sos-dp';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'Choisir une date');
    pop.hidden = true;
    field.appendChild(pop);

    var MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    var DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    function pad(n) { return String(n).padStart(2, '0'); }
    function parse(v) {
      var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v || '');
      return m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date();
    }
    function fmt(d) { return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
    var selected = parse(input.value);
    var view = new Date(selected.getFullYear(), selected.getMonth(), 1);

    function render() {
      var y = view.getFullYear(), mo = view.getMonth();
      var start = (new Date(y, mo, 1).getDay() + 6) % 7; /* lundi = 0 */
      var nb = new Date(y, mo + 1, 0).getDate();
      var t = new Date();
      var h = '<div class="sos-dp__head">'
        + '<button type="button" class="sos-dp__nav" data-nav="-1" aria-label="Mois précédent">‹</button>'
        + '<span class="sos-dp__month">' + MONTHS[mo] + ' ' + y + '</span>'
        + '<button type="button" class="sos-dp__nav" data-nav="1" aria-label="Mois suivant">›</button></div>'
        + '<div class="sos-dp__grid">';
      DOW.forEach(function (d) { h += '<span class="sos-dp__dow">' + d + '</span>'; });
      for (var i = 0; i < start; i++) { h += '<span class="sos-dp__day sos-dp__day--empty"></span>'; }
      for (var d = 1; d <= nb; d++) {
        var cls = 'sos-dp__day';
        if (selected.getFullYear() === y && selected.getMonth() === mo && selected.getDate() === d) { cls += ' is-selected'; }
        if (t.getFullYear() === y && t.getMonth() === mo && t.getDate() === d) { cls += ' is-today'; }
        h += '<button type="button" class="' + cls + '" data-day="' + d + '">' + d + '</button>';
      }
      pop.innerHTML = h + '</div>';
    }
    function open() { selected = parse(input.value); view = new Date(selected.getFullYear(), selected.getMonth(), 1); render(); pop.hidden = false; }
    function close() { pop.hidden = true; }

    box.addEventListener('click', function () { pop.hidden ? open() : close(); });
    pop.addEventListener('click', function (e) {
      /* le re-render détache e.target : sans stopPropagation, le handler document
         croirait à un clic extérieur et refermerait le calendrier */
      e.stopPropagation();
      var nav = e.target.closest('[data-nav]');
      if (nav) { view.setMonth(view.getMonth() + (+nav.getAttribute('data-nav'))); render(); return; }
      var day = e.target.closest('[data-day]');
      if (day) {
        selected = new Date(view.getFullYear(), view.getMonth(), +day.getAttribute('data-day'));
        input.value = fmt(selected);
        close();
        if (opts.onPick) { opts.onPick(input.value); }
      }
    });
    document.addEventListener('click', function (e) { if (!field.contains(e.target)) { close(); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); } });
    return { open: open, close: close };
  }

  /* --- Dropdown simple mono-sélection sur un champ .sos-input--select --- */
  function selectMenu(box, input, options, opts) {
    opts = opts || {};
    var field = box.closest('.sos-field');
    field.classList.add('sos-field--dropdown');
    var menu = document.createElement('ul');
    menu.className = 'sos-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;
    field.appendChild(menu);
    options.forEach(function (opt) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sos-menu__opt';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        input.value = (opt === (opts.allLabel || 'Tous')) ? '' : opt;
        menu.hidden = true;
        if (opts.onPick) { opts.onPick(input.value); }
      });
      li.appendChild(btn);
      menu.appendChild(li);
    });
    input.readOnly = true;
    input.style.cursor = 'pointer';
    box.addEventListener('click', function () { menu.hidden = !menu.hidden; });
    document.addEventListener('click', function (e) { if (!field.contains(e.target)) { menu.hidden = true; } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { menu.hidden = true; } });
  }

  /* --- Base démo « SOS Corr » : demandes pré-enregistrées (jeu de données 15/07).
     Semées uniquement quand la base n'existe pas (1re visite, ou juste après
     « Réinitialiser la base de démo » qui rappelle seedDemoBase()) :
       LLL222 / FOURNIER  « A traiter Supervision »  -> resoumission = IHM 2
                          (doublon en cours de traitement) ; visible dans la
                          file Supervision et dans la Consultation
       MMM333 / GIRARD    « Traitée : correspondance OK » -> resoumission =
                          IHM 15 (maintien de correspondance déjà traité) --- */
  var BASE_KEY = 'sos-demandes';
  function seedDemoBase() {
    try {
      if (localStorage.getItem(BASE_KEY) !== null) { return; }
      localStorage.setItem(BASE_KEY, JSON.stringify({
        'LLL222': { statut: 'a-traiter-supervision', sens: 'zou-tgv', gare: 'Toulon',
                    heure: '14:30', train: '17452', mail: true, ihm: '6', demo: true },
        'MMM333': { statut: 'traitee-corr-ok', sens: 'zou-tgv', gare: 'Cannes',
                    heure: '09:15', train: '17468', mail: true, demo: true }
      }));
    } catch (e) { /* localStorage indisponible (navigation privée) : démo dégradée */ }
  }
  seedDemoBase();

  window.SOSW = { norm: norm, searchGares: searchGares, autocomplete: autocomplete, datepicker: datepicker, selectMenu: selectMenu, seedDemoBase: seedDemoBase };
})();
