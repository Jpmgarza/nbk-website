"use server";

import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact-schema";
import { SITE } from "@/lib/constants";

export type ContactResult = { ok: true } | { ok: false; message: string };

const FALLBACK_MESSAGE = `L’envoi n’a pas abouti. Vous pouvez réessayer, écrire à ${SITE.email} ou appeler le ${SITE.phone.display}.`;

export async function sendContactRequest(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Certains champs sont incomplets. Vérifiez le formulaire." };
  }

  const { website, ...data } = parsed.data;
  if (website) {
    return { ok: true };
  }

  const text = [
    `Nom et prénom : ${data.name}`,
    `E-mail : ${data.email}`,
    `Type de mission : ${data.mission}`,
    `Langues concernées : ${data.languages}`,
    "",
    "Commentaire :",
    data.comment,
  ].join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.info(`[contact] SMTP non configuré. Demande reçue :\n${text}`);
    // In production an unconfigured mailer must not pretend the request was delivered.
    if (process.env.NODE_ENV === "production") {
      return { ok: false, message: FALLBACK_MESSAGE };
    }
    return { ok: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_FROM ?? SMTP_USER,
      to: SMTP_TO ?? SITE.email,
      replyTo: { name: data.name, address: data.email },
      subject: `Demande de devis : ${data.mission}`,
      text,
    });

    return { ok: true };
  } catch (error) {
    console.error("[contact] Échec de l’envoi", error);
    return { ok: false, message: FALLBACK_MESSAGE };
  }
}
