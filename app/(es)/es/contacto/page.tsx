import { ContactPage } from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ locale: "es", page: "contact" });

export default function Page() {
  return <ContactPage locale="es" />;
}
