# SOS Correspondance — écrans

Prototypes d'écrans SNCF reconstruits en **HTML / CSS purs** (aucun framework, aucun build)
à partir des maquettes Figma et des présentations projet, en réutilisant les composants
et tokens du design system. Police **Avenir** (avec fallback système).

Le projet **SOS Correspondance** vise à limiter les conséquences des **ruptures de
correspondance** (TER/ZOU! ↔ TGV INOUI / OUIGO / INTERCITÉS) lors de la mise en place du
SIBR Région Sud : fournir au client un titre de report digital et organiser la prise en
charge en gare.

## Lancer en local
Servez la racine du dépôt avec n'importe quel serveur statique, puis ouvrez `apps/index.html` :
```bash
git clone https://github.com/sncf-ia-innovation/SOS-Correspondance.git
cd SOS-Correspondance
python3 -m http.server 8080
# → http://localhost:8080/apps/index.html
```

## Déploiement (CI/CD) — standard projet

> **Toutes les applications de ce dépôt sont déployées en continu via GitHub Actions.**
> Chaque `push` sur `main` déclenche le déploiement automatique du site statique, avec
> une **surcouche mot de passe** injectée au moment du build. Détails, secrets et
> bootstrap → **[`DEPLOYMENT.md`](DEPLOYMENT.md)**.

- **Cible principale** : AWS **S3 + CloudFront** (`.github/workflows/deploy-aws.yml`)
  → sync S3 + invalidation CloudFront. URL live = domaine CloudFront.
- **Cible actuelle en ligne** : **GitHub Pages** via branche `gh-pages`
  (`.github/workflows/publish-ghpages.yml`) → chaque `push` sur `main` reconstruit
  le site (gate injectée) et le publie automatiquement.
  URL : https://sncf-ia-innovation.github.io/SOS-Correspondance/ (repo public).
- **Accès protégé** : `deploy/gate.js` injecté dans chaque page par
  `scripts/inject-gate.mjs`. Mot de passe stocké en **SHA-256** (secret
  `SOS_GATE_SHA256`), jamais en clair. Voile de confidentialité pour démo interne
  — **pas** une vraie authentification (voir DEPLOYMENT.md §3).

## Écrans (`apps/`)

### 🆘 SOS Correspondance — `apps/sos-correspondance/`
- **`client.html`** — parcours client (mobile), page progressive unique : bandeau dépliable,
  choix du sens du voyage (4 sens), révélation du formulaire (réf. dossier, nom, gare),
  **état d'erreur IHM 3** (DV/nom invalide → message, données conservées, « Modifier ma demande » ;
  déclencheur démo : Référence = `ERREUR`). Au « Valider », **routage selon le sens** :
  - ZOU! → TGV\*  → `form.html`
  - TGV\* → ZOU!  → `messages.html?m=tgv-zou`
  - ZOU! → ZOU!  → `messages.html?m=zou-zou`
  - Autres cas    → `messages.html?m=autres`
- **`form.html`** — « Confirmez votre train ZOU! » (liste de trains sélectionnables).
- **`messages.html?m=…`** — écrans de réponse (IHM). Variantes :
  `merci`, `prise-en-charge`, `deja`, `indispo` (crise), `zou-zou` (IHM 11), `tgv-zou`,
  `autres` (IHM 1), `introuvable` (IHM 5), `service-client` (3635, bouton `tel:`).
- **`notifications.html`** — aperçu des notifications client : **e-mails (Mail 1-4)** et
  **SMS (SMS 1-4)** : correspondance maintenue / nouveau billet / report sans garantie / PEC en gare.
- **`supervision.html`** — back-office (desktop) : onglets, filtres, tableau des demandes,
  sélection multiple, barre d'action collante (report / renvoi escale / corresp. OK / non traitable).
- **`consultation.html`** — back-office (desktop) : suivi des statuts + récapitulatif.

### 📨 Formulaires de contact
- **`apps/contact-pcdu/pcdu.html`** — « Renseignez vos coordonnées » (mobile + desktop 2 colonnes).
- **`apps/contact-ouigo/ouigo.html`** — réservation → questions → « Précisez votre demande » → coordonnées.

### 📝 Réclamation — `apps/reclamation/`
- **`reclamation.html`** — hub « Quel est le motif de votre demande ? » (9 motifs).
- **`train-retarde.html`** — type de trajet → réservation → coordonnées.
- **`contravention.html`** — intro + popin « Attention ».

## Assets (self-contained)
- `dist/tokens.css` — variables du design system (couleurs, espacements, radius, typo).
- `dist/icons.sprite.svg` — sprite d'icônes (référencé via `<use href>`), incl. logos
  `#logo-sncf-voyageurs` et `#logo-ouigo`.
- `curated/<composant>/<composant>.css` — CSS des composants réutilisés
  (boutons-inoui, radio, vignette-train, ligne-de-tableau, etapes-stepper, sticky-desktop,
  suggestion-liste, component-1).

## Notes / à confirmer avec Figma
- Thème teal SNCF (les frames Figma OUIGO sont en teal, pas magenta).
- Quelques valeurs hors design system, marquées `/* TODO */` : orange de crise
  (`--color-accent-17`), bande bleue décorative du header (`#2d7bd6`), QR-code du mail (placeholder).
- Les ~15 « IHM » numérotés des présentations se réduisent à ~9 textes distincts (les autres
  numéros sont le même écran réutilisé selon la branche) — les contenus distincts sont couverts.
- Restant (nécessite Figma) : autres motifs du hub réclamation (Train supprimé, Objet perdu,
  Paiement, Confort, Échange/annulation, Cartes/passes, Compte/Fidélité).

---
Reconstruit avec le design system **Patrick DS** (tokens + composants tokenisés). HTML + CSS + JS inline.

---

## Mise à jour 2026-07-02 — workflows bout-en-bout + admin messages

- **Workflows câblés** (étude DSI) : diapo 28 ZOU!→TGV* (étapes 0-6 : doublon / PAO / TIC TAC / SIDH / typo / gare) et diapo 29 TGV*→ZOU! (TIC TAC, règle avant/après 17h, doublon → IHM 18/19). Base partagée localStorage `sos-demandes` ; déclencheurs démo : Référence=`ERREUR`→IHM 3, Nom=`TICTAC`→codes TIC TAC, Gare=`AUCUN…`/Heure=`00:00`→IHM 4, `client.html?reset` vide la base.
- **Chaîne client ↔ supervision** : les demandes « A traiter supervision » alimentent la file (onglet selon le sens) ; les 4 motifs de la barre (= actions 12-15 diapo 37) mettent à jour le statut → le doublon client affiche IHM 2/12/15/16/17. Retour automatique au formulaire après la confirmation d'envoi.
- **Consultation** : filtres fonctionnels (date, gares réelles en autocomplete, transporteur, typologie, statut), tri, pagination, export CSV ; l'agent d'escale bascule « À traiter escale » → « Traitée escale » (case à cocher, diapos 39-40).
- **21 écrans IHM** (1-22 sans 10) — wordings « Version du 30-06 » (onglet « IHM Rassurance pour validation », validation SNCF prévue 03/07). Source unique JSON `assets/ihm-messages.js`.
- **`admin.html`** : panneau d'édition des messages — télécharger CSV/JSON, éditer dans Excel, recharger (parseur tolérant : `;`/`,`/tab, BOM, .xlsx détecté) ; la démo reflète aussitôt.
- **Gares réelles** : `assets/gares.js` (2 949 gares voyageurs SNCF, autocomplete accent-insensible) ; form.html applique « 1 train avant l'heure client + 5 après » (SIDH, diapo 24).
- **`workflows.html`** : comparaison côte à côte diapos PPT ↔ reconstruction (client / supervision / consultation + mapping statuts BDD).
- Pages toujours **serverless** : sprite DS inliné, tout fonctionne en `file://`.
