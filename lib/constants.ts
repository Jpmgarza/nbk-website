// Language-neutral contact details. Copy and navigation live in lib/content/<locale>.ts.
export const SITE = {
  name: "NBK Interprétation & Traduction Juridique",
  shortName: "NBK",
  owner: "Noelia Krähenbühl",
  // Fixed on purpose: canonical URLs, the sitemap and structured data must point to the
  // public domain even when the site is served from a preview URL.
  url: "https://nbk-interp.ch",
  email: "info@nbk-interp.ch",
  phone: {
    display: "078 942 12 67",
    href: "tel:+41789421267",
    e164: "+41789421267",
  },
  linkedin: "https://www.linkedin.com/in/noelia-kr%C3%A4henb%C3%BChl/",
  studio: {
    name: "Studio PWI",
    url: "https://www.studiopwi.com",
  },
} as const;
