import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ locale: "fr", page: "home" });

export default function Page() {
  return <HomePage locale="fr" />;
}
