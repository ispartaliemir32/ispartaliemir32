/**
 * Nabewerking van de statische export in ./out (draait na `next build`).
 *
 * 1. Content-Security-Policy per HTML-pagina
 *    Next.js plaatst inline <script>-blokken in elke pagina. Zonder server
 *    (statische export) kunnen we geen nonce gebruiken, dus berekenen we per
 *    pagina SHA-256-hashes van de inline scripts en zetten we een strikte CSP
 *    als <meta http-equiv="Content-Security-Policy"> bovenaan <head>.
 *
 * 2. Kwaliteitscontroles (de build faalt bij fouten)
 *    - geen kapotte interne links of ankers (#sectie)
 *    - geen mailto:/tel:-links naar [PLACEHOLDERS]
 *    - _headers binnen de limieten van Cloudflare (100 regels, 2.000 tekens per regel)
 *    - geen namen van geheimen in de publieke bestanden
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out", import.meta.url));
const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";
const errors = [];
const warnings = [];

if (!existsSync(OUT)) {
  console.error("✖ Map ./out bestaat niet. Draai eerst `next build`.");
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const allFiles = walk(OUT);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const rel = (file) => relative(OUT, file).split(sep).join("/");

// ---------------------------------------------------------------------------
// 1. CSP-meta-tag met hashes
// ---------------------------------------------------------------------------
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;

function buildCsp(hashes) {
  const scriptSrc = ["'self'", ...hashes.map((h) => `'sha256-${h}'`), TURNSTILE_ORIGIN].join(" ");
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self' ${TURNSTILE_ORIGIN}`,
    `frame-src ${TURNSTILE_ORIGIN}`,
    "manifest-src 'self'",
    "worker-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
  ].join("; ");
}

let cspCount = 0;
for (const file of htmlFiles) {
  let html = readFileSync(file, "utf8");
  if (html.includes('http-equiv="Content-Security-Policy"')) {
    html = html.replace(/<meta http-equiv="Content-Security-Policy" content="[^"]*"\/?>/, "");
  }

  const hashes = new Set();
  for (const match of html.matchAll(INLINE_SCRIPT)) {
    const attrs = match[1] ?? "";
    const body = match[2] ?? "";
    // JSON-LD wordt niet uitgevoerd en valt niet onder script-src.
    if (/type=["']application\/ld\+json["']/i.test(attrs) || body.length === 0) continue;
    hashes.add(createHash("sha256").update(body, "utf8").digest("base64"));
  }

  const meta = `<meta http-equiv="Content-Security-Policy" content="${buildCsp([...hashes])}"/>`;
  const charset = /<meta charSet="utf-8"\/>/i;
  if (charset.test(html)) {
    html = html.replace(charset, (m) => `${m}${meta}`);
  } else if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head[^>]*>/i, (m) => `${m}${meta}`);
  } else {
    errors.push(`${rel(file)}: geen <head> gevonden voor CSP`);
    continue;
  }
  writeFileSync(file, html);
  cspCount++;
}

// ---------------------------------------------------------------------------
// 2a. Interne links en ankers
// ---------------------------------------------------------------------------
const idCache = new Map();
function idsIn(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

function resolveTarget(pathname) {
  const clean = decodeURIComponent(pathname).replace(/\/+$/, "") || "/";
  const candidates =
    clean === "/"
      ? ["index.html"]
      : [clean.slice(1), `${clean.slice(1)}.html`, `${clean.slice(1)}/index.html`];
  for (const candidate of candidates) {
    const full = join(OUT, candidate);
    if (existsSync(full) && statSync(full).isFile()) return full;
  }
  return null;
}

const decodeEntities = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

let linkCount = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const raw = decodeEntities(match[2]);
    const where = `${rel(file)} → ${match[1]}="${raw}"`;

    if (raw === "" || raw === "#") {
      errors.push(`${where}: lege link`);
      continue;
    }
    if (/^javascript:/i.test(raw)) {
      errors.push(`${where}: javascript:-link`);
      continue;
    }
    if (/^(mailto|tel):\s*\[/i.test(raw)) {
      errors.push(`${where}: link naar een niet-ingevulde placeholder`);
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
    const fragment = url.hash.slice(1);
    if (fragment && target.endsWith(".html") && !idsIn(target).has(decodeURIComponent(fragment))) {
      errors.push(`${where}: anker #${fragment} niet gevonden in ${rel(target)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2b. _headers-limieten
// ---------------------------------------------------------------------------
const headersFile = join(OUT, "_headers");
if (!existsSync(headersFile)) {
  errors.push("out/_headers ontbreekt (verwacht vanuit public/_headers)");
} else {
  const lines = readFileSync(headersFile, "utf8").split("\n");
  const rules = lines.filter((l) => l.trim() && !l.startsWith("#") && !/^\s/.test(l));
  if (rules.length > 100) errors.push(`_headers bevat ${rules.length} regels (max. 100)`);
  lines.forEach((line, i) => {
    if (line.length > 2000) errors.push(`_headers regel ${i + 1} is langer dan 2.000 tekens`);
  });
}

// ---------------------------------------------------------------------------
// 2c. Geen geheimen in de publieke bestanden
// ---------------------------------------------------------------------------
const SECRET_MARKERS = ["TURNSTILE_SECRET_KEY", "RESEND_API_KEY", "MSGRAPH_CLIENT_SECRET", "1x0000000000000000000000000000000AA"];
for (const file of allFiles.filter((f) => /\.(html|js|txt|json|css)$/.test(f))) {
  const content = readFileSync(file, "utf8");
  for (const marker of SECRET_MARKERS) {
    if (content.includes(marker)) errors.push(`${rel(file)} bevat "${marker}"; geheimen horen niet in de frontend`);
  }
}

if (!existsSync(join(OUT, "404.html"))) warnings.push("out/404.html ontbreekt (404-pagina voor not_found_handling)");

// ---------------------------------------------------------------------------
for (const w of warnings) console.warn(`⚠ ${w}`);
if (errors.length > 0) {
  console.error(`\n✖ Postbuild-controle mislukt (${errors.length} fout(en)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `✓ Postbuild: CSP toegevoegd aan ${cspCount} HTML-pagina's, ${linkCount} interne links/bronnen gecontroleerd, _headers geldig.`,
);
