import type { ReactNode } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  size?: "display" | "display-compact" | "section";
  tone?: "ink" | "light" | "hero";
  rule?: "accent" | "ink";
  className?: string;
  titleClassName?: string;
  /** "scroll": words rise and the rule draws when scrolled into view; "load": on page load (hero). */
  reveal?: "scroll" | "load";
};

const SIZES = {
  display: "text-h3 font-normal lg:text-h1 lg:font-semibold lg:leading-[0.95]",
  "display-compact": "text-h3 font-normal lg:text-h1-compact lg:font-semibold lg:leading-[0.95]",
  section: "text-h3 font-normal lg:text-h2 lg:font-semibold",
};

const TONES = {
  ink: "text-ink",
  light: "text-bg",
  hero: "text-bg lg:text-ink",
};

export function SectionTitle({
  children,
  as: Tag = "h2",
  id,
  size = "section",
  tone = "ink",
  rule = "accent",
  className,
  titleClassName,
  reveal,
}: Props) {
  return (
    <div
      data-reveal={reveal === "scroll" ? "title" : undefined}
      data-reveal-load={reveal === "load" ? "title" : undefined}
      className={cn("flex flex-col gap-2", size === "section" && "lg:gap-4", className)}
    >
      <Tag id={id} className={cn("font-display", SIZES[size], TONES[tone], titleClassName)}>
        {reveal ? <SplitWords>{children}</SplitWords> : children}
      </Tag>
      <span
        aria-hidden="true"
        className={cn(
          "reveal-rule block h-[3px] w-12 rounded-full lg:h-[7px] lg:w-28",
          rule === "ink" ? "bg-ink" : "bg-accent",
        )}
      />
    </div>
  );
}
