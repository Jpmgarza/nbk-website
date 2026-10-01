import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function NotFound() {
  return (
    <section className="pb-24 pt-8 lg:pb-46 lg:pt-12">
      <div className="container-page">
        <SectionTitle as="h1">Page introuvable</SectionTitle>
        <p className="mt-8 max-w-[519px] text-body-loose">
          Cette page n’existe pas ou a été déplacée. Vous pouvez revenir à l’accueil ou nous écrire directement.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/">Retour à l’accueil</ButtonLink>
          <ButtonLink href="/contact" variant="ink">
            Nous contacter
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
