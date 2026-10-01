import { ButtonLink } from "@/components/ui/Button";
import { CalloutCard } from "@/components/ui/CalloutCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PROBLEMS } from "@/lib/data/home";
import { revealIndex } from "@/lib/motion";

export function Problems() {
  return (
    <section id="problemes" aria-labelledby="problemes-title" className="section overflow-x-clip">
      <div className="container-page">
        <div className="lg:max-w-[1200px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <SectionTitle id="problemes-title" reveal="scroll" className="lg:w-[519px] lg:shrink-0">
              Vos problèmes
            </SectionTitle>
            <p data-reveal="self" className="text-body lg:hidden">
              {PROBLEMS.summary}
            </p>
            <p data-reveal="self" className="hidden text-body [--reveal-delay:150ms] lg:block lg:max-w-[440px]">
              <strong className="font-bold">{PROBLEMS.riskTitle}</strong> {PROBLEMS.riskText}
            </p>
          </div>

          <ol data-reveal="rows" className="mt-12 hidden lg:block">
            {PROBLEMS.items.map((item, index) => (
              <li
                key={item.title}
                style={revealIndex(index)}
                className="relative flex items-center gap-6 px-10 pb-[calc(1.5rem+2px)] pt-6 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-ink/30"
              >
                <span aria-hidden="true" className="w-[60px] shrink-0 font-display text-index font-medium text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-h4 font-semibold">{item.title}</h3>
                  <p className="text-body">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal="self" className="mt-8 lg:hidden">
            <CalloutCard as="p" title={PROBLEMS.riskTitle}>
              {PROBLEMS.riskText.charAt(0).toUpperCase() + PROBLEMS.riskText.slice(1)}
            </CalloutCard>
          </div>
        </div>

        <ButtonLink href="/#solutions" size="wide" className="mt-8 lg:mt-12">
          Trouver une solution
        </ButtonLink>
      </div>
    </section>
  );
}
