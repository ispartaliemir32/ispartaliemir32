import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Bouwt complete metadata per pagina. Next.js voegt geneste objecten zoals
 * `openGraph` niet samen met die uit de layout, dus we zetten ze hier volledig.
 * De Open Graph-afbeelding komt uit app/opengraph-image.tsx (bestandsconventie).
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  /** Gebruik de titel zonder "| Kozbica IT"-suffix (homepage). */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
