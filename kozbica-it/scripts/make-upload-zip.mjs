/**
 * Maakt `kozbica-it-upload.zip`: de inhoud van ./out, klaar om bij een webhost
 * (bijv. STRATO) in de hoofdmap te zetten. Eerst `npm run build` draaien.
 *   npm run zip
 */
import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../out", import.meta.url));
const zip = fileURLToPath(new URL("../kozbica-it-upload.zip", import.meta.url));
if (!existsSync(out)) {
  console.error("Map ./out ontbreekt. Draai eerst: npm run build");
  process.exit(1);
}
rmSync(zip, { force: true });
// 'zip' (Linux/macOS) of 'tar -a' (Windows 10+/macOS) maakt een zipbestand van de inhoud van out/.
let r = spawnSync("zip", ["-r", "-q", "-X", zip, "."], { cwd: out });
if (r.error || r.status !== 0) r = spawnSync("tar", ["-a", "-c", "-f", zip, "-C", out, "."]);
if (r.error || r.status !== 0) {
  console.error("Zip maken mislukt. Zip de inhoud van de map 'out' handmatig.");
  process.exit(1);
}
console.log("✓ kozbica-it-upload.zip gemaakt. Pak uit en zet de inhoud in de hoofdmap van je webruimte.");
