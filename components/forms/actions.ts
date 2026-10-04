"use server";

import nodemailer from "nodemailer";
import { makeContactSchema, SITE_LOCALES } from "@/lib/contact-schema";
import { SITE } from "@/lib/constants";
import { getContent } from "@/lib/content";

export type ContactResult = { ok: true } | { ok: false; message: string };

// The e-mail to Noelia is always in French; only the visitor-facing messages follow the page language.
const fr = getContent("fr");
const PAGE_LANGUAGE = { fr: "Français", es: "Espagnol" } as const;

function visitorCopy(locale: unknown) {
  return getContent(SITE_LOCALES.find((value) => value === locale) ?? "fr").form;
}

function fallbackMessage(locale: unknown) {
  return visitorCopy(locale).fallback.replace("{email}", SITE.email).replace("{phone}", SITE.phone.display);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEmail(rows: [string, string][], comment: string) {
  const details = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 16px 10px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 0;font-size:16px;color:#111827">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html lang="fr"><body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;line-height:1.5">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:32px">
<h1 style="margin:0 0 4px;font-size:22px;color:#111827">Nouvelle demande de devis</h1>
<p style="margin:0 0 24px;font-size:14px;color:#6b7280">Reçue depuis le formulaire de contact du site</p>
<table style="border-collapse:collapse;width:100%;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb">${details}</table>
<h2 style="margin:24px 0 8px;font-size:16px;color:#111827">Commentaire</h2>
<p style="margin:0;font-size:16px;color:#111827;white-space:pre-wrap">${escapeHtml(comment)}</p>
<p style="margin:24px 0 0;font-size:13px;color:#6b7280">Répondez directement à ce message pour écrire à la personne.</p>
</div></body></html>`;
}

export async function sendContactRequest(input: unknown): Promise<ContactResult> {
  const locale = (input as { locale?: unknown } | null)?.locale;
  const parsed = makeContactSchema(fr.form.errors).safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: visitorCopy(locale).invalid };
  }

  const { website, ...data } = parsed.data;
  if (website) {
    return { ok: true };
  }

  const rows: [string, string][] = [
    ["Nom et prénom", data.name],
    ["E-mail", data.email],
    ["Type de mission", fr.form.missions[data.mission]],
    ["Langues concernées", fr.form.languages[data.languages]],
    ["Langue du site", PAGE_LANGUAGE[data.locale]],
  ];

  const text = ["Nouvelle demande de devis", "", ...rows.map(([label, value]) => `${label} : ${value}`), "", "Commentaire :", data.comment].join(
    "\n",
  );
  const html = renderEmail(rows, data.comment);

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.info(`[contact] SMTP non configuré. Demande reçue :\n${text}`);
    // In production an unconfigured mailer must not pretend the request was delivered.
    if (process.env.NODE_ENV === "production") {
      return { ok: false, message: fallbackMessage(data.locale) };
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
      subject: `Nouvelle demande de devis : ${fr.form.missions[data.mission]}${data.locale === "es" ? " (site en espagnol)" : ""}`,
      text,
      html,
    });

    return { ok: true };
  } catch (error) {
    console.error("[contact] Échec de l’envoi", error);
    return { ok: false, message: fallbackMessage(data.locale) };
  }
}
