import type { NextConfig } from "next";

/**
 * Volledig statische export (map `out/`): geen server nodig. De bestanden
 * kunnen bij elke webhost (STRATO, Cloudflare, Netlify, ...) worden neergezet.
 *
 * trailingSlash: elke pagina wordt `map/index.html`, zodat de URL's
 * (/diensten/) op elke host werken zonder extra serverinstellingen.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
