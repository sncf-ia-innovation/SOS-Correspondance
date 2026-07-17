/* SOS Correspondance — catalogue canonique des statuts de demande (source unique).
   statut base (clé sos-demandes) -> libellé affiché, clé badge consultation, IHM doublon client. */
window.SOS_STATUTS = {
  'a-traiter-supervision':     { label: 'À traiter sup.',        badge: 'todoSup',    ihm: '2'  },
  'a-traiter-escale':          { label: 'À traiter escale',      badge: 'todoEsc',    ihm: '16' },
  'typo-escale':               { label: 'Typo à traiter escale', badge: 'typoEsc',    ihm: '16' },
  'traitee-escale':            { label: 'Traitée escale',        badge: 'traiteEsc',  ihm: '16' },
  'traitee-report':            { label: 'Traité report',         badge: 'report',     ihm: '12' },
  'traitee-corr-ok':           { label: 'Maintien corresp.',     badge: 'corresp',    ihm: '15' },
  'non-traitee-supervision':   { label: 'Non traitée par sup.',  badge: 'nonTraitee', ihm: '17' },
  'traitee-poursuite-tgv':     { label: 'Poursuite TGV*',        badge: 'pursuit',    ihm: '12' },
  'traitee-poursuite-ter':     { label: 'Poursuite TGV*',        badge: 'pursuit',    ihm: '19' },
  'correspondance-en-journee': { label: 'Corresp. en journée',   badge: 'journee',    ihm: '9'  }
};
