# SOS Correspondance — écrans

Prototypes d'écrans SNCF reconstruits en HTML/CSS purs à partir des maquettes Figma,
en réutilisant les composants du design system (tokens + composants tokenisés).

## Lancer en local
Servez la racine avec n'importe quel serveur statique, puis ouvrez `apps/index.html` :
```bash
python3 -m http.server 8080
# http://localhost:8080/apps/index.html
```

## Contenu (`apps/`)
- **sos-correspondance/** — parcours SOS Correspondance : `client` (demande), `form` (train),
  `messages` (réponses ?m=merci|prise-en-charge|deja|indispo), `supervision`, `consultation`.
- **contact-pcdu/** — formulaire de contact PCDU (coordonnées).
- **contact-ouigo/** — contact OUIGO (réservation → questions → coordonnées).
- **reclamation/** — `reclamation` (hub motif), `train-retarde`, `contravention`.

## Assets
- `dist/tokens.css` — variables du design system (couleurs, espacements, radius, typo).
- `dist/icons.sprite.svg` — sprite d'icônes (référencé via `<use href>`).
- `curated/<composant>/<composant>.css` — CSS des composants réutilisés.

100% HTML + CSS + JS inline (aucun framework, aucun build). Police Avenir avec fallback système.
