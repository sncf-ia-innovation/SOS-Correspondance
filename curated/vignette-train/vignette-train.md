# Vignette train

Vignette / carte de train : référence, bloc trajet (horaires, gares, durée), nombre de passagers, case de sélection, et badge d'état « Train supprimé ». 3 états (component-set Figma `Etat`).

## Anatomie

```
article.ds-vignette-train               (carte, fond clair, radius 16)
├── div.ds-vignette-train__body
│   ├── header.ds-vignette-train__header
│   │   ├── p.ds-vignette-train__reference        "Référence RORVVB"
│   │   └── span.ds-vignette-train__checkbox      (case sélection, 16×16)
│   ├── div.ds-vignette-train__journey            (conteneur trajet — contenu à l'usage)
│   └── p.ds-vignette-train__passengers
│       ├── span.ds-vignette-train__passengers-icon
│       └── span.ds-vignette-train__passengers-label  "2 Passagers"
└── p.ds-vignette-train__badge                    (badge "Train supprimé")
    ├── svg.ds-vignette-train__badge-icon  → #suppression
    └── span.ds-vignette-train__badge-label
```

## Classes exposées

| Classe | Rôle |
|---|---|
| `.ds-vignette-train` | base (état Default) |
| `.ds-vignette-train--selected` | modifier état Sélectionné (fond brand, texte clair) |
| `.ds-vignette-train--hover` | modifier état Survol (bordure brand) |
| `.ds-vignette-train__body` | colonne d'infos |
| `.ds-vignette-train__header` | ligne référence + case |
| `.ds-vignette-train__reference` | texte référence |
| `.ds-vignette-train__checkbox` | case de sélection |
| `.ds-vignette-train__journey` | conteneur du trajet (horaires/gares/durée) |
| `.ds-vignette-train__passengers` | ligne passagers |
| `.ds-vignette-train__passengers-icon` | pictogramme passagers |
| `.ds-vignette-train__passengers-label` | libellé passagers |
| `.ds-vignette-train__badge` | badge d'état |
| `.ds-vignette-train__badge-icon` | icône du badge |
| `.ds-vignette-train__badge-label` | libellé du badge |

## Variants

Mappés depuis la propriété Figma `Etat` :

- **Default** → `.ds-vignette-train`
- **Sélectionné** → `.ds-vignette-train--selected`
- **Survol** → `.ds-vignette-train--hover`

## Dépendances

- `../../dist/tokens.css` (couleurs, espacements, radius, typo)
- `../../dist/icons.sprite.svg#suppression` (icône badge « Train supprimé »)

## Notes

- Les frames `Frame 641`, `Frame 630`, `Frame 632` du raw sont vides (pas de contenu horaires/gares dans le scrap). `__journey` et `__passengers-icon` sont donc des conteneurs prêts à recevoir le contenu réel sans inventer de données.
- La case de sélection est un `span[role=checkbox]` neutre (le raw ne fournit qu'un carré 16×16 fond blanc, radius 4).
