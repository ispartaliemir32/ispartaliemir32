/**
 * Nabewerking en controle van de statische export in ./out (draait na `next build`).
 *
 * 1. Content-Security-Policy per pagina (als <meta>-tag, werkt bij elke host),
 *    met SHA-256-hashes van de inline scripts zodat 'unsafe-inline' niet nodig is.
 * 2. Kwaliteitscontroles; de build faalt bij een fout:
 *    - geen kapotte interne links of ankers
 *    - geen onbedoelde vermeldingen van zaken die Kozbica IT niet aanbiedt
 *      (zie VERBODEN hieronder), in zichtbare tekst en in metatags
 *    - geen cookies/trackingscripts van derden
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out", import.meta.url));
const errors = [];
const warnings = [];

if (!existsSync(OUT)) {
  console.error("✖ Map ./out bestaat niet. Draai eerst `next build`.");
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
const rel = (file) => relative(OUT, file).split(sep).join("/");
const allFiles = walk(OUT);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

// --- 1. CSP ---------------------------------------------------------------
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
const csp = (hashes) =>
  [
    "default-src 'self'",
    `script-src 'self' ${hashes.map((h) => `'sha256-${h}'`).join(" ")}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src 'none'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
  ].join("; ");

let cspCount = 0;
for (const file of htmlFiles) {
  let html = readFileSync(file, "utf8");
  html = html.replace(/<meta http-equiv="Content-Security-Policy" content="[^"]*"\/?>/, "");
  const hashes = new Set();
  for (const m of html.matchAll(INLINE_SCRIPT)) {
    if (/application\/ld\+json/i.test(m[1] ?? "") || !m[2]) continue;
    hashes.add(createHash("sha256").update(m[2], "utf8").digest("base64"));
  }
  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp([...hashes])}"/>`;
  const charset = /<meta charSet="utf-8"\/>/i;
  if (charset.test(html)) html = html.replace(charset, (x) => `${x}${meta}`);
  else if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, (x) => `${x}${meta}`);
  else {
    errors.push(`${rel(file)}: geen <head> voor CSP`);
    continue;
  }
  writeFileSync(file, html);
  cspCount++;
}

// --- 2a. Links en ankers ----------------------------------------------------
const idCache = new Map();
const idsIn = (file) => {
  if (!idCache.has(file)) idCache.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idCache.get(file);
};
function resolveTarget(pathname) {
  const clean = decodeURIComponent(pathname).replace(/\/+$/, "") || "/";
  const candidates = clean === "/" ? ["index.html"] : [clean.slice(1), `${clean.slice(1)}/index.html`, `${clean.slice(1)}.html`];
  for (const c of candidates) {
    const full = join(OUT, c);
    if (existsSync(full) && statSync(full).isFile()) return full;
  }
  return null;
}
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
let linkCount = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const raw = decode(m[2]);
    const where = `${rel(file)} → ${m[1]}="${raw}"`;
    if (raw === "" || raw === "#" || /^javascript:/i.test(raw)) {
      errors.push(`${where}: lege of onveilige link`);
      continue;
    }
    if (/^(https?:)?\/\//i.test(raw) || /^(mailto|tel|data):/i.test(raw)) continue;
    linkCount++;
    const url = new URL(raw, "https://site.invalid/" + rel(file));
    const target = raw.startsWith("#") ? file : resolveTarget(url.pathname);
    if (!target) {
      errors.push(`${where}: doel bestaat niet`);
      continue;
    }
    const frag = url.hash.slice(1);
    if (frag && target.endsWith(".html") && !idsIn(target).has(decodeURIComponent(frag))) {
      errors.push(`${where}: anker #${frag} niet gevonden in ${rel(target)}`);
    }
  }
}

// --- 2b. Inhoud: niets vermelden wat Kozbica IT niet doet ---------------------
const VERBODEN = [
  /softwareontwikkel/i, /programmeer/i, /\bprogrammeren\b/i, /\bAPI'?s?\b/, /koppeling/i, /integratie/i,
  /requirements/i, /specificatie/i, /projectleid/i, /\bhosting/i, /serverbeheer/i, /cloudbeheer/i, /cloudinfrastructuur/i, /cloudoplossing/i, /cloudmigratie/i,
  /bekabeling/i, /hardware/i, /inkoop/i, /inkopen/i, /\bISO\b/, /\bNIS2\b/i, /compliance/i,
  /24\/7/, /\bspoed/i, /\bSLA\b/, /hersteltijd/i, /garantie/i, /\bklantlogo/i, /\breview/i, /testimonial/i,
];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const metas = [...html.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => m[1]).join(" ");
  const text = html.replace(/<[^>]+>/g, " ") + " " + metas;
  for (const re of VERBODEN) {
    const hit = text.match(re);
    if (hit) errors.push(`${rel(file)}: bevat "${hit[0]}", dat past niet bij het aanbod`);
  }
}

// --- 2c. Geen scripts of verzoeken naar derden ---------------------------------
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/<script[^>]+src="(https?:)?\/\/[^"]+"/g)) errors.push(`${rel(file)}: extern script ${m[0]}`);
}
for (const f of ["_headers", ".htaccess"]) {
  if (!existsSync(join(OUT, f))) errors.push(`out/${f} ontbreekt (verwacht vanuit public/${f})`);
}
if (!existsSync(join(OUT, "404.html"))) errors.push("out/404.html ontbreekt");

// --- 2d. Placeholders ----------------------------------------------------------
for (const file of htmlFiles) {
  const text = readFileSync(file, "utf8").replace(/<script[\s\S]*?<\/script>/gi, "");
  const found = [...new Set(text.match(/\[(KVK-NUMMER|EMAIL|PHONE|BTW|ADRES)\]/g) ?? [])];
  if (found.length && !warnings.some((w) => w.includes(found.join(", ")))) warnings.push(`${rel(file)}: placeholder ${found.join(", ")} (invullen in src/config/site.ts)`);
}

for (const w of warnings.slice(0, 3)) console.warn(`⚠ ${w}`);
if (errors.length) {
  console.error(`\n✖ Postbuild-controle mislukt (${errors.length} fout(en)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ Postbuild: CSP op ${cspCount} pagina's, ${linkCount} interne links gecontroleerd, geen verboden inhoud, geen externe scripts.`);
