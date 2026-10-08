import type { LanguageKey, MissionKey } from "@/lib/contact-schema";
import type { ServiceKey } from "@/lib/data/services";
import type { PageKey } from "@/lib/i18n";

export type NavItem = { label: string; href: string };
export type FaqItem = { question: string; answer: string };
export type PageMeta = { title: string; description: string };

export type ServiceText = {
  key: ServiceKey;
  /** Anchor id on the services page. */
  slug: string;
  title: string;
  summary: string;
  audience: { label: string; text: string };
  benefit: { label: string; paragraphs: string[] };
  cta: string;
};

export type FormCopy = {
  ariaLabel: string;
  labels: { name: string; email: string; mission: string; languages: string; comment: string; honeypot: string };
  placeholder: string;
  missions: Record<MissionKey, string>;
  languages: Record<LanguageKey, string>;
  errors: {
    nameMissing: string;
    nameTooLong: string;
    emailMissing: string;
    emailInvalid: string;
    emailTooLong: string;
    mission: string;
    languages: string;
    comment: string;
    commentTooLong: string;
  };
  submit: string;
  sending: string;
  sentTitle: string;
  sentText: string;
  invalid: string;
  /** `{email}` and `{phone}` are replaced by the contact details (kept a string: this copy reaches a client component). */
  fallback: string;
};

export type Content = {
  /** Site name shown in titles ("%s | …"). */
  titleSuffix: string;
  /** The home title is used as is; the others get " | titleSuffix". */
  meta: Record<PageKey | "notFound", PageMeta>;
  /** Section ids on the home page. */
  anchors: { expertise: string; problems: string; solutions: string; process: string; faq: string };
  header: {
    homeLabel: string;
    mainNavLabel: string;
    mobileNavLabel: string;
    openMenu: string;
    closeMenu: string;
    allServices: string;
    servicesLabel: string;
    cta: string;
    /** Link to the other language, written in that language. */
    switchLabel: string;
  };
  nav: {
    main: NavItem[];
    mobileFooter: NavItem[];
    footerGroups: { title: string; links: NavItem[] }[];
    legal: NavItem[];
  };
  footer: {
    title: string;
    cta: string;
    navLabel: string;
    sitemapLabel: string;
    navigation: string;
    contact: string;
    reachUs: string;
    legal: string;
    madeBy: string;
    madeByShort: string;
    rights: string;
  };
  hero: { title: string; lead: string; join: string; tail: string; cta: string; imageAlt: string };
  servicesHero: { title: string; body: string; cta: string; imageAlt: string };
  expertise: { title: string; intro: string; proofs: { title: string; text: string[] }[]; cta: string };
  problems: {
    title: string;
    summary: string;
    riskTitle: string;
    riskText: string;
    items: { title: string; text: string }[];
    cta: string;
  };
  solutions: { title: string; carouselLabel: string; show: string; ctaMobile: string; ctaDesktop: string };
  process: { title: string; subtitle: string; steps: { title: string; text: string }[]; cta: string };
  faq: { title: string; items: FaqItem[]; cta: string };
  contact: {
    homeTitle: string;
    pageTitle: string;
    pageIntro: string;
    detailsTitle: string;
    labels: { email: string; phone: string; availability: string; area: string };
    availability: string;
    area: string;
    mapAlt: string;
    submitMobile: string;
  };
  services: ServiceText[];
  form: FormCopy;
  legalPage: { updated: string; date: string };
  notFound: { title: string; text: string; home: string; contact: string };
};
