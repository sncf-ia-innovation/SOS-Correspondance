# Sticky desktop

Barre d'action sticky (bas de page, desktop) : libellé de contexte à gauche, bouton d'action primaire à droite. Fond blanc translucide + flou d'arrière-plan, ombre haute légère.

## Structure

```
aside.ds-sticky                  région sticky, fond translucide + blur
├── p.ds-sticky__label           libellé de contexte (« 1 trajet sélectionné »)
└── button.ds-sticky__action     bouton primaire vert (« Valider ce trajet »)
    └── svg.ds-sticky__icon      flèche lien externe (inline, absente du sprite)
```

## Classes exposées

| Classe | Rôle |
| --- | --- |
| `ds-sticky` | Conteneur sticky en bas de viewport |
| `ds-sticky__label` | Texte de contexte à gauche (flex-grow) |
| `ds-sticky__action` | Bouton d'action primaire à droite |
| `ds-sticky__icon` | Icône flèche dans le bouton |

## Variants

Aucun variant dans le raw : une seule combinaison (thème Light, bouton primaire vert, icône à droite).

## Dépendances

- `dist/tokens.css` (couleurs, espacements, rayons, typographie)
- Aucune dépendance d'icône : la flèche « lien externe » est inlinée (absente de `icons.sprite.svg`).

## Notes

- Le bouton réutilise visuellement le pattern `boutons-inoui` (primaire vert, icône droite) mais reste autonome ici.
- L'ombre `0 -2px 10px #00000008` n'a pas de token correspondant (noir alpha 3 %) → conservée en hex avec TODO.
