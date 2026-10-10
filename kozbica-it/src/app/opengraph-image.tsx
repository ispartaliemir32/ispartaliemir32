import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Wordt tijdens de build eenmalig als PNG gegenereerd (statische export).
export const dynamic = "force-static";
export const alt = "Kozbica IT: professionele IT voor het MKB in Rotterdam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function font(weight: 600 | 800) {
  return readFile(join(process.cwd(), `node_modules/@fontsource/manrope/files/manrope-latin-${weight}-normal.woff`));
}

export default async function OpengraphImage() {
  const [semibold, extrabold] = await Promise.all([font(600), font(800)]);

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
          background: "linear-gradient(135deg, #102334 0%, #0a1724 60%, #0c535a 130%)",
          color: "#ffffff",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="66" height="77" viewBox="0 0 48 56" fill="none">
            <path d="M24 2.75 43.25 9.4v16.1c0 12.9-8.1 22.7-19.25 27.5C12.85 48.2 4.75 38.4 4.75 25.5V9.4L24 2.75Z" fill="#163049" stroke="#079FA5" strokeWidth="2" />
            <rect x="14.6" y="16" width="4.8" height="24" rx="2.4" fill="#FFFFFF" />
            <path d="M21 27.6 31.2 17.4" stroke="#079FA5" strokeWidth="4.4" strokeLinecap="round" />
            <path d="M22.6 29.4 31.2 38.6" stroke="#2FB5BA" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="32.4" cy="16.2" r="3.1" fill="#FFFFFF" />
            <circle cx="32.4" cy="39.8" r="3.1" fill="#FFFFFF" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
            Kozbica<span style={{ color: "#2FB5BA", marginLeft: 12 }}>IT</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3 }}>Professionele IT.</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3, color: "#2FB5BA" }}>
            Zonder zorgen.
          </div>
          <div style={{ marginTop: 30, fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.78)" }}>
            IT-beheer · Microsoft 365 · Cloud · Cybersecurity
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>
          IT-partner voor het MKB · Rotterdam en heel Nederland
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
