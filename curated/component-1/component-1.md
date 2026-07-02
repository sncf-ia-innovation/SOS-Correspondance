# Status badge — pastille de statut billet (component-1)

Pastille de statut : dot coloré + libellé. La couleur du dot encode l'état du billet/titre.
Nature déduite du raw (5 variants, libellés "Valable…", "Valide…", "Expirée…", "Suspendue", "Remboursée").

## Structure

```
span.ds-status-badge.ds-status-badge--<état>
├── span.ds-status-badge__dot      (pastille couleur, décorative)
└── span.ds-status-badge__label    (libellé)
```

## Classes

| Classe | Rôle |
|---|---|
| `.ds-status-badge` | base (layout, typo, couleur label) |
| `.ds-status-badge__dot` | pastille de couleur |
| `.ds-status-badge__label` | libellé texte |
| `.ds-status-badge--upcoming` | Default — à venir (dot jaune `#ffd245`) |
| `.ds-status-badge--valid` | Variant2 — valide (dot vert `--color-accent-10`) |
| `.ds-status-badge--expired` | Variant3 — expirée (dot orange-rouge `--color-accent-17`) |
| `.ds-status-badge--suspended` | Variant4 — suspendue (dot orange-rouge `--color-accent-17`) |
| `.ds-status-badge--refunded` | Variant5 — remboursée (dot gris `--color-accent-6`) |

## Variants (5, mappés 1:1 au raw)

- `Default` → `--upcoming` — "Valable à partir du 01/01/2025"
- `Variant2` → `--valid` — "Valide du 01/01/2024 au 31/12/2024"
- `Variant3` → `--expired` — "Expirée depuis le 31/12/2024"
- `Variant4` → `--suspended` — "Suspendue"
- `Variant5` → `--refunded` — "Remboursée"

## Dependencies

- `../../dist/tokens.css` (couleurs, espacements, typo, radius)

## Notes

- `#ffd245` (dot jaune, Default) : aucun token proche → hex conservé avec TODO.
- Variant3 et Variant4 partagent la même couleur de dot (`#ff3c00`) dans le raw.
- Le dot est une `ELLIPSE` décorative Figma → rendu CSS pur, pas d'icône du sprite.
- Label `#002b28` → `--color-accent-2`, identique sur tous les variants.
