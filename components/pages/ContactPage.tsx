import { ContactSection } from "@/components/sections/shared/ContactSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

export function ContactPage({ locale }: { locale: Locale }) {
  return (
    <>
      <ContactSection variant="page" locale={locale} />
      <FaqSection locale={locale} />
      <JsonLd data={faqSchema(locale)} />
      <JsonLd data={breadcrumbSchema(locale, "contact")} />
    </>
  );
}
