import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "accent" | "ink";
type Size = "md" | "wide";

const VARIANTS: Record<Variant, string> = {
  accent: "bg-accent hover:bg-accent-strong",
  ink: "bg-ink hover:bg-ink/80",
};

const SIZES: Record<Size, string> = {
  md: "min-w-[240px]",
  wide: "min-w-[240px] lg:min-w-[302px]",
};

export function buttonClasses(variant: Variant = "accent", size: Size = "md", className?: string) {
  return cn(
    "inline-flex h-[60px] items-center justify-center rounded px-4 text-center font-sans text-button font-bold uppercase text-bg transition-colors duration-200 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
