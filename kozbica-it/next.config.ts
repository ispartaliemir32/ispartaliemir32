import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";

/**
 * Next.js-configuratie voor Kozbica IT.
 *
 * - Productie: volledig statische export (`out/`), geserveerd door
 *   Cloudflare Workers Static Assets. Het contactformulier wordt afgehandeld
 *   door de Worker in `worker/` (route `/api/contact`).
 * - Ontwikkeling: `next dev` stuurt `/api/*` door naar `wrangler dev`
 *   (standaard http://127.0.0.1:8787), zodat het formulier lokaal werkt.
 */

const TURNSTILE_TEST_KEY_PATTERN = /^[123]x0{20}[A-F]{2}$/;

function assertProductionEnv(): void {
  const problems: string[] = [];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteUrl) {
    problems.push("NEXT_PUBLIC_SITE_URL ontbreekt (bijvoorbeeld https://www.uwdomein.nl).");
  } else {
    try {
      const url = new URL(siteUrl);
      const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
      if (url.protocol !== "https:" && !isLocal) {
        problems.push("NEXT_PUBLIC_SITE_URL moet met https:// beginnen.");
      }
    } catch {
      problems.push(`NEXT_PUBLIC_SITE_URL is geen geldige URL: "${siteUrl}".`);
    }
  }

  if (!siteKey) {
    problems.push("NEXT_PUBLIC_TURNSTILE_SITE_KEY ontbreekt (Cloudflare Turnstile site key).");
  }

  if (problems.length > 0) {
    throw new Error(
      `\n\nBuild gestopt: ontbrekende of ongeldige configuratie.\n  - ${problems.join("\n  - ")}\n` +
        "Zie .env.example en README.md (section 5, Configuration).\n",
    );
  }

  // next.config wordt tijdens één build meerdere keren geëvalueerd; waarschuw één keer.
  if (siteKey && TURNSTILE_TEST_KEY_PATTERN.test(siteKey) && !process.env.__KOZBICA_TEST_KEY_WARNED) {
    process.env.__KOZBICA_TEST_KEY_WARNED = "1";
    console.warn(
      "\n⚠  NEXT_PUBLIC_TURNSTILE_SITE_KEY is een Turnstile TEST-sleutel. " +
        "Prima voor een lokale preview, maar gebruik in productie uw echte site key.\n",
    );
  }
}

export default function nextConfig(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    assertProductionEnv();
  }

  const shared: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    trailingSlash: false,
    images: {
      // Statische export: geen on-demand beeldoptimalisatie. Afbeeldingen zijn
      // vooraf geoptimaliseerd (SVG/PNG) en worden direct als asset geserveerd.
      unoptimized: true,
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    const workerUrl = process.env.WORKER_DEV_URL ?? "http://127.0.0.1:8787";
    return {
      ...shared,
      async rewrites() {
        return [{ source: "/api/:path*", destination: `${workerUrl}/api/:path*` }];
      },
    };
  }

  return { ...shared, output: "export" };
}
