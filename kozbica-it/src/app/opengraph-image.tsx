import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Wordt tijdens de build eenmalig als PNG gegenereerd (statische export).
export const dynamic = "force-static";
export const alt = "Kozbica IT: veilige IT, zonder gedoe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function font(weight: 600 | 800) {
  return readFile(join(process.cwd(), `node_modules/@fontsource/manrope/files/manrope-latin-${weight}-normal.woff`));
}

// Officieel logo, variant voor donkere achtergronden (600 x 160 px).
async function logoDataUrl() {
  const file = await readFile(join(process.cwd(), "src/assets/brand/kozbica-it-logo-wit.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  const [semibold, extrabold, logo] = await Promise.all([font(600), font(800), logoDataUrl()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #122636 0%, #0a1724 60%, #0c535a 130%)",
          color: "#ffffff",
          fontFamily: "Manrope",
        }}
      >
        <img src={logo} width={330} height={88} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3 }}>Veilige IT,</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3, color: "#099EA9" }}>
            zonder gedoe.
          </div>
          <div style={{ marginTop: 30, fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.78)" }}>
            IT-ondersteuning · Applicatiebeheer · IT-advies
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>
          Persoonlijke IT voor kleine bedrijven · Rotterdam en omgeving
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: semibold, weight: 600, style: "normal" },
        { name: "Manrope", data: extrabold, weight: 800, style: "normal" },
      ],
    },
  );
}
