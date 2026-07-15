# Déploiement & CI/CD — standard SOS Correspondance

> **Règle projet.** Toutes les applications développées dans ce dépôt (et les
> futures apps de la même famille) sont **livrées en continu via GitHub Actions**.
> Chaque `push` sur `main` **déploie automatiquement** le site statique, avec une
> **surcouche mot de passe** injectée au moment du build. Aucun déploiement manuel.

Le site est 100 % statique (HTML/CSS/JS, aucun build). La chaîne CI/CD se contente
donc de : injecter la gate → publier les fichiers → invalider le cache.

---

## 1. Cible principale — AWS S3 + CloudFront

Workflow : [`.github/workflows/deploy-aws.yml`](.github/workflows/deploy-aws.yml)

```
push main ─▶ inject-gate.mjs ─▶ aws s3 sync ─▶ CloudFront invalidation ─▶ URL live
```

### Bootstrap AWS (une seule fois, côté compte SNCF)

À exécuter par quelqu'un ayant accès au compte AWS (toi, via `!` dans la session,
ou l'équipe cloud). Remplace `NOM-DU-BUCKET` et la région si besoin.

```bash
# 1) Bucket privé pour le site
aws s3api create-bucket --bucket NOM-DU-BUCKET \
  --region eu-west-3 --create-bucket-configuration LocationConstraint=eu-west-3

# 2) Distribution CloudFront devant le bucket (OAC + default root object index.html)
#    → le plus simple : créer via la console AWS, "Origin = S3 bucket",
#      "Origin access = Origin access control", "Default root object = index.html".
#    Récupère ensuite le Distribution ID (ex. E1XXXXXXXXXXXX) et le domaine
#    (ex. dxxxxxxxxxxxxx.cloudfront.net) → c'est ton URL live.

# 3) Utilisateur IAM déploiement (clés) — permissions minimales :
#    s3:ListBucket, s3:PutObject, s3:DeleteObject sur le bucket
#    cloudfront:CreateInvalidation sur la distribution
```

> **URL live** = le domaine CloudFront (`https://dxxxx.cloudfront.net`), ou un
> domaine custom (`sos-correspondance.sncf.fr`) via Route 53 + certificat ACM.

### Secrets GitHub à créer

`Repo → Settings → Secrets and variables → Actions → New repository secret` :

| Secret | Valeur | Exemple |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | clé IAM déploiement | `AKIA…` |
| `AWS_SECRET_ACCESS_KEY` | secret IAM | `…` |
| `AWS_REGION` | région du bucket | `eu-west-3` |
| `S3_BUCKET` | nom du bucket | `sos-correspondance-prod` |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID distribution | `E1XXXXXXXXXXXX` |
| `SOS_GATE_SHA256` | hash du mot de passe « complet » (voir §3) | `9b7bdd…12d7` |
| `SOS_GATE_CLIENT_SHA256` | hash du mot de passe « client » — parcours formulaire seul (voir §3 bis) | `4f21ac…88e0` |

Une fois les 6 secrets en place, chaque `push main` déploie tout seul.

### Variante recommandée — OIDC (sans clés longues)

Plutôt que des clés IAM statiques, utiliser un rôle assumé par OIDC
(pas de secret à faire tourner) :

1. Créer un IAM Identity Provider `token.actions.githubusercontent.com`.
2. Créer un rôle avec trust policy sur ce repo, secret `AWS_ROLE_ARN`.
3. Dans `deploy-aws.yml` : décommenter `id-token: write` + `role-to-assume`,
   commenter les 2 lignes `aws-access-key-id`/`aws-secret-access-key`.

---

## 2. Cible en ligne actuelle — GitHub Pages (branche gh-pages), auto sur push main

Workflow : [`.github/workflows/publish-ghpages.yml`](.github/workflows/publish-ghpages.yml)

**En place et automatique.** À chaque `push` sur `main` :
1. le workflow copie le site (`apps/ curated/ dist/ index.html`) dans `_site/` + `.nojekyll` ;
2. injecte la surcouche mot de passe (`scripts/inject-gate.mjs`) ;
3. force-push le résultat sur la branche **`gh-pages`** (via `GITHUB_TOKEN`) ;
4. GitHub Pages (config `build_type=legacy`, source `gh-pages /`) reconstruit et sert.

URL → `https://sncf-ia-innovation.github.io/SOS-Correspondance/` (repo **public**).

> Pourquoi pas le flux `actions/deploy-pages` officiel ? Sur ce repo il restait
> bloqué en `deployment_queued` (provisioning). La publication par branche est
> fiable ici. Repo privé aurait exigé un plan **GitHub Team** → repo passé public.
>
> Rien à faire à la main : le seul secret nécessaire est `SOS_GATE_SHA256` (déjà posé).

---

## 3. Surcouche mot de passe (la "gate")

- Code : [`deploy/gate.js`](deploy/gate.js) — injecté dans **chaque `.html`** par
  [`scripts/inject-gate.mjs`](scripts/inject-gate.mjs) **au déploiement seulement**.
  Le repo source reste sans gate (dev local en `file://` non gêné).
- Le mot de passe **n'est jamais stocké en clair** : seul son **SHA-256** est
  embarqué (secret `SOS_GATE_SHA256`). La page compare `SHA-256(saisie)` au hash.
- Déverrouillage mémorisé en `sessionStorage` (redemandé à chaque nouvelle session).

### ⚠️ Portée de sécurité — à lire

Ceci est un **voile de confidentialité**, pas une vraie authentification. Le HTML
est livré au navigateur : un utilisateur averti peut contourner (view-source, JS
désactivé, lecture réseau). Suffisant pour des **prototypes internes** partagés à
des parties prenantes. Pour une vraie protection : Basic Auth côté serveur
(CloudFront Function / Amplify Access control) ou un vrai SSO.

### Mot de passe courant

Le mot de passe **n'est pas stocké dans ce dépôt** (repo public). Il est communiqué
hors-repo (chat / canal privé). Seul son **SHA-256** vit dans le secret GitHub
`SOS_GATE_SHA256` — un hash n'est pas réversible, donc son exposition est sans risque.

**Ne jamais committer le mot de passe en clair** (le dépôt est public + l'historique
git est consultable). Pour le distribuer : copier-coller via un canal privé.

### Changer le mot de passe

```bash
# 1) générer un mot de passe fort
NEW=$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-28); echo "$NEW"
# 2) calculer son hash
printf '%s' "$NEW" | shasum -a 256
# 3) mettre le hash dans le secret GitHub SOS_GATE_SHA256, puis re-déployer
```

---

## 3 bis. Accès externe restreint — mot de passe « client » (étude Unguess)

Deuxième mot de passe, **limité au parcours formulaire client** :
`apps/sos-correspondance/client.html`, `form.html`, `messages.html`
(liste `CLIENT_PAGES` dans [`scripts/inject-gate.mjs`](scripts/inject-gate.mjs)).

- Secret GitHub : **`SOS_GATE_CLIENT_SHA256`** (même principe : SHA-256 du mot de
  passe, jamais le mot de passe en clair). Généré comme en §3, secret optionnel :
  sans lui, seul le mot de passe complet existe.
- Sur les pages du parcours client, la gate accepte **les deux** mots de passe.
  Sur toutes les autres pages (supervision, consultation, admin, hub…), seul le
  mot de passe **complet** est accepté : un testeur externe qui suit un lien vers
  ces pages retombe sur la gate.
- **Lien à communiquer à Unguess** (avec le mot de passe client, par canal privé) :
  `https://sncf-ia-innovation.github.io/SOS-Correspondance/apps/sos-correspondance/client.html`
- Même portée de sécurité qu'en §3 : voile de confidentialité côté navigateur,
  pas une authentification serveur. Les pages internes restent servies (mais
  voilées) — ne rien mettre de sensible dans ce site statique.

---

## 4. Tester l'injection en local

```bash
# copie jetable pour ne pas modifier le repo
cp -r . /tmp/sos-test && cd /tmp/sos-test
# hash = valeur du secret SOS_GATE_SHA256 (le hash du mot de passe actif)
SOS_GATE_SHA256=98bf9ed6c0336d9d1f55abe012b15d4891445b045e5e3263dffbcafd582f585a \
  node scripts/inject-gate.mjs
python3 -m http.server 8080   # → http://localhost:8080/apps/index.html (gate active)
```
