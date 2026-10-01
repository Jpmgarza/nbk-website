import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { SERVICES } from "@/lib/data/services";
import { SolutionsCarousel } from "./SolutionsCarousel";

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="section overflow-hidden">
      <div className="container-page">
        <SectionTitle id="solutions-title" reveal="scroll">Vos solutions</SectionTitle>
      </div>

      <div className="hidden lg:block">
        <SolutionsCarousel services={SERVICES} />
      </div>

      <ul className="container-page mt-8 flex flex-col gap-12 lg:hidden">
        {SERVICES.map((service, index) => {
          const imageFirst = index % 2 === 1;
          return (
            <li
              key={service.slug}
              data-reveal="self"
              className={imageFirst ? "[--reveal-x:-2.5rem] [--reveal-y:0]" : "[--reveal-x:2.5rem] [--reveal-y:0]"}
            >
              <Link
                href={`/services#${service.slug}`}
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
        <ButtonLink href="/services" size="wide" className="mt-8 lg:mt-12">
          <span className="lg:hidden">Choisir mon service</span>
          <span className="hidden lg:inline">Découvrir les solutions</span>
        </ButtonLink>
      </div>
    </section>
  );
}
