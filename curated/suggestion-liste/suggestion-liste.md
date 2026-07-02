# Suggestion liste

Liste de suggestions / autocomplete. Items cliquables (libellé + détail secondaire),
état survol et état sélectionné.

## Structure

```
ul.ds-suggestion-liste            role="listbox"
└── li.ds-suggestion-liste__item  role="option"  (× n)
    ├── span.ds-suggestion-liste__label
    └── span.ds-suggestion-liste__detail
```

## Classes exposées

| Classe                                   | Rôle                                      |
| ---------------------------------------- | ----------------------------------------- |
| `ds-suggestion-liste`                    | conteneur `<ul>` (listbox)                |
| `ds-suggestion-liste__item`              | item cliquable (`<li>`, option)           |
| `ds-suggestion-liste__item--selected`    | modifier item sélectionné (variant Figma Variant2) |
| `ds-suggestion-liste__label`             | libellé principal                         |
| `ds-suggestion-liste__detail`            | détail secondaire (région, précision)     |

## Variants (Figma)

- **Default** : fond blanc, texte brand.
- **Variant2** → `--selected` : fond brand, texte blanc (item actif/choisi).

## États

- `:hover` / `:focus-visible` : voile brand léger (`--color-accent-3`).
- `--selected` : reste fond brand au survol.

## Dépendances

- `../../dist/tokens.css` (couleurs, espacements, radius, typo).
- Aucune icône : le composant Figma ne contient que du texte.
