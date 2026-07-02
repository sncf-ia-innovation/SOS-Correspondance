#!/usr/bin/env node
/*
 * inject-gate.mjs — insère la surcouche mot de passe (deploy/gate.js) dans
 * chaque fichier .html du site, AU MOMENT DU DÉPLOIEMENT uniquement.
 *
 * Le repo source reste "ungated" : la gate n'existe que sur le site publié.
 * Le hash SHA-256 du mot de passe vient de l'env SOS_GATE_SHA256 (secret GitHub).
 * Sans ce secret → aucune injection (le site est publié sans gate + avertissement).
 *
 * Idempotent : un marqueur <!--sos-gate-injected--> évite la double insertion.
 * Portable : le script gate est INLINÉ (aucun chemin relatif à gérer entre dossiers).
 *
 * Usage : SOS_GATE_SHA256=<hex> node scripts/inject-gate.mjs [racine]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(process.argv[2] || ".");
const SELF_DIR = dirname(fileURLToPath(import.meta.url));
const GATE_PATH = join(SELF_DIR, "..", "deploy", "gate.js");

const HASH = (process.env.SOS_GATE_SHA256 || "").toLowerCase().trim();
if (!/^[0-9a-f]{64}$/.test(HASH)) {
  console.warn("⚠️  SOS_GATE_SHA256 absent ou invalide → site publié SANS mot de passe.");
  process.exit(0); // ne bloque pas le déploiement
}

const gateJs = readFileSync(GATE_PATH, "utf8");
const MARKER = "<!--sos-gate-injected-->";
// Bloc injecté : le hash d'abord, puis le script de la gate inliné.
const BLOCK =
  `${MARKER}\n` +
  `<script>window.__SOS_GATE_SHA256__=${JSON.stringify(HASH)};</script>\n` +
  `<script>\n${gateJs}\n</script>\n`;

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

function inject(html) {
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
  const out = inject(readFileSync(file, "utf8"));
  if (out === null) { skipped++; continue; }
  writeFileSync(file, out);
  done++;
  console.log("  gated:", file.replace(ROOT + "/", ""));
}
console.log(`✅ Surcouche injectée dans ${done} page(s) (${skipped} déjà faite(s)).`);
