import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Service } from "@/lib/data/services";
import { revealIndex } from "@/lib/motion";

const subheadingClass = "font-display text-h4 font-semibold lg:text-h3";

export function ServiceDetail({ service }: { service: Service }) {
  const titleId = `${service.slug}-title`;

  return (
    <section id={service.slug} aria-labelledby={titleId} className="section-tight scroll-mt-4">
      <div className="container-page lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,clamp(480px,calc(51.3vw_-_45px),519px))] lg:items-center lg:gap-x-[clamp(3rem,6.7vw,6rem)]">
        <div>
          <SectionTitle id={titleId} reveal="scroll">{service.title}</SectionTitle>

          <div
            data-reveal="children"
            className="mt-8 flex flex-col gap-6 [--reveal-delay:150ms] lg:mt-12 lg:max-w-[521px] lg:gap-8"
          >
            <div className="flex flex-col gap-4 lg:gap-2" style={revealIndex(0)}>
              <h3 className={subheadingClass}>{service.audience.label}</h3>
              <p className="text-body">{service.audience.text}</p>
            </div>
            <div className="flex flex-col gap-4" style={revealIndex(1)}>
              <h3 className={subheadingClass}>{service.benefit.label}</h3>
              <div className="flex flex-col gap-2">
                {service.benefit.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div data-reveal="self" className="relative mt-8 aspect-[328/155] overflow-hidden [--reveal-y:0] md:aspect-[2/1] lg:hidden">
            <Image
              src={service.illustration}
              alt=""
              sizes="(min-width: 768px) 50vw, 68vw"
              className="absolute left-1/2 top-[-17.6%] aspect-square h-auto w-[68.4%] -translate-x-1/2 md:top-[-10%] md:w-1/2"
            />
          </div>

          {/* The reveal sits on a wrapper: the button has its own transitions. */}
          <div data-reveal="self" className="mt-8 [--reveal-delay:330ms] lg:mt-12">
            <ButtonLink href={`/contact?mission=${encodeURIComponent(service.title)}`}>{service.cta}</ButtonLink>
          </div>
        </div>

        <div data-reveal="self" className="relative hidden aspect-[519/668] [--reveal-delay:200ms] [--reveal-y:0] lg:block">
          <Image src={service.illustration} alt="" fill sizes="519px" className="object-contain" />
        </div>
      </div>
    </section>
  );
}
