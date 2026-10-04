import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getContent } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";
import { ProcessLine } from "./ProcessLine";

/**
 * Mobile: a plain numbered list. From lg: a zigzag timeline around a centre column of
 * number tiles; each step is a subgrid row. One line (ProcessLine) runs behind the tiles from
 * the first to the last; the side columns are equal, so the wrapper's centre is the tiles' centre.
 * ProcessLine also reveals the steps as the line reaches them (data-reveal-manual keeps
 * MotionObserver away from them). Tiles are opaque so the line does not show through.
 */
export function Process({ locale }: { locale: Locale }) {
  const { process, anchors } = getContent(locale);
  return (
    <section
      id={anchors.process}
      aria-labelledby="demarche-title"
      className="section overflow-x-clip"
    >
      <div className="container-page">
        <SectionTitle id="demarche-title" reveal="scroll">
          {process.title}
        </SectionTitle>
        <p data-reveal="self" className="mt-8 text-body lg:hidden">
          {process.subtitle}
        </p>

        <div className="relative">
          <ol className="mt-4 flex flex-col gap-4 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,519px)_84px_minmax(0,519px)] lg:justify-center lg:gap-x-[clamp(2rem,5.5vw,5rem)] lg:gap-y-20">
            {process.steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal="step"
                data-reveal-manual
                className="group flex gap-6 pl-4 lg:col-span-3 lg:grid lg:grid-cols-subgrid lg:items-start lg:gap-[normal] lg:pl-0"
              >
                <span
                  aria-hidden="true"
                  data-process-tile
                  className="relative w-12 shrink-0 font-display text-numeral text-accent/50 lg:z-[1] lg:col-start-2 lg:row-start-1 lg:grid lg:size-[84px] lg:place-items-center lg:rounded lg:bg-bg lg:bg-[image:linear-gradient(rgb(var(--color-accent)/0.08),rgb(var(--color-accent)/0.08))] lg:text-accent"
                >
                  {index + 1}
                </span>
                <div className="flex flex-col lg:row-start-1 lg:gap-2 lg:group-odd:col-start-3 lg:group-even:col-start-1 lg:group-even:text-right">
                  <h3 className="font-display text-h4 lg:text-h3 lg:font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-body text-ink/72 lg:text-ink">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <ProcessLine />
        </div>

        <ButtonLink href={PAGES.contact[locale]} size="wide" className="mt-8 lg:mt-12">
          {process.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
