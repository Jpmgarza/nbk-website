import Image from "next/image";
import type { FaqItem } from "@/lib/content";
import { cn } from "@/lib/cn";
import { revealIndex } from "@/lib/motion";

type Props = {
  items: FaqItem[];
  className?: string;
  /** Questions fade in one after another when the list scrolls into view. */
  reveal?: boolean;
};

export function FaqList({ items, className, reveal }: Props) {
  return (
    <div data-reveal={reveal ? "children" : undefined} className={cn("flex flex-col [--reveal-y:1.5rem]", className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          style={revealIndex(index)}
          className="group border-b border-ink/30 py-4 first:pt-0 last:border-b-0 last:pb-0 lg:border-b-2"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-h4 transition-colors hover:text-accent lg:font-semibold [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <Image
              src="/icons/caret.svg"
              alt=""
              width={7}
              height={6}
              unoptimized
              className="mt-[13px] shrink-0 rotate-180 transition-transform duration-200 group-open:rotate-0"
            />
          </summary>
          <p className="max-w-[52ch] pt-3 text-body-loose text-ink/85">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
