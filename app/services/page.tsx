import heroImage from "@/assets/images/services-hero.webp";
import { ServiceDetail } from "@/components/sections/services/ServiceDetail";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SERVICES } from "@/lib/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Interprétariat et traduction juridique",
  description:
    "Interprétariat juridique, communautaire et médico-social, interprétation simultanée, chuchotée ou consécutive et traduction de documents officiels français-espagnol.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        className="lg:pt-12"
        align="start"
        title="Des services, pensés pour chaque situation"
        body={
          <p className="text-body">
            Chaque situation a ses propres enjeux. Voici les prestations proposées, adaptées à votre contexte&nbsp;:
            juridique, médical, social ou professionnel.
          </p>
        }
        cta={{ label: "Recevoir mon devis", href: "/contact" }}
        image={heroImage}
        imageAlt="Interprète professionnelle tenant un dossier dans une salle de réunion"
        imageClassName="object-[70%_50%] lg:object-[82%_50%]"
      />
      {SERVICES.map((service) => (
        <ServiceDetail key={service.slug} service={service} />
      ))}
    </>
  );
}
