/**
 * Cloudflare Worker voor kozbica-it.
 *
 * Dankzij `assets.run_worker_first: ["/api/*"]` in wrangler.jsonc wordt deze
 * Worker alleen aangeroepen voor /api/*. Alle pagina's en bestanden worden
 * rechtstreeks door Workers Static Assets geserveerd (met de headers uit
 * public/_headers).
 */
import { handleContact } from "./contact";
import type { Env } from "./env";
import { apiError } from "./http";

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (pathname.startsWith("/api/")) {
      return apiError(404, "not_found", "Niet gevonden.");
    }

    // Vangnet: alles buiten /api/* gaat naar de statische assets
    // (inclusief de 404-pagina via not_found_handling).
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
