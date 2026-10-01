import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-30");
  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];
}
