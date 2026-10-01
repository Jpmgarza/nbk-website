import type { CSSProperties } from "react";

/** Stagger position of a child inside a data-reveal="children" | "rows" container. */
export function revealIndex(index: number): CSSProperties {
  return { "--reveal-i": index } as CSSProperties;
}
