import type { ReactNode } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Props = {
  title: string;
  /** "Dernière mise à jour :" and the date, in the page's language. */
  updated: { label: string; date: string };
  children: ReactNode;
};

export function LegalPage({ title, updated, children }: Props) {
  return (
    <section className="pb-24 pt-8 lg:pb-46 lg:pt-12">
      <div className="container-page">
        <SectionTitle as="h1">{title}</SectionTitle>
        <p className="mt-6 text-body text-ink/72">{updated.label} {updated.date}</p>
        <div className="mt-12 flex max-w-[52ch] flex-col gap-10 text-body-loose [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:text-h4 [&_h2]:font-semibold [&_section]:flex [&_section]:flex-col [&_section]:gap-3 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  );
}
