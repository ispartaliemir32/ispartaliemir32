import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/diensten/", priority: 0.9 },
  { path: "/tarieven/", priority: 0.8 },
  { path: "/over-ons/", priority: 0.7 },
  { path: "/contact/", priority: 0.8 },
  { path: "/privacy/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({ url: absoluteUrl(route.path), lastModified, priority: route.priority }));
}
