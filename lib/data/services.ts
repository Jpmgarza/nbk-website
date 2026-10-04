import type { StaticImageData } from "next/image";
import illustrationJuridique from "@/assets/images/illustration-juridique.webp";
import illustrationCommunautaire from "@/assets/images/illustration-communautaire.webp";
import illustrationSimultanee from "@/assets/images/illustration-simultanee.webp";
import illustrationChuchotee from "@/assets/images/illustration-chuchotee.webp";
import illustrationConsecutive from "@/assets/images/illustration-consecutive.webp";
import illustrationTraduction from "@/assets/images/illustration-traduction.webp";

/** Stable ids shared by both languages: form values, ?mission= links and the email sent to Noelia. */
export const SERVICE_KEYS = ["juridique", "communautaire", "simultanee", "chuchotee", "consecutive", "traduction"] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_ILLUSTRATIONS: Record<ServiceKey, StaticImageData> = {
  juridique: illustrationJuridique,
  communautaire: illustrationCommunautaire,
  simultanee: illustrationSimultanee,
  chuchotee: illustrationChuchotee,
  consecutive: illustrationConsecutive,
  traduction: illustrationTraduction,
};
