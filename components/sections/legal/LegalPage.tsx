import type { ReactNode } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-8 lg:pb-46 lg:pt-12">
      <div className="container-page">
        <SectionTitle as="h1">{title}</SectionTitle>
        <p className="mt-6 text-body text-ink/72">Dernière mise à jour : {updated}</p>
        <div className="mt-12 flex max-w-[70ch] flex-col gap-10 text-body-loose [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:text-h4 [&_h2]:font-semibold [&_section]:flex [&_section]:flex-col [&_section]:gap-3 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  );
}
