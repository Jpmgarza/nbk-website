import { ButtonLink } from "@/components/ui/Button";
import { CalloutCard } from "@/components/ui/CalloutCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RichText } from "@/components/ui/RichText";
import { getContent } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";
import { revealIndex } from "@/lib/motion";

export function Expertise({ locale }: { locale: Locale }) {
  const { expertise, anchors } = getContent(locale);
  return (
    <section id={anchors.expertise} aria-labelledby="expertise-title" className="section">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,519px)_minmax(0,519px)] lg:items-center lg:gap-x-[clamp(3rem,9vw,8.25rem)]">
          <SectionTitle id="expertise-title" reveal="scroll">{expertise.title}</SectionTitle>
          <p data-reveal="self" className="text-body-loose [--reveal-delay:150ms]">
            <strong className="font-semibold lg:text-lead">Noelia Krähenbühl</strong> <RichText>{expertise.intro}</RichText>
          </p>
        </div>

        <ul data-reveal="children" className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {expertise.proofs.map((proof, index) => (
            <li key={proof.title} className="flex" style={revealIndex(index)}>
              <CalloutCard
                title={proof.title}
                className="w-full transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-[204px] hover:shadow-card-hover motion-safe:hover:-translate-y-1.5"
                textClassName="lg:font-semibold"
              >
                <RichText>{proof.text}</RichText>
              </CalloutCard>
            </li>
          ))}
        </ul>

        <ButtonLink href={PAGES.contact[locale]} size="wide" className="mt-8 lg:mt-12">
          {expertise.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
