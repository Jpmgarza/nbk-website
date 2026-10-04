import { ContactPage } from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ locale: "fr", page: "contact" });

export default function Page() {
  return <ContactPage locale="fr" />;
}
