import heroImage from "@/assets/images/noelia-services.webp";
import { ServiceDetail } from "@/components/sections/services/ServiceDetail";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent, getServices } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, servicesSchema } from "@/lib/structured-data";

export function ServicesPage({ locale }: { locale: Locale }) {
  const { servicesHero } = getContent(locale);
  return (
    <>
      <PageHero
        className="lg:pt-12"
        align="start"
        titleSize="compact"
        title={servicesHero.title}
        body={<p className="text-body">{servicesHero.body}</p>}
        cta={{ label: servicesHero.cta, href: PAGES.contact[locale] }}
        image={heroImage}
        imageAlt={servicesHero.imageAlt}
        imageClassName="object-[50%_0%]"
      />
      {getServices(locale).map((service) => (
        <ServiceDetail key={service.slug} service={service} locale={locale} />
      ))}
      <JsonLd data={servicesSchema(locale)} />
      <JsonLd data={breadcrumbSchema(locale, "services")} />
    </>
  );
}
