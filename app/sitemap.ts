import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { guides } from "@/lib/guides";

export const dynamic = "force-static";

const LAST_UPDATE = new Date("2026-11-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/la-carte", 0.9],
    ["/smash-burgers", 0.9],
    ["/tacos", 0.9],
    ["/menu-etudiant", 0.8],
    ["/infos-pratiques", 0.8],
    ["/commander", 0.7],
    ["/halal", 0.7],
    ["/le-concept", 0.6],
    ["/faq", 0.6],
    ["/contact", 0.6],
    ["/guides", 0.5],
  ];
  return [
    ...pages.map(([path, priority]) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, lastModified: LAST_UPDATE, priority })),
    ...guides.map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(g.date), priority: 0.5 })),
  ];
}
