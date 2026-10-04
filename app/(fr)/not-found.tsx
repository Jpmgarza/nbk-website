import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { getContent } from "@/lib/content";

export const metadata = { title: getContent("fr").meta.notFound.title };

export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
