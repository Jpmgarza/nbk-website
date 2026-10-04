export const LOCALES = ["fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

/** `lang` attribute and hreflang code per locale. */
export const HTML_LANG: Record<Locale, string> = { fr: "fr-CH", es: "es" };
export const OG_LOCALE: Record<Locale, string> = { fr: "fr_CH", es: "es_ES" };

/** Every page exists in both languages; French keeps its historical paths, Spanish lives under /es. */
export const PAGES = {
  home: { fr: "/", es: "/es" },
  services: { fr: "/services", es: "/es/servicios" },
  contact: { fr: "/contact", es: "/es/contacto" },
  legal: { fr: "/mentions-legales", es: "/es/aviso-legal" },
  privacy: { fr: "/protection-des-donnees", es: "/es/proteccion-de-datos" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof PAGES;

export const localeFromPathname = (pathname: string): Locale =>
  pathname === "/es" || pathname.startsWith("/es/") ? "es" : "fr";

/** Same page in the other language; unknown paths fall back to that language's home page. */
export function alternatePath(pathname: string, target: Locale) {
  const page = Object.values(PAGES).find((paths) => Object.values(paths).includes(pathname as never));
  return page ? page[target] : PAGES.home[target];
}
