import { z } from "zod";
import type { FormCopy } from "./content/types";
import { SERVICE_KEYS } from "./data/services";

export const MISSION_KEYS = [...SERVICE_KEYS, "autre"] as const;
export type MissionKey = (typeof MISSION_KEYS)[number];

export const LANGUAGE_KEYS = ["fr-es", "es-fr", "both", "other"] as const;
export type LanguageKey = (typeof LANGUAGE_KEYS)[number];

export const SITE_LOCALES = ["fr", "es"] as const;

/** Same rules in both languages; only the messages change. */
export function makeContactSchema(errors: FormCopy["errors"]) {
  return z.object({
    name: z.string().trim().min(2, errors.nameMissing).max(120, errors.nameTooLong),
    email: z.string().trim().min(1, errors.emailMissing).email(errors.emailInvalid).max(200, errors.emailTooLong),
    mission: z.enum(MISSION_KEYS, { errorMap: () => ({ message: errors.mission }) }),
    languages: z.enum(LANGUAGE_KEYS, { errorMap: () => ({ message: errors.languages }) }),
    comment: z.string().trim().min(1, errors.comment).max(3000, errors.commentTooLong),
    website: z.string().max(0).optional(),
    /** Language of the page the request was sent from, so the reply can be written in it. */
    locale: z.enum(SITE_LOCALES),
  });
}

export type ContactInput = z.infer<ReturnType<typeof makeContactSchema>>;
