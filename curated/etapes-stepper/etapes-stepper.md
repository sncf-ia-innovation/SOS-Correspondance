# Étapes / Stepper

Suite d'étapes horizontales reliées par un connecteur, chaque étape ayant un
indicateur (barre + coche si complétée) et un label. États : complétée, active,
à venir.

## Source Figma

`raw/components/etapes-stepper.json` — component-set, 3 variants. Chaque variant
décrit **une seule étape** dans un état (`Property 2` = On / Actuel / Futur).
Recomposé ici en `<ol>` de plusieurs `<li>`, un état par modifier.

## Arbre

```
ol.ds-stepper
└── li.ds-stepper__step (--complete | --active | --avenir)
    ├── span.ds-stepper__indicator   (barre/connecteur, ::after = connecteur inter-étape)
    │   └── svg.ds-stepper__icon      (coche, uniquement --complete → #check-on)
    └── span.ds-stepper__label
```

## Classes exposées

- `.ds-stepper` — conteneur `<ol>`
- `.ds-stepper__step` — étape `<li>` (base)
- `.ds-stepper__step--complete` — étape complétée (barre grise + coche)
- `.ds-stepper__step--active` — étape active (barre brand, label medium) ; porte `aria-current="step"`
- `.ds-stepper__step--avenir` — étape à venir (barre vert très clair, label estompé)
- `.ds-stepper__indicator` — barre d'état + connecteur
- `.ds-stepper__icon` — coche d'étape complétée
- `.ds-stepper__label` — libellé de l'étape

## États / mapping couleurs

| État      | Barre              | Label                       | Variant Figma |
|-----------|--------------------|-----------------------------|---------------|
| complete  | `--color-gray-85`  | `--color-gray-20`           | Property 2=On |
| active    | `--color-brand`    | `--color-gray-20` (medium)  | Property 2=Actuel |
| avenir    | `--color-gray-98`  | `--color-gray-97` (TODO)    | Property 2=Futur |

## Accessibilité

- `<ol>` sémantique = séquence ordonnée d'étapes.
- L'étape active porte `aria-current="step"`.
- Indicateurs/icônes en `aria-hidden`, l'information d'état passe par le label visible.

## Dépendances

- `dist/tokens.css` (couleurs, espacements, radius, typo)
- `dist/icons.sprite.svg#check-on` (coche d'étape complétée)

## Notes

- Source `#f4f5f6` (label à venir) sans token exact : mappé sur `--color-gray-97`
  (`#f7f7f7`, plus proche en distance RGB), TODO en commentaire CSS.
- Le connecteur entre étapes est un pseudo-élément `::after` de l'indicateur qui
  comble le `gap`, héritant la couleur d'état de l'étape de gauche.
