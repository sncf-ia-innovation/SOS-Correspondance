# Radio

Option radio riche : pastille radio + label + icône trailing, dans un conteneur cliquable. 3 états issus du component-set Figma `Radio` (variant `State`).

## Structure

```
label.ds-radio                       (conteneur cliquable)
├── input.ds-radio__input            (<input type=radio>, masqué visuellement)
├── span.ds-radio__control           (pastille radio)
│   ├── svg.ds-radio__icon--off      (cercle vide, radio-off)
│   └── svg.ds-radio__icon--on       (cercle plein, radio-on, visible si :checked)
├── span.ds-radio__label             ("Vélo")
└── svg.ds-radio__trailing           (icône trailing, compte)
```

## États

| État Figma | Rendu HTML/CSS              | Style                                              |
|------------|-----------------------------|----------------------------------------------------|
| Default    | repos                       | bordure gris-84, contenu gris (label gris-31)      |
| Hover      | `:hover`                    | fond accent-18, bordure + contenu brand            |
| State3     | `:has(:checked)` (sélection)| fond brand plein, contenu blanc, radio-on visible  |

## Classes exposées

- `ds-radio` — conteneur (base)
- `ds-radio__input` — input radio réel
- `ds-radio__control` — pastille
- `ds-radio__icon`, `ds-radio__icon--off`, `ds-radio__icon--on` — pictos radio
- `ds-radio__label` — texte
- `ds-radio__trailing` — icône trailing

## Usage

Plusieurs `.ds-radio` partageant le même `name` forment un groupe. La sélection est gérée nativement par `<input type=radio>`.

## Dependencies

- `../../dist/tokens.css` — couleurs, spacing, radius, font
- Géométries SVG inline issues de `../../dist/icons.sprite.svg` (`#radio-off`, `#radio-on`, `#compte`), `fill` re-tokenisé via `currentColor`.
