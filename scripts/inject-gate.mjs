#!/usr/bin/env node
/*
 * inject-gate.mjs — insère la surcouche mot de passe (deploy/gate.js) dans
 * chaque fichier .html du site, AU MOMENT DU DÉPLOIEMENT uniquement.
 *
 * Le repo source reste "ungated" : la gate n'existe que sur le site publié.
 * Les hash SHA-256 des mots de passe viennent de l'env (secrets GitHub) :
 *   SOS_GATE_SHA256        mot de passe « complet » (toutes les pages)
 *   SOS_GATE_CLIENT_SHA256 mot de passe « client »  (optionnel — étude Unguess) :
 *                          accepté UNIQUEMENT sur le parcours formulaire client
 *                          (CLIENT_PAGES ci-dessous, marquées scope "client").
 * Sans aucun secret → aucune injection (site publié sans gate + avertissement).
 *
 * Idempotent : un marqueur <!--sos-gate-injected--> évite la double insertion.
 * Portable : le script gate est INLINÉ (aucun chemin relatif à gérer entre dossiers).
 *
 * Usage : SOS_GATE_SHA256=<hex> [SOS_GATE_CLIENT_SHA256=<hex>] node scripts/inject-gate.mjs [racine]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(process.argv[2] || ".");
const SELF_DIR = dirname(fileURLToPath(import.meta.url));
const GATE_PATH = join(SELF_DIR, "..", "deploy", "gate.js");

const isHex = (h) => /^[0-9a-f]{64}$/.test(h);
const HASH = (process.env.SOS_GATE_SHA256 || "").toLowerCase().trim();
const CLIENT_HASH = (process.env.SOS_GATE_CLIENT_SHA256 || "").toLowerCase().trim();
if (!isHex(HASH) && !isHex(CLIENT_HASH)) {
  console.warn("⚠️  SOS_GATE_SHA256 absent ou invalide → site publié SANS mot de passe.");
  process.exit(0); // ne bloque pas le déploiement
}
if (!isHex(HASH)) {
  console.warn("⚠️  SOS_GATE_SHA256 absent : seules les pages du parcours client seront protégées (mot de passe client). Les autres pages sont PUBLIQUES.");
}

/* Pages du parcours formulaire client, ouvertes par le mot de passe « client »
   (lien externe Unguess). Chemins relatifs à la racine publiée. */
const CLIENT_PAGES = new Set([
  "apps/sos-correspondance/client.html",
  "apps/sos-correspondance/form.html",
  "apps/sos-correspondance/messages.html",
]);

const gateJs = readFileSync(GATE_PATH, "utf8");
const MARKER = "<!--sos-gate-injected-->";
// Bloc injecté : les hash d'abord (portée selon la page), puis la gate inlinée.
function blockFor(rel) {
  let vars = "";
  if (isHex(HASH)) vars += `window.__SOS_GATE_SHA256__=${JSON.stringify(HASH)};`;
  if (isHex(CLIENT_HASH) && CLIENT_PAGES.has(rel)) {
    vars += `window.__SOS_GATE_CLIENT_SHA256__=${JSON.stringify(CLIENT_HASH)};window.__SOS_GATE_SCOPE__="client";`;
  }
  return (
    `${MARKER}\n` +
    `<script>${vars}</script>\n` +
    `<script>\n${gateJs}\n</script>\n`
  );
}

const SKIP_DIRS = new Set([".git", ".github", "node_modules", "scripts", "deploy"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else if (name.toLowerCase().endsWith(".html")) yield full;
  }
}

function inject(html, BLOCK) {
  if (html.includes(MARKER)) return null; // déjà fait
  // Priorité : avant </head>. Sinon après <body...>. Sinon après le doctype/1er tag.
  const headClose = html.search(/<\/head\s*>/i);
  if (headClose !== -1) return html.slice(0, headClose) + BLOCK + html.slice(headClose);
  const bodyOpen = html.search(/<body[^>]*>/i);
  if (bodyOpen !== -1) {
    const end = html.indexOf(">", bodyOpen) + 1;
    return html.slice(0, end) + "\n" + BLOCK + html.slice(end);
  }
  const firstTagEnd = html.indexOf(">");
  return firstTagEnd !== -1
    ? html.slice(0, firstTagEnd + 1) + "\n" + BLOCK + html.slice(firstTagEnd + 1)
    : BLOCK + html;
}

let done = 0, skipped = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).split("\\").join("/");
  const out = inject(readFileSync(file, "utf8"), blockFor(rel));
  if (out === null) { skipped++; continue; }
  writeFileSync(file, out);
  done++;
  console.log("  gated:", rel + (CLIENT_PAGES.has(rel) && isHex(CLIENT_HASH) ? "  (scope client)" : ""));
}
console.log(`✅ Surcouche injectée dans ${done} page(s) (${skipped} déjà faite(s)).`);
