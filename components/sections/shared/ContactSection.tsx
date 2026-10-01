import Image from "next/image";
import map from "@/assets/images/carte-suisse.webp";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/constants";
import { revealIndex } from "@/lib/motion";

type Props = {
  variant: "home" | "page";
};

const MAP_ALT = "Carte de la Suisse, canton de Vaud et Suisse romande mis en évidence";

export function ContactSection({ variant }: Props) {
  const isPage = variant === "page";

  const details = [
    {
      label: "E-mail",
      value: (
        <a href={`mailto:${SITE.email}`} className="text-accent hover:underline lg:text-ink">
          {SITE.email}
        </a>
      ),
    },
    {
      label: "Téléphone",
      value: (
        <a href={SITE.phone.href} className="text-accent hover:underline lg:text-ink">
          {SITE.phone.display}
        </a>
      ),
    },
    { label: "Disponibilité", value: SITE.availability },
    { label: "Zone de service", value: SITE.serviceArea },
  ];

  return (
    <section
      id={isPage ? undefined : "demande"}
      aria-labelledby="contact-title"
      className={isPage ? "pb-12 lg:pb-18 lg:pt-12" : "section"}
    >
      <div className="container-page lg:grid lg:grid-cols-2 lg:gap-x-6">
        <div className="relative z-10 flex flex-col gap-8 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:max-w-[845px]">
          <SectionTitle id="contact-title" as={isPage ? "h1" : "h2"} reveal={isPage ? "load" : "scroll"}>
            {isPage ? "Parlons de votre situation" : "Sécurisez votre prochain rendez-vous ou audition dès aujourd’hui."}
          </SectionTitle>
          {isPage && (
            <p className="motion-load-up text-body [--load-delay:650ms] lg:max-w-[519px]">
              Décrivez votre besoin, une réponse personnalisée vous sera apportée dans les meilleurs délais.
            </p>
          )}
        </div>

        <div
          id="formulaire"
          data-reveal={isPage ? undefined : "self"}
          className={cn(
            "mt-8 scroll-mt-28 lg:col-start-1 lg:row-start-2 lg:mt-18 lg:max-w-[628px]",
            isPage ? "motion-load-up [--load-delay:800ms]" : "[--reveal-delay:150ms]",
          )}
        >
          <ContactForm />
        </div>

        <div
          data-reveal={isPage ? undefined : "clip"}
          className={cn(
            "relative hidden aspect-[628/518] overflow-hidden lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mb-[85px] lg:block lg:self-end",
            isPage && "motion-load-clip [--load-delay:400ms]",
          )}
        >
          <Image src={map} alt={MAP_ALT} fill sizes="(min-width: 1440px) 628px, 45vw" className="object-cover" />
        </div>
      </div>

      <div className={cn("container-page", !isPage && "hidden lg:block")}>
        <hr className="mt-18 hidden border-ink/10 lg:block lg:max-w-[1200px]" />
        <div className={cn("mt-36 lg:mt-18", isPage ? "lg:sr-only" : "sr-only")}>
          <SectionTitle>Coordonnées</SectionTitle>
        </div>
        <dl data-reveal="children" className="mt-8 grid gap-4 lg:mt-18 lg:grid-cols-4 lg:items-end lg:gap-6">
          {details.map((item, index) => (
            <div key={item.label} style={revealIndex(index)} className="flex flex-col gap-2 py-2 lg:gap-1 lg:py-0">
              <dt className="font-display text-h4 font-medium lg:font-normal">{item.label}</dt>
              <dd className="text-body">{item.value}</dd>
            </div>
          ))}
        </dl>

        {isPage && (
          <div className="lg:hidden">
            <div data-reveal="clip" className="relative mt-8 aspect-[328/182] overflow-hidden">
              <Image src={map} alt={MAP_ALT} fill sizes="100vw" className="object-cover" />
            </div>
            <div data-reveal="self" className="mt-8">
              <ButtonLink href="#formulaire">Envoyer ma demande</ButtonLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
