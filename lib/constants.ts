export const SITE = {
  name: "NBK Interprétation & Traduction Juridique",
  shortName: "NBK",
  owner: "Noelia Krähenbühl",
  // Fixed on purpose: canonical URLs, the sitemap and structured data must point to the
  // public domain even when the site is served from a preview URL.
  url: "https://www.nbk-interp.ch",
  email: "info@nbk-interp.ch",
  phone: {
    display: "078 942 12 67",
    href: "tel:+41789421267",
    e164: "+41789421267",
  },
  linkedin: "https://www.linkedin.com/in/noelia-kr%C3%A4henb%C3%BChl/",
  availability: "Sur rendez-vous",
  serviceArea: "Canton de Vaud, déplacements possibles en Suisse romande",
  locale: "fr_CH",
  studio: {
    name: "Studio PWI",
    url: "https://www.studiopwi.com",
  },
} as const;

export type NavItem = { label: string; href: string };

export const MAIN_NAV: NavItem[] = [
  { label: "Expertise", href: "/#expertise" },
  { label: "Problèmes", href: "/#problemes" },
  { label: "Services", href: "/services" },
  { label: "Démarche", href: "/#demarche" },
  { label: "Questions fréquentes", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: "Découvrir",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Expertise", href: "/#expertise" },
      { label: "Problèmes", href: "/#problemes" },
    ],
  },
  {
    title: "Prestations",
    links: [
      { label: "Services", href: "/services" },
      { label: "Questions fréquentes", href: "/#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const MOBILE_FOOTER_NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Problèmes", href: "/#problemes" },
  { label: "Services", href: "/services" },
  { label: "Questions fréquentes", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Protection des données", href: "/protection-des-donnees" },
];
