/**
 * Genereert favicons en app-iconen uit src/app/icon.svg.
 *
 *   npm run icons
 *
 * Uitvoer:
 *   src/app/favicon.ico          (16, 32 en 48 px, voor oudere browsers)
 *   src/app/apple-icon.png       (180 px, iOS-startscherm)
 *   public/icons/icon-192.png    (webmanifest)
 *   public/icons/icon-512.png    (webmanifest, ook gebruikt als logo in Schema.org)
 *   public/icons/icon-maskable-512.png (webmanifest, Android adaptive icon)
 *
 * Na het plaatsen van het officiële logo: vervang src/app/icon.svg door het
 * officiële schildsymbool (vierkant of staand formaat) en voer dit script opnieuw uit.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const svg = await readFile(new URL("src/app/icon.svg", root));
const NAVY = { r: 16, g: 35, b: 52, alpha: 1 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

/** Rendert het symbool gecentreerd op een vierkant canvas. */
async function renderSquare(size, { padding = 0.12, background = { r: 0, g: 0, b: 0, alpha: 0 } } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(svg, { density: 1200 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Bouwt een .ico-bestand met PNG-afbeeldingen (ondersteund door alle moderne browsers). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await mkdir(new URL("public/icons/", root), { recursive: true });

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, data: await renderSquare(size, { padding: 0.02 }) })),
);
await writeFile(new URL("src/app/favicon.ico", root), buildIco(icoImages));

await writeFile(new URL("src/app/apple-icon.png", root), await renderSquare(180, { padding: 0.14, background: WHITE }));
await writeFile(new URL("public/icons/icon-192.png", root), await renderSquare(192, { padding: 0.1 }));
await writeFile(new URL("public/icons/icon-512.png", root), await renderSquare(512, { padding: 0.1, background: WHITE }));
await writeFile(new URL("public/icons/icon-maskable-512.png", root), await renderSquare(512, { padding: 0.22, background: NAVY }));

console.log("Iconen gegenereerd: favicon.ico, apple-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png");
