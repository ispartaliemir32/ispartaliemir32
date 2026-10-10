import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/config/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/diensten", priority: 0.9, changeFrequency: "monthly" },
  { path: "/it-beheer", priority: 0.9, changeFrequency: "monthly" },
  { path: "/over-ons", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacyverklaring", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // De algemene voorwaarden pas opnemen als ze definitief zijn (zolang concept: noindex).
  if (!site.legal.termsIsDraft) {
    entries.push({ url: absoluteUrl("/algemene-voorwaarden"), lastModified, changeFrequency: "yearly", priority: 0.3 });
  }

  return entries;
}
