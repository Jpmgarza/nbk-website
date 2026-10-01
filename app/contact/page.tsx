import { ContactSection } from "@/components/sections/shared/ContactSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact et demande de devis",
  description:
    "Décrivez votre besoin d’interprète ou de traduction français-espagnol et recevez une réponse personnalisée. Canton de Vaud et Suisse romande, sur rendez-vous.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactSection variant="page" />
      <FaqSection />
    </>
  );
}
