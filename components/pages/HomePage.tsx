import { Expertise } from "@/components/sections/home/Expertise";
import { Problems } from "@/components/sections/home/Problems";
import { Process } from "@/components/sections/home/Process";
import { Solutions } from "@/components/sections/home/Solutions";
import { ContactSection } from "@/components/sections/shared/ContactSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";
import { faqSchema } from "@/lib/structured-data";

export function HomePage({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);
  return (
    <>
      <PageHero
        className="lg:pt-20"
        title={hero.title}
        body={
          <p className="text-body lg:font-semibold">
            {hero.lead}{" "}
            <span aria-hidden="true" className="text-accent">
              ⇄
            </span>
            <span className="sr-only">{hero.join}</span> {hero.tail}
          </p>
        }
        cta={{ label: hero.cta, href: PAGES.contact[locale] }}
      />
      <Expertise locale={locale} />
      <Problems locale={locale} />
      <Solutions locale={locale} />
      <Process locale={locale} />
      <FaqSection locale={locale} />
      <ContactSection variant="home" locale={locale} />
      <JsonLd data={faqSchema(locale)} />
    </>
  );
}
