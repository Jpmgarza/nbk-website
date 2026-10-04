import { ServicesPage } from "@/components/pages/ServicesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ locale: "fr", page: "services" });

export default function Page() {
  return <ServicesPage locale="fr" />;
}
