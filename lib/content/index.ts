import { SERVICE_ILLUSTRATIONS } from "@/lib/data/services";
import type { Locale } from "@/lib/i18n";
import { es } from "./es";
import { fr } from "./fr";
import type { Content, ServiceText } from "./types";

const CONTENT: Record<Locale, Content> = { fr, es };

export function getContent(locale: Locale) {
  return CONTENT[locale];
}

export function getServices(locale: Locale) {
  return CONTENT[locale].services.map((service) => ({ ...service, illustration: SERVICE_ILLUSTRATIONS[service.key] }));
}

export type Service = ServiceText & { illustration: (typeof SERVICE_ILLUSTRATIONS)[keyof typeof SERVICE_ILLUSTRATIONS] };
export type { Content, FaqItem, FormCopy, NavItem } from "./types";
