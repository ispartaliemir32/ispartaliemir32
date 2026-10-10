/**
 * Genereert alle logo-, favicon- en app-iconbestanden uit het officiële logo.
 *
 *   npm run brand
 *
 * Bron:    brand/kozbica-it-logo-origineel.png  (aangeleverd logo op lichte achtergrond)
 *
 * Uitvoer (worden in Git meegenomen; draai dit script alleen opnieuw als het logo wijzigt):
 *   src/assets/brand/kozbica-it-logo.png       volledig logo, transparant (lichte achtergronden)
 *   src/assets/brand/kozbica-it-logo-wit.png   idem, woordmerk wit (donkere achtergronden, footer)
 *   src/assets/brand/kozbica-it-schild.png     alleen het schildsymbool, transparant
 *   src/app/icon.png                           favicon (PNG, 512 px)
 *   src/app/favicon.ico                        favicon voor oudere browsers (16/32/48 px)
 *   src/app/apple-icon.png                     iOS-startscherm (180 px)
 *   public/icons/icon-192.png, icon-512.png, icon-maskable-512.png   webmanifest / Schema.org
 *
 * Werkwijze: de (bijna) witte achtergrond wordt omgezet naar echte transparantie
 * ("color to alpha"), zodat randen zacht blijven. De witte circuitlijnen in het
 * schild zijn in het ontwerp uitsparingen en worden dus ook transparant. Het logo
 * wordt nergens vervormd: alleen bijgesneden, geschaald en (voor iconen) opgevuld.
 */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const path = (p) => new URL(p, root).pathname;
const SOURCE = path("brand/kozbica-it-logo-origineel.png");

// --- 1. Pixels inlezen ------------------------------------------------------
const { data: rgb, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = (x, y) => (y * W + x) * 3;

// Achtergrondkleur = mediaan van de randpixels (licht ruisende, gebroken witte achtergrond).
const border = [];
for (let x = 0; x < W; x += 4) border.push(px(x, 0), px(x, H - 1));
for (let y = 0; y < H; y += 4) border.push(px(0, y), px(W - 1, y));
const median = (arr) => arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)];
const BG = [0, 1, 2].map((c) => median(border.map((i) => rgb[i + c])));

// --- 2. Color to alpha ------------------------------------------------------
// alpha = grootste relatieve afwijking van de achtergrond per kanaal.
// NOISE: ruis in de achtergrond negeren; FULL: vanaf hier volledig dekkend
// (de donkerste merkkleur, navy #122636, ligt ruim boven deze grens).
const NOISE = 0.03;
const FULL = 0.86;
const rgba = Buffer.alloc(W * H * 4);
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = px(x, y);
    const o = (y * W + x) * 4;
    const raw = Math.max(...[0, 1, 2].map((c) => (BG[c] - rgb[i + c]) / BG[c]));
    const alpha = Math.min(1, Math.max(0, (raw - NOISE) / (FULL - NOISE)));
    if (alpha > 0) {
      for (let c = 0; c < 3; c++) {
        // kleur "ontmengen" van de achtergrond
        const value = BG[c] - (BG[c] - rgb[i + c]) / alpha;
        rgba[o + c] = Math.round(Math.min(255, Math.max(0, value)));
      }
      rgba[o + 3] = Math.round(alpha * 255);
      if (alpha > 0.1) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
}

// --- 3. Schild en woordmerk scheiden (eerste lege kolom na het schild) -------
const columnHasInk = (x) => {
  for (let y = minY; y <= maxY; y++) if (rgba[(y * W + x) * 4 + 3] > 25) return true;
  return false;
};
let shieldEnd = minX;
while (shieldEnd <= maxX && columnHasInk(shieldEnd)) shieldEnd++;

const PAD = 4;
const crop = (left, top, right, bottom) => ({
  left: Math.max(0, left - PAD),
  top: Math.max(0, top - PAD),
  width: Math.min(W, right + PAD + 1) - Math.max(0, left - PAD),
  height: Math.min(H, bottom + PAD + 1) - Math.max(0, top - PAD),
});
const full = crop(minX, minY, maxX, maxY);
const shield = crop(minX, minY, shieldEnd - 1, maxY);

// Variant voor donkere achtergronden: navy woordmerk → wit, turquoise blijft.
const onDark = Buffer.from(rgba);
for (let o = 0; o < onDark.length; o += 4) {
  if (onDark[o + 3] === 0) continue;
  const [r, g, b] = [onDark[o], onDark[o + 1], onDark[o + 2]];
  const isNavy = g < 110 && b < 125 && !(g > r + 60); // turquoise heeft hoge G t.o.v. R
  if (isNavy) onDark[o] = onDark[o + 1] = onDark[o + 2] = 255;
}

const fromRaw = (buffer) => sharp(buffer, { raw: { width: W, height: H, channels: 4 } });
const png = (img) => img.png({ compressionLevel: 9, adaptiveFiltering: true });

await mkdir(path("src/assets/brand/"), { recursive: true });
await mkdir(path("public/icons/"), { recursive: true });

const LOGO_HEIGHT = 160; // ruim voor weergave op 40 px hoogte bij 3x-schermen
await png(fromRaw(rgba).extract(full).resize({ height: LOGO_HEIGHT })).toFile(path("src/assets/brand/kozbica-it-logo.png"));
await png(fromRaw(onDark).extract(full).resize({ height: LOGO_HEIGHT })).toFile(path("src/assets/brand/kozbica-it-logo-wit.png"));
const shieldPng = await png(fromRaw(rgba).extract(shield)).toBuffer();
await png(sharp(shieldPng).resize({ height: 256 })).toFile(path("src/assets/brand/kozbica-it-schild.png"));

// --- 4. Iconen: schild gecentreerd op een vierkant canvas -------------------
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
async function square(size, { padding, background = TRANSPARENT }) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(shieldPng).resize(inner, inner, { fit: "contain", background: TRANSPARENT }).png().toBuffer();
  return png(sharp({ create: { width: size, height: size, channels: 4, background } }).composite([{ input: mark, gravity: "centre" }])).toBuffer();
}

/** .ico-bestand met PNG-afbeeldingen (ondersteund door alle moderne browsers). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await writeFile(path("src/app/icon.png"), await square(512, { padding: 0.04 }));
const ico = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await square(size, { padding: 0.02 }) })));
await writeFile(path("src/app/favicon.ico"), buildIco(ico));
await writeFile(path("src/app/apple-icon.png"), await square(180, { padding: 0.14, background: WHITE }));
await writeFile(path("public/icons/icon-192.png"), await square(192, { padding: 0.1 }));
await writeFile(path("public/icons/icon-512.png"), await square(512, { padding: 0.12, background: WHITE }));
await writeFile(path("public/icons/icon-maskable-512.png"), await square(512, { padding: 0.22, background: WHITE }));

const meta = async (p) => {
  const m = await sharp(path(p)).metadata();
  return `${p} (${m.width}x${m.height})`;
};
console.log(`Achtergrond gedetecteerd als rgb(${BG.join(", ")}); schild t/m kolom ${shieldEnd - 1}.`);
for (const p of [
  "src/assets/brand/kozbica-it-logo.png",
  "src/assets/brand/kozbica-it-logo-wit.png",
  "src/assets/brand/kozbica-it-schild.png",
  "src/app/icon.png",
  "src/app/apple-icon.png",
  "public/icons/icon-512.png",
]) {
  console.log("✓", await meta(p));
}
console.log("✓ src/app/favicon.ico (16/32/48)");
