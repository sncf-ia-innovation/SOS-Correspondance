# Boutons INOUI

Bouton de la marque TGV INOUI. Un seul composant base + modifiers, dérivé d'un
component-set Figma de 16 variants (`Thème=Light`, `Couleur=Vert` constants).

## Structure

```
button.ds-bouton[.ds-bouton--primary | .ds-bouton--secondary]
├── (texte du label)
└── svg.ds-bouton__icon        ← optionnel (flèche « lien externe »)
```

L'ordre DOM porte la position de l'icône :
- icône **avant** le label → Type « Icône (gauche) »
- icône **après** le label → Type « Icône (droite) »

## Classes exposées

| Classe                   | Rôle                                                        |
|--------------------------|-------------------------------------------------------------|
| `.ds-bouton`             | Base : layout flex, hauteur 48, radius pill, typo Bariol.   |
| `.ds-bouton--primary`    | Variant Primaire : fond plein accent-4, texte blanc.        |
| `.ds-bouton--secondary`  | Variant Secondaire : contour accent-4, texte accent-4.      |
| `.ds-bouton--disabled`   | État désactivé sans attribut natif (alias de `:disabled`).  |
| `.ds-bouton__icon`       | Icône inline 16×16, `fill: currentColor`.                   |

## Axes de variants (depuis le raw)

| Axe      | Valeurs                                  | Implémentation                          |
|----------|------------------------------------------|-----------------------------------------|
| Bouton   | Primaire / Secondaire                    | modifiers `--primary` / `--secondary`   |
| État     | Par défaut / Au survol / Désactivé       | `:hover` / `:disabled` (CSS)            |
| Type     | Commun / Icône (gauche) / Icône (droite) | présence + position du `<svg>` en DOM   |
| Thème    | Light (seul)                             | non modélisé (constant)                 |
| Couleur  | Vert (seul)                              | non modélisé (constant)                 |

16 variants = 2 (Bouton) × 3 (Type) × … états répartis (Par défaut/Survol/Désactivé
selon les Types). Tous repliés sur cette base + modifiers + pseudo-classes.

## États (CSS)

- **hover** : passe en `accent-9` (#6e031b) — fond pour primaire, fond+texte blanc pour secondaire.
- **disabled** : opacité 0.3 (Figma encode le désactivé via couleur de base @ 30 %).
- **focus-visible** : outline `accent-9`, offset 2px (ajout d'accessibilité, absent du Figma).

## Mapping des couleurs (hex → token)

| Hex Figma  | Token             | Usage                        |
|------------|-------------------|------------------------------|
| `#9b2743`  | `--color-accent-4`| base bouton (fond/contour)   |
| `#6e031b`  | `--color-accent-9`| survol                       |
| `#ffffff`  | `--color-white`   | label & icône sur primaire   |
| `#9b27434d`| `--color-accent-4` + `opacity: 0.3` | état désactivé |

Aucun hex non tokenisé restant.

## Dépendances

- `../../dist/tokens.css` : couleurs, espacements, radius, typo.
- **Icône** : la flèche « lien externe » n'existe pas dans `icons.sprite.svg`
  (seul `transilien` matche « lien »). Elle est **inlinée** en SVG
  (`viewBox 0 0 16 16`, `fill: currentColor`) plutôt que référencée via `<use>`.
