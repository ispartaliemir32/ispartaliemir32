// `wrangler dev` vereist dat de asset-map bestaat. Tijdens `npm run dev`
// (Next.js dev-server + Worker) is er nog geen build, dus maken we een lege map aan.
import { mkdirSync } from "node:fs";

mkdirSync(new URL("../out", import.meta.url), { recursive: true });
