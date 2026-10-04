import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { getContent, getServices } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";
import { SolutionsCarousel } from "./SolutionsCarousel";

export function Solutions({ locale }: { locale: Locale }) {
  const { solutions, anchors } = getContent(locale);
  const services = getServices(locale);
  const servicesPath = PAGES.services[locale];
  return (
    <section id={anchors.solutions} aria-labelledby="solutions-title" className="section overflow-hidden">
      <div className="container-page">
        <SectionTitle id="solutions-title" reveal="scroll">{solutions.title}</SectionTitle>
      </div>

      <div className="hidden lg:block">
        <SolutionsCarousel
          services={services}
          servicesPath={servicesPath}
          label={solutions.carouselLabel}
          showLabel={solutions.show}
        />
      </div>

      <ul className="container-page mt-8 flex flex-col gap-12 lg:hidden">
        {services.map((service, index) => {
          const imageFirst = index % 2 === 1;
          return (
            <li
              key={service.slug}
              data-reveal="self"
              className={imageFirst ? "[--reveal-x:-2.5rem] [--reveal-y:0]" : "[--reveal-x:2.5rem] [--reveal-y:0]"}
            >
              <Link
                href={`${servicesPath}#${service.slug}`}
                className={cn(
                  "group grid items-center",
                  imageFirst
                    ? "grid-cols-[minmax(0,152fr)_minmax(0,176fr)] md:grid-cols-[240px_minmax(0,1fr)] md:gap-8"
                    : "grid-cols-[minmax(0,176fr)_minmax(0,152fr)] md:grid-cols-[minmax(0,1fr)_240px] md:gap-8",
                )}
              >
                <div className={cn(imageFirst && "order-2")}>
                  <h3 className="font-display text-h4 leading-6 text-accent group-hover:underline">{service.title}</h3>
                  <p className="mt-2 text-body text-ink/72">{service.summary}</p>
                </div>
                <Image
                  src={service.illustration}
                  alt=""
                  sizes="(min-width: 768px) 240px, 45vw"
                  className={cn("motion-parallax aspect-square h-auto w-full object-contain", imageFirst && "order-1")}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="container-page">
        <ButtonLink href={servicesPath} size="wide" className="mt-8 lg:mt-12">
          <span className="lg:hidden">{solutions.ctaMobile}</span>
          <span className="hidden lg:inline">{solutions.ctaDesktop}</span>
        </ButtonLink>
      </div>
    </section>
  );
}
