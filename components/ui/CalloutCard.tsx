import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  children: ReactNode;
  as?: "h3" | "p";
  className?: string;
  textClassName?: string;
};

export function CalloutCard({ title, children, as: TitleTag = "h3", className, textClassName }: Props) {
  return (
    <div className={cn("flex flex-col gap-3 rounded bg-bg p-6 shadow-card", className)}>
      <TitleTag className="font-display text-h4 font-semibold text-accent">{title}</TitleTag>
      <p className={cn("text-body", textClassName)}>{children}</p>
    </div>
  );
}
