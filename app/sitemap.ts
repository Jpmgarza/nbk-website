import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { HTML_LANG, LOCALES, PAGES, type PageKey } from "@/lib/i18n";

const INDEXED: { page: PageKey; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { page: "home", changeFrequency: "monthly", priority: 1 },
  { page: "services", changeFrequency: "monthly", priority: 0.9 },
  { page: "contact", changeFrequency: "yearly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-02");
  const url = (path: string) => `${SITE.url}${path}`;

  return INDEXED.flatMap(({ page, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: url(PAGES[page][locale]),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((other) => [HTML_LANG[other], url(PAGES[page][other])])),
      },
    })),
  );
}
