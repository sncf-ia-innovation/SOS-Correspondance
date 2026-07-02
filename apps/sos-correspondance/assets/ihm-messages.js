/* SOS Correspondance — wordings IHM (source unique, JSON).
   Source : « SOS Correspondance - grille validation wordings.xlsx »,
   onglet « IHM Rassurance pour validation », colonne « Version du 30-06 »
   (la plus récente ; VALIDATION SNCF VOYAGEURS prévue le 03/07 — en attente).
   21 écrans numérotés : IHM 1 à 22, sans IHM 10 (supprimé, décision OP 16-03).

   Le corps est du TEXTE SIMPLE (pas de HTML) avec un balisage léger :
     **gras**            -> <strong>
     [texte](https://…)  -> lien
     - item              -> liste à puces (une puce par ligne « - » dans le même bloc)
   Un élément du tableau `corps` = un bloc (paragraphe ou liste).

   Remplacement des messages : admin.html (upload d'un fichier CSV ou JSON,
   stocké en localStorage clé sos-ihm-overrides, fusionné par-dessus ces défauts).
   Modèle éditable dans Excel : assets/ihm-messages.csv (généré depuis ces défauts). */
window.SOS_IHM_DEFAULTS = {
  "1": {
    "label": "IHM 1 — Autres cas / voyage perturbé",
    "titre": "Selon votre correspondance :",
    "corps": [
      "- si votre voyage combine **deux trains à réservation obligatoire** (TGV INOUI, OUIGO, INTERCITÉS, TGV Lyria…), vous recevrez les informations sur la poursuite de votre voyage par SMS et / ou mail, utilisé lors de l'achat, au plus tard 10 min avant votre arrivée en gare de correspondance.\n- si votre voyage combine **deux trains régionaux**, votre billet ZOU! vous permet de voyager à bord du prochain train ZOU! desservant votre destination. Soyez attentif aux annonces sonores et consultez les écrans d'information.",
      "Votre chef de bord et le personnel en gare sont à votre disposition pour vous accompagner."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "2": {
    "label": "IHM 2 — Doublon : demande déjà faite, en attente de traitement",
    "titre": "Votre demande est en cours de traitement",
    "corps": [
      "Nous avons bien pris en compte votre nouvelle sollicitation. Votre demande est déjà enregistrée et en cours de traitement.",
      "Vous recevrez les informations pour poursuivre votre voyage **par SMS et / ou mail**, utilisé lors de l'achat, au plus tard 10 min avant votre arrivée en gare de correspondance.",
      "Votre chef de bord et le personnel en gare sont à votre disposition pour vous accompagner."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "3": {
    "label": "IHM 3 — DV non connu",
    "titre": "La référence de votre dossier voyage et/ou le nom de famille saisis ne nous permettent pas de retrouver votre voyage.",
    "corps": [
      "Nous vous invitons à les vérifier et à les corriger.",
      "Si vous rencontrez toujours des difficultés, votre chef de bord et le personnel en gare sont à votre disposition pour vous accompagner.",
      "Merci de votre compréhension."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": { "texte": "Modifier ma demande", "href": "client.html" },
    "note": null
  },
  "4": {
    "label": "IHM 4 — Aucun train ZOU! connu (horaire + gare saisis)",
    "titre": "L'horaire et/ou la gare de départ saisis ne nous permettent pas de retrouver votre train ZOU!.",
    "corps": [
      "Merci de vérifier les informations saisies et de les corriger.",
      "En cas de difficulté, votre chef de bord et le personnel en gare sont à votre disposition pour vous accompagner.",
      "Merci de votre compréhension."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": { "texte": "Modifier ma demande", "href": "client.html" },
    "note": null
  },
  "5": {
    "label": "IHM 5 — Aucun train identifié par le client dans la liste des 6",
    "titre": "Vous ne retrouvez pas votre trajet ?",
    "corps": [
      "Merci de vérifier et de corriger l'horaire et / ou la gare de départ que vous avez saisis.",
      "En cas de difficulté, votre chef de bord et le personnel en gare sont à votre disposition pour vous accompagner.",
      "Merci de votre compréhension."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": { "texte": "Modifier ma demande", "href": "form.html" },
    "note": null
  },
  "6": {
    "label": "IHM 6 — Demande prise en compte, va être traitée",
    "titre": "Votre demande est bien prise en compte",
    "corps": [
      "Nous avons bien enregistré votre demande. Elle est en cours de traitement.",
      "Vous recevrez les informations pour poursuivre votre voyage **par SMS et/ou mail**, utilisé lors de l'achat, au plus tard 10 min avant votre arrivée en gare de correspondance.",
      "Votre chef de bord et le personnel en gare sont à votre disposition pour vous accompagner."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "7": {
    "label": "IHM 7 — Renvoi sur le personnel (gare équipée)",
    "titre": "Vous allez être pris en charge en gare.",
    "corps": [
      "Dès votre arrivée en gare de correspondance, **rapprochez-vous du personnel**. Il vous accompagnera pour trouver une solution adaptée. Et si besoin, contactez nos conseillers au 3635*."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": "*Disponible 7j/7 de 8h à 20h (service gratuit + prix d'un appel)"
  },
  "8": {
    "label": "IHM 8 — Renvoi 3635 (pas de personnel en gare)",
    "titre": "Contactez nos conseillers au 3635* pour obtenir une aide sur votre demande.",
    "corps": [
      "Ils vous accompagneront pour trouver une solution adaptée à votre situation."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": { "texte": "Appeler le 3635", "href": "tel:3635" },
    "note": "*Disponible 7j/7 de 8h à 20h (service gratuit + prix d'un appel)"
  },
  "9": {
    "label": "IHM 9 — TGV vers ZOU! : report prochain train ZOU!",
    "titre": "Votre billet ZOU! vous permet de voyager sur le prochain train ZOU! desservant votre destination.",
    "corps": [
      "Plus d'info [ici](https://www.sncf-voyageurs.com/fr/voyagez-avec-nous/horaires-et-itineraires/horaires-en-gare/).",
      "Si plus aucun train ZOU! ne dessert votre destination ce jour, rapprochez-vous du personnel en gare de correspondance pour trouver une solution adaptée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "11": {
    "label": "IHM 11 — ZOU! vers ZOU!",
    "titre": "Votre billet ZOU! vous permet de voyager sur le prochain train ZOU! desservant votre destination.",
    "corps": [
      "Si plus aucun train ZOU! ne dessert votre destination ce jour, nous vous invitons à vous rapprocher du personnel en gare pour vous aider.",
      "Pour être informé en temps réel des solutions de poursuite du voyage, suivez le fil [@Transports_zou](https://twitter.com/Transports_zou) sur X/Twitter."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "12": {
    "label": "IHM 12 — Message TIC TAC envoyé + RC00 envoyé (nouveau billet)",
    "titre": "Votre nouveau billet vous a été envoyé.",
    "corps": [
      "Retrouvez-le dans votre **boîte mail utilisée lors de l'achat**.",
      "Pour toute question, le personnel en gare reste à votre disposition pour vous accompagner."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "13": {
    "label": "IHM 13 — Message TIC TAC envoyé, pas de place attribuée (train complet)",
    "titre": "Votre nouveau billet vous a été envoyé.",
    "corps": [
      "Retrouvez-le dans votre **boîte mail utilisée lors de l'achat**.",
      "Le train étant complet, nous ne pouvons malheureusement pas vous garantir une place assise.",
      "Pour toute question, votre chef de bord et le personnel en gare sont à votre disposition pour vous accompagner."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "14": {
    "label": "IHM 14 — Message TIC TAC envoyé mais e-mail manquant (seul SMS envoyé)",
    "titre": "Dès votre arrivée en gare de correspondance, rapprochez-vous du personnel.",
    "corps": [
      "Il vous accompagnera pour trouver une solution adaptée.",
      "Pour un prochain voyage, pensez à **renseigner votre adresse mail** lors de l'achat de votre billet, nous pourrons vous envoyer votre nouveau billet."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "15": {
    "label": "IHM 15 — Correspondance initiale OK, déjà traité",
    "titre": "Votre correspondance initiale est maintenue.",
    "corps": [
      "Retrouvez les informations de votre trajet dans votre **boîte mail utilisée lors de l'achat**.",
      "Pour toute question, le personnel en gare reste à votre disposition pour vous accompagner."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "16": {
    "label": "IHM 16 — À traiter par le personnel (déjà traité par SOS correspondance)",
    "titre": "Dès votre arrivée en gare de correspondance, rapprochez-vous du personnel.",
    "corps": [
      "Il vous accompagnera pour trouver une solution adaptée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "17": {
    "label": "IHM 17 — Déjà traité mais non traité par supervision (abandonné)",
    "titre": "Dès votre arrivée en gare de correspondance, rapprochez-vous du personnel.",
    "corps": [
      "Il vous accompagnera pour trouver une solution adaptée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "18": {
    "label": "IHM 18 — TGV → ZOU! : doublon, report sur train ZOU! suivant",
    "titre": "Votre billet ZOU! vous permet de voyager sur le prochain train ZOU! desservant votre destination.",
    "corps": [
      "Plus d'info [ici](https://www.sncf-voyageurs.com/fr/voyagez-avec-nous/horaires-et-itineraires/horaires-en-gare/).",
      "Si plus aucun train ZOU! ne dessert votre destination ce jour, rapprochez-vous du personnel en gare pour trouver une solution adaptée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "19": {
    "label": "IHM 19 — TGV → ZOU! : message TIC TAC envoyé, cas report",
    "titre": "Votre nouveau billet vous a été envoyé.",
    "corps": [
      "Retrouvez-le dans votre **boîte mail utilisée lors de l'achat**.",
      "Pour toute question, le personnel en gare reste à votre disposition pour vous accompagner."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "20": {
    "label": "IHM 20 — TGV → ZOU! : message TIC TAC envoyé, report + hébergement",
    "titre": "Votre nouveau billet vous a été envoyé.",
    "corps": [
      "Retrouvez-le dans votre **boîte mail utilisée lors de l'achat**.",
      "Votre correspondance ne peut pas être assurée aujourd'hui. Dès votre arrivée en gare, rapprochez-vous du personnel pour vous proposer une solution adaptée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "21": {
    "label": "IHM 21 — Message TIC TAC envoyé : SMS accompagnement & information",
    "titre": "Dès votre arrivée en gare de correspondance, rapprochez-vous du personnel.",
    "corps": [
      "Il vous accompagnera pour trouver une solution adaptée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "22": {
    "label": "IHM 22 — DIGIPEC : hébergement + report J+1 envoyés par TIC TAC",
    "titre": "Vous avez reçu un nouveau billet pour demain ainsi qu'une proposition d'hébergement dans votre boîte mail utilisée lors de l'achat.",
    "corps": [
      "Nous vous invitons à **confirmer cette proposition**."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "crise": {
    "label": "Bandeau — site indisponible (crise / événement exceptionnel)",
    "alerte": true,
    "titre": "Le site « Assistance correspondance » est momentanément indisponible.",
    "corps": [
      "En raison d'un événement exceptionnel, le trafic ferroviaire est fortement perturbé et nous ne pouvons traiter vos demandes en ligne.",
      "Nos équipes sont pleinement mobilisées pour vous accompagner **en gare et à bord** afin de trouver les meilleures solutions pour poursuivre votre voyage.",
      "Veuillez nous excuser pour la gêne occasionnée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  },
  "bug": {
    "label": "Bandeau — site indisponible (incident technique)",
    "alerte": true,
    "titre": "Le site « Assistance correspondance » est momentanément indisponible en raison d'un incident technique.",
    "corps": [
      "Nos équipes sont pleinement mobilisées pour vous accompagner **en gare et à bord** afin de trouver les meilleures solutions pour poursuivre votre voyage.",
      "Veuillez nous excuser pour la gêne occasionnée."
    ],
    "signature": "L'équipe SNCF Voyageurs",
    "bouton": null,
    "note": null
  }
};

/* API partagée : défauts + surcharges localStorage + rendu + CSV */
window.SOS_IHM = (function () {
  var KEY = 'sos-ihm-overrides';
  function overrides() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }

  /* --- balisage léger -> HTML --- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a class="msg__text-link" href="$2">$1</a>');
  }
  /* Un bloc de corps -> HTML. pre = 'msg' ou 'msg-alert' (classe des <p>). */
  function blockHtml(block, pre) {
    if (/^\s*</.test(block)) { return block; }              /* HTML brut toléré (compat) */
    var lines = block.split('\n').filter(function (l) { return l.trim(); });
    var isList = lines.length > 0 && lines.every(function (l) { return /^\s*-\s+/.test(l); });
    if (isList) {
      return '<ul class="msg__list">' + lines.map(function (l) {
        return '<li class="msg__item">' + inline(l.replace(/^\s*-\s+/, '')) + '</li>';
      }).join('') + '</ul>';
    }
    return '<p class="' + pre + '__text">' + inline(block) + '</p>';
  }

  /* --- CSV (séparateur ; — s'ouvre dans Excel) --- */
  var CSV_HEAD = ['id', 'titre', 'corps', 'signature', 'bouton_texte', 'bouton_href', 'note'];
  function csvCell(v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; }
  function toCsv() {
    var lines = [CSV_HEAD.join(';')];
    api.ORDER.forEach(function (id) {
      var m = api.get(id);
      lines.push([
        id, m.titre || '', (m.corps || []).join('\n\n'), m.signature || '',
        m.bouton ? m.bouton.texte : '', m.bouton ? m.bouton.href : '', m.note || ''
      ].map(csvCell).join(';'));
    });
    return '﻿' + lines.join('\r\n');
  }
  /* Parseur CSV tolérant : séparateur auto (; , tab), BOM/encodage Excel, guillemets multi-lignes. */
  function parseCsv(text) {
    /* BOM UTF-8 direct ou mal décodé (Excel Windows) */
    text = text.replace(/^\uFEFF/, '').replace(/^\u00EF\u00BB\u00BF/, '');
    if (text.slice(0, 2) === 'PK') {
      throw new Error('ce fichier est un .xlsx — dans Excel, enregistrez au format « CSV UTF-8 » puis rechargez');
    }
    /* détection du séparateur sur la 1re ligne : ; ou , ou tabulation */
    var firstLine = text.split(/\r?\n/)[0] || '';
    var SEP = ';';
    var counts = { sc: (firstLine.match(/;/g) || []).length,
                   co: (firstLine.match(/,/g) || []).length,
                   tb: (firstLine.match(/\t/g) || []).length };
    if (counts.co > counts.sc && counts.co >= counts.tb) { SEP = ','; }
    else if (counts.tb > counts.sc) { SEP = '\t'; }
    var rows = [], row = [], cur = '', inQ = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (inQ) {
        if (ch === '"') {
          if (text[i + 1] === '"') { cur += '"'; i++; } else { inQ = false; }
        } else { cur += ch; }
      } else if (ch === '"') { inQ = true; }
      else if (ch === SEP) { row.push(cur); cur = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') { i++; }
        row.push(cur); cur = '';
        if (row.some(function (c) { return c !== ''; })) { rows.push(row); }
        row = [];
      } else { cur += ch; }
    }
    row.push(cur);
    if (row.some(function (c) { return c !== ''; })) { rows.push(row); }
    return rows;
  }
  function fromCsv(text) {
    var rows = parseCsv(text);
    if (!rows.length) { throw new Error('fichier vide'); }
    /* en-têtes : minuscule + nettoyage BOM / guillemets / espaces parasites */
    var head = rows[0].map(function (h) {
      return String(h).replace(/^[\uFEFF\u00EF\u00BB\u00BF"'\s]+|["'\s]+$/g, '').toLowerCase();
    });
    var idx = {};
    CSV_HEAD.forEach(function (col) { idx[col] = head.indexOf(col); });
    if (idx.id === -1 || idx.titre === -1 || idx.corps === -1) {
      throw new Error('colonnes attendues : ' + CSV_HEAD.join(';')
        + ' — colonnes trouvées : ' + (head.join(' ; ') || '(aucune)').slice(0, 140));
    }
    var o = {}, ignored = [];
    rows.slice(1).forEach(function (r) {
      var id = (r[idx.id] || '').trim();
      if (!window.SOS_IHM_DEFAULTS[id]) { if (id) { ignored.push(id); } return; }
      var def = window.SOS_IHM_DEFAULTS[id];
      var btexte = idx.bouton_texte > -1 ? (r[idx.bouton_texte] || '').trim() : '';
      o[id] = {
        label: def.label,
        alerte: !!def.alerte,
        titre: (r[idx.titre] || '').trim(),
        corps: (r[idx.corps] || '').split(/\n\s*\n/).map(function (b) { return b.trim(); }).filter(Boolean),
        signature: idx.signature > -1 ? (r[idx.signature] || '').trim() : def.signature,
        bouton: btexte ? { texte: btexte, href: (idx.bouton_href > -1 && (r[idx.bouton_href] || '').trim()) || '#' } : null,
        note: (idx.note > -1 && (r[idx.note] || '').trim()) || null
      };
    });
    if (!Object.keys(o).length) { throw new Error('aucun id de message reconnu'); }
    localStorage.setItem(KEY, JSON.stringify(o));
    return { applied: Object.keys(o), ignored: ignored };
  }

  var api = {
    KEY: KEY,
    ORDER: ['1','2','3','4','5','6','7','8','9','11','12','13','14','15','16','17','18','19','20','21','22','crise','bug'],
    defaults: window.SOS_IHM_DEFAULTS,
    overrides: overrides,
    isOverridden: function (id) { return !!overrides()[id]; },
    get: function (id) { return overrides()[id] || window.SOS_IHM_DEFAULTS[id]; },
    resetAll: function () { localStorage.removeItem(KEY); },
    blockHtml: blockHtml,
    inline: inline,
    toCsv: toCsv,
    fromCsv: fromCsv,
    exportJson: function () {
      var out = {};
      this.ORDER.forEach(function (id) { out[id] = api.get(id); });
      return JSON.stringify(out, null, 2);
    },
    importJson: function (json) {
      var data = JSON.parse(json);           /* laisse l'exception remonter si invalide */
      var o = {};
      Object.keys(data).forEach(function (id) {
        if (window.SOS_IHM_DEFAULTS[id]) { o[id] = data[id]; }
      });
      if (!Object.keys(o).length) { throw new Error('aucun id de message reconnu'); }
      localStorage.setItem(KEY, JSON.stringify(o));
      return { applied: Object.keys(o), ignored: [] };
    }
  };
  return api;
})();
