// Language-neutral contact details. Copy and navigation live in lib/content/<locale>.ts.
export const SITE = {
  name: "NBK Interprétation & Traduction Juridique",
  shortName: "NBK",
  owner: "Noelia Krähenbühl",
  // Fixed on purpose: canonical URLs, the sitemap and structured data must point to the
  // public domain even when the site is served from a preview URL.
  url: "https://nbk-interp.ch",
  email: "info@nbk-interp.ch",
  // Noelia's own address, used as the contact address required by the Swiss unfair-competition
  // act (LCD art. 3 al. 1 let. s) — not an office, so it is not used as a visiting/service address.
  address: "Rue du Pont-Neuf 21, 1341 L'Orient",
  addressSchema: {
    streetAddress: "Rue du Pont-Neuf 21",
    postalCode: "1341",
    addressLocality: "L'Orient",
    addressCountry: "CH",
  },
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
