import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getContent } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const { notFound } = getContent(locale);
  return (
    <section className="pb-24 pt-8 lg:pb-46 lg:pt-12">
      <div className="container-page">
        <SectionTitle as="h1">{notFound.title}</SectionTitle>
        <p className="mt-8 max-w-[519px] text-body-loose">{notFound.text}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={PAGES.home[locale]}>{notFound.home}</ButtonLink>
          <ButtonLink href={PAGES.contact[locale]} variant="ink">
            {notFound.contact}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
