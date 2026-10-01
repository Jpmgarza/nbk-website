import portrait from "@/assets/images/noelia-portrait.webp";
import { Expertise } from "@/components/sections/home/Expertise";
import { Problems } from "@/components/sections/home/Problems";
import { Process } from "@/components/sections/home/Process";
import { Solutions } from "@/components/sections/home/Solutions";
import { ContactSection } from "@/components/sections/shared/ContactSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { HOME_TITLE, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  absoluteTitle: true,
  description:
    "Noelia Krähenbühl, interprète certifiée français-espagnol : interprétariat juridique, communautaire et médico-social, traduction de documents officiels. Vaud.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <PageHero
        className="lg:pt-20"
        title="Votre voix, fidèlement interprétée"
        body={
          <p className="text-body lg:font-semibold">
            Interprétation et traduction juridique, communautaire et médico-sociale, français{" "}
            <span aria-hidden="true" className="text-accent">
              ⇄
            </span>
            <span className="sr-only">et</span> espagnol, par une interprète certifiée.
          </p>
        }
        cta={{ label: "Recevoir mon devis", href: "/contact" }}
        image={portrait}
        imageAlt="Portrait de Noelia Krähenbühl, interprète et traductrice"
        imageClassName="object-[58%_center]"
      />
      <Expertise />
      <Problems />
      <Solutions />
      <Process />
      <FaqSection />
      <ContactSection variant="home" />
    </>
  );
}
