import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ locale: "es", page: "home" });

export default function Page() {
  return <HomePage locale="es" />;
}
