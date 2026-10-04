import { getContent } from "./content";
import { SITE } from "./constants";
import { HTML_LANG, PAGES, type Locale } from "./i18n";

const BUSINESS_ID = `${SITE.url}/#business`;

export function businessSchema(locale: Locale) {
  const content = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: SITE.name,
    description: content.meta.home.description,
    url: `${SITE.url}${PAGES.home[locale]}`,
    image: `${SITE.url}/og-share.jpg`,
    telephone: SITE.phone.e164,
    email: SITE.email,
    areaServed: [
      { "@type": "City", name: "Lausanne" },
      { "@type": "AdministrativeArea", name: "Canton de Vaud" },
      { "@type": "Place", name: "Suisse romande" },
    ],
    knowsLanguage: ["fr", "es"],
    founder: {
      "@type": "Person",
      name: SITE.owner,
      jobTitle:
        locale === "es"
          ? "Intérprete y traductora jurídica de español y francés"
          : "Interprète et traductrice juridique français-espagnol",
      knowsLanguage: ["es", "fr"],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Asunción" },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Diplôme d’avocate (Abogada)",
          credentialCategory: "degree",
          recognizedBy: { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Asunción" },
          dateCreated: "2011",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Diplôme SEC Suisse de secrétaire juridique",
          credentialCategory: "diploma",
          recognizedBy: { "@type": "Organization", name: "Société des employés de commerce de Lausanne" },
          dateCreated: "2019",
        },
      ],
      sameAs: [SITE.linkedin],
    },
    sameAs: [SITE.linkedin],
  };
}

export function faqSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: HTML_LANG[locale],
    mainEntity: getContent(locale).faq.items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function servicesSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: getContent(locale).services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: `${SITE.url}${PAGES.services[locale]}#${service.slug}`,
        provider: { "@id": BUSINESS_ID },
        areaServed: "Canton de Vaud",
        inLanguage: HTML_LANG[locale],
      },
    })),
  };
}
