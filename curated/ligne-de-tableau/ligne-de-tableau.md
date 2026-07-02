# Ligne de tableau

Ligne de tableau (table row) du parcours admin. Une base `<table>` + lignes
modifiers pour les 3 variants Figma : en-tête, ligne claire, ligne foncée
(zébrage). Première colonne = poignée de déplacement, colonne statut = badge
pastille.

## Structure

```
table.ds-ligne-tableau
├── thead
│   └── tr.ds-ligne-tableau__row--entete          (Type=Entête)
│       ├── th.ds-ligne-tableau__cell--handle      (vide)
│       └── th.ds-ligne-tableau__cell × 4          (Nom, Transporteurs, Statut, Dernière modification)
└── tbody
    ├── tr.ds-ligne-tableau__row--claire           (Type=Ligne claire)
    │   ├── td.ds-ligne-tableau__cell--handle
    │   │   └── span.ds-ligne-tableau__drag > svg.ds-ligne-tableau__drag-icon
    │   ├── td.ds-ligne-tableau__cell × 2
    │   ├── td.ds-ligne-tableau__cell
    │   │   └── span.ds-ligne-tableau__statut--vert
    │   │       ├── span.ds-ligne-tableau__statut-dot
    │   │       └── span.ds-ligne-tableau__statut-label
    │   └── td.ds-ligne-tableau__cell
    └── tr.ds-ligne-tableau__row--foncee           (Type=Ligne foncée)
        └── … (idem, statut--safran)
```

## Classes exposées

| Classe | Rôle |
| --- | --- |
| `ds-ligne-tableau` | Table conteneur |
| `ds-ligne-tableau__row` | Ligne (base) |
| `ds-ligne-tableau__row--entete` | Variant en-tête (fond brand, texte blanc) |
| `ds-ligne-tableau__row--claire` | Variant ligne claire (fond clair) |
| `ds-ligne-tableau__row--foncee` | Variant ligne foncée (zébrage) |
| `ds-ligne-tableau__cell` | Cellule (th/td) |
| `ds-ligne-tableau__cell--handle` | Cellule poignée (1ère colonne, largeur 48px) |
| `ds-ligne-tableau__drag` / `__drag-icon` | Poignée de déplacement + icône |
| `ds-ligne-tableau__statut` | Badge statut (base) |
| `ds-ligne-tableau__statut--vert` | Statut « Vert pomme » (En ligne) |
| `ds-ligne-tableau__statut--safran` | Statut « Jaune safran » (Brouillon) |
| `ds-ligne-tableau__statut-dot` / `__statut-label` | Pastille + libellé du statut |

## Variants (Figma : propriété `Type`)

- **Entête** — ligne d'en-tête, fond `--color-brand`, texte blanc.
- **Ligne claire** — ligne de données, fond `--color-gray-98`.
- **Ligne foncée** — ligne de données alternée, fond `--color-gray-94`.

## Dépendances

- `dist/tokens.css` — variables couleurs / espacement / radius.
- Aucune dépendance framework.
- Icône poignée (drag) : aucun id correspondant dans `dist/icons.sprite.svg`,
  rendue en SVG inline (grip à 6 points).
- Badge statut : couleurs de statut (vert pomme, jaune safran) absentes des
  tokens, conservées en hex avec `/* TODO */`.
