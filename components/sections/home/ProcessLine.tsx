"use client";

import { useEffect, useRef } from "react";

/** How far down the viewport the line's tip sits: the line has grown up to this point. */
const TIP = 0.65;

/**
 * The single timeline line of the process section and the sequence it drives. Its tip follows
 * the scroll: a step (tile pops, then its text slides in) is revealed once the tip reaches its
 * tile. The line then waits at that tile's top edge until the tile has finished fading in (its
 * opacity transitionend), so it never runs behind a half-transparent tile, and only then grows
 * towards the next one. Revealed steps stay; scrolling back up
 * only shortens the line. Must be the last child of a positioned wrapper around the steps
 * (data-reveal="step", each with a data-process-tile), which tile offsets are measured against.
 * With reduced motion the line is drawn in full and nothing is hidden.
 */
export function ProcessLine() {
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const wrapper = line?.parentElement;
    if (!line || !wrapper) return;

    const steps = Array.from(wrapper.querySelectorAll<HTMLElement>("[data-reveal='step']"));
    const tiles = steps.map((step) => step.querySelector<HTMLElement>("[data-process-tile]"));
    if (tiles.length < 2 || tiles.some((tile) => !tile)) return;
    const first = tiles[0]!;
    const last = tiles[tiles.length - 1]!;
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Steps whose tile is fully opaque; the line may only run past these.
    const settled = steps.map(() => true);
    const timers: number[] = [];

    let start = 0;
    let length = 0;
    // offsetTop ignores the tiles' reveal transform, unlike getBoundingClientRect.
    const measure = () => {
      start = first.offsetTop + first.offsetHeight;
      length = Math.max(last.offsetTop - start, 0);
      line.style.top = `${start}px`;
      line.style.height = `${length}px`;
    };
    const tipY = () => window.innerHeight * TIP - wrapper.getBoundingClientRect().top;

    const update = () => {
      if (!animate) {
        line.style.transform = "none";
        return;
      }
      let end = tipY();
      for (let index = 0; index < steps.length; index++) {
        const tileTop = tiles[index]!.offsetTop;
        if (end < tileTop) break;
        if (steps[index]!.dataset.revealState === "pending") reveal(index);
        if (!settled[index]) {
          end = tileTop;
          break;
        }
      }
      const progress = length ? Math.min(Math.max((end - start) / length, 0), 1) : 0;
      line.style.transform = `scaleY(${progress})`;
    };

    const reveal = (index: number) => {
      const tile = tiles[index]!;
      const settle = () => {
        if (settled[index]) return;
        settled[index] = true;
        tile.removeEventListener("transitionend", onEnd);
        update();
      };
      const onEnd = (event: TransitionEvent) => {
        if (event.target === tile && event.propertyName === "opacity") settle();
      };
      tile.addEventListener("transitionend", onEnd);
      // In case transitionend never fires (e.g. background tab).
      timers.push(window.setTimeout(settle, 1500));
      steps[index]!.dataset.revealState = "in";
    };

    measure();
    if (animate) {
      // Steps the tip has already passed (e.g. arriving on #demarche) stay visible without animating.
      const tip = tipY();
      steps.forEach((step, index) => {
        if (tip < tiles[index]!.offsetTop && step.dataset.revealState !== "in") {
          step.dataset.revealState = "pending";
          settled[index] = false;
        }
      });
    }
    update();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resizeObserver = new ResizeObserver(() => {
      measure();
      update();
    });
    resizeObserver.observe(wrapper);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      ref={lineRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-[calc(50%-1px)] top-0 hidden w-0.5 origin-top scale-y-0 bg-ink transition-transform duration-300 ease-out lg:block"
    />
  );
}
