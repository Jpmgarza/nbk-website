import { z } from "zod";
import { SERVICE_NAMES } from "./data/service-names";

export const MISSION_OPTIONS = [...SERVICE_NAMES, "Autre"] as const;

export const LANGUAGE_OPTIONS = [
  "Français → espagnol",
  "Espagnol → français",
  "Dans les deux sens",
  "Autre (à préciser dans le commentaire)",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom et prénom.")
    .max(120, "Ce nom est trop long."),
  email: z
    .string()
    .trim()
    .min(1, "Indiquez votre adresse e-mail.")
    .email("Cette adresse e-mail n’est pas valide.")
    .max(200, "Cette adresse e-mail est trop longue."),
  mission: z.enum(MISSION_OPTIONS, {
    errorMap: () => ({ message: "Choisissez le type de mission." }),
  }),
  languages: z.enum(LANGUAGE_OPTIONS, {
    errorMap: () => ({ message: "Choisissez les langues concernées." }),
  }),
  comment: z
    .string()
    .trim()
    .min(1, "Décrivez brièvement votre besoin.")
    .max(3000, "Votre message est trop long (3000 caractères au plus)."),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
