import type { Metadata } from "next";
import { getContent } from "./content";
import { SITE } from "./constants";
import { DEFAULT_LOCALE, HTML_LANG, LOCALES, OG_LOCALE, PAGES, type Locale, type PageKey } from "./i18n";

const SHARE_IMAGE = {
  url: "/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "NBK Interprétation & Traduction Juridique, Noelia Krähenbühl",
};

/** Shared by both root layouts. */
export function baseMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: content.meta.home.title, template: `%s | ${content.titleSuffix}` },
    applicationName: SITE.name,
    authors: [{ name: SITE.owner }],
    creator: SITE.studio.name,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

/** hreflang links: every page exists in both languages, French is the default. */
export function languageAlternates(page: PageKey) {
  return {
    ...Object.fromEntries(LOCALES.map((locale) => [HTML_LANG[locale], PAGES[page][locale]])),
    "x-default": PAGES[page][DEFAULT_LOCALE],
  };
}

type PageMetadataInput = { locale: Locale; page: PageKey; noindex?: boolean };

export function pageMetadata({ locale, page, noindex }: PageMetadataInput): Metadata {
  const content = getContent(locale);
  const { title, description } = content.meta[page];
  const isHome = page === "home";
  const fullTitle = isHome ? title : `${title} | ${content.titleSuffix}`;
  const path = PAGES[page][locale];

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: languageAlternates(page) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((other) => other !== locale).map((other) => OG_LOCALE[other]),
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
