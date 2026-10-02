import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

type Props = {
  title: ReactNode;
  body: ReactNode;
  cta: { label: string; href: string };
  /** Omit to render a grey placeholder block instead of a photo. */
  image?: StaticImageData;
  imageAlt?: string;
  imageClassName?: string;
  align?: "center" | "start";
  className?: string;
};

/**
 * Below lg the title sits on the photo (full-bleed, darkened at the bottom); from lg the
 * photo moves to a right-hand column. Both layouts come from the same grid via named areas.
 */
export function PageHero({ title, body, cta, image, imageAlt, imageClassName, align = "center", className }: Props) {
  return (
    <section className={cn("lg:container-page lg:pb-24", className)}>
      <div
        className={cn(
          "grid [grid-template-areas:'media'_'body'_'cta']",
          "lg:mx-auto lg:max-w-[1066px] lg:grid-cols-[minmax(0,629fr)_minmax(0,413fr)] lg:gap-x-6",
          "lg:[grid-template-areas:'._media'_'title_media'_'body_media'_'cta_media'_'._media']",
          align === "center" ? "lg:grid-rows-[1fr_auto_auto_auto_1fr]" : "lg:grid-rows-[0_auto_auto_auto_1fr]",
        )}
      >
        <div className="motion-hero-media relative h-[510px] overflow-hidden rounded [grid-area:media] md:h-[720px] [@media(max-height:500px)_and_(max-width:1023px)]:h-[calc(100svh-100px)] lg:h-auto lg:aspect-[413/586] lg:self-center">
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 413px, 100vw"
              className={cn("object-cover", imageClassName)}
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 bg-[#9ca3af]" />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(29_29_27/0)_0%,rgb(29_29_27/0.08)_35%,rgb(29_29_27/0.92)_100%)] lg:hidden"
          />
        </div>

        <SectionTitle
          as="h1"
          size="display"
          tone="hero"
          reveal="load"
          className="z-10 self-end px-gutter pb-8 [grid-area:media] lg:max-w-[629px] lg:px-0 lg:pb-0 lg:[grid-area:title]"
        >
          {title}
        </SectionTitle>

        <div className="motion-load-up px-gutter pt-8 [--load-delay:650ms] [grid-area:body] lg:mt-12 lg:max-w-[519px] lg:px-0 lg:pt-0">{body}</div>

        <div className="motion-load-up px-gutter pb-12 pt-8 [--load-delay:800ms] [grid-area:cta] lg:mt-12 lg:px-0 lg:py-0">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
