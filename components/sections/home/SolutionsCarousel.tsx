"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/content";

const CARD_GAP = 24;
const AUTOPLAY_MS = 5000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Infinite, autoplaying carousel. The cards are rendered three times; the middle set is the real
 * one and the copies on each side (aria-hidden, out of the tab order) let the track keep scrolling
 * past either end. When a scroll settles in a copy, the track jumps back by one set width, which is
 * invisible because the copies are identical.
 *
 * The fill animation of the active progress segment is the timer: its animationend advances to the
 * next card, so pausing the animation (hover, keyboard focus, off screen) pauses
 * autoplay too. No autoplay with reduced motion.
 */
type Props = {
  services: Service[];
  servicesPath: string;
  /** Accessible name of the scrolling list. */
  label: string;
  /** Prefix of each indicator's name, punctuation included ("Afficher :", "Ver:"). */
  showLabel: string;
};

export function SolutionsCarousel({ services, servicesPath, label, showLabel }: Props) {
  const count = services.length;
  const loop = [...services, ...services, ...services];
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const autoplay = useSyncExternalStore(
    subscribeToMotionPreference,
    () => !window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const paused = hovered || focused || !inView;

  const step = useCallback(() => {
    const card = trackRef.current?.querySelector<HTMLElement>("[data-card]");
    return card && card.offsetWidth > 0 ? card.offsetWidth + CARD_GAP : 0;
  }, []);

  /** Moves the track back into the middle set if a scroll ended in one of the copies. */
  const recenter = useCallback(() => {
    const track = trackRef.current;
    const size = step();
    if (!track || !size) return;
    const position = Math.round(track.scrollLeft / size);
    if (position < count) track.scrollLeft += count * size;
    else if (position >= count * 2) track.scrollLeft -= count * size;
  }, [count, step]);

  const scrollToPosition = useCallback(
    (position: number) => {
      const track = trackRef.current;
      const size = step();
      if (track && size) track.scrollTo({ left: position * size, behavior: "smooth" });
    },
    [step],
  );

  useLayoutEffect(recenter, [recenter]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let settle = 0;
    const hasScrollEnd = "onscrollend" in window;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const size = step();
        if (size) setActive(((Math.round(track.scrollLeft / size) % count) + count) % count);
      });
      if (!hasScrollEnd) {
        window.clearTimeout(settle);
        settle = window.setTimeout(recenter, 150);
      }
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    if (hasScrollEnd) track.addEventListener("scrollend", recenter);

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      // The track may first get a size here (the carousel is hidden below lg).
      if (entry.isIntersecting) recenter();
    });
    observer.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", recenter);
      observer.disconnect();
    };
  }, [count, recenter, step]);

  const goTo = (index: number) => scrollToPosition(count + index);

  const advance = () => {
    const track = trackRef.current;
    const size = step();
    if (track && size) scrollToPosition(Math.round(track.scrollLeft / size) + 1);
  };

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <ul
        ref={trackRef}
        data-reveal="self"
        tabIndex={0}
        aria-label={label}
        className="carousel-track no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto [--reveal-y:0] focus-visible:outline-offset-[-2px]"
      >
        {loop.map((service, position) => {
          const isCopy = position < count || position >= count * 2;
          return (
            <li
              key={`${service.slug}-${position}`}
              data-card
              aria-hidden={isCopy || undefined}
              className="shrink-0 snap-start"
            >
              <Link
                href={`${servicesPath}#${service.slug}`}
                tabIndex={isCopy ? -1 : undefined}
                className="relative flex h-[535px] w-[410px] flex-col justify-end gap-2.5 overflow-hidden rounded px-4 py-8 text-bg"
              >
                <Image
                  src={service.illustration}
                  alt=""
                  fill
                  sizes="410px"
                  className="object-contain"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgb(29_29_27/0)_0%,rgb(29_29_27/0.3)_35%,rgb(29_29_27/0.7)_65%,rgb(29_29_27)_100%)]"
                />
                {/* Loop copies are not headings, so the outline lists each service once. */}
                {isCopy ? (
                  <p className="relative max-w-[328px] font-display text-h3 font-semibold leading-[1.05]">{service.title}</p>
                ) : (
                  <h3 className="relative max-w-[328px] font-display text-h3 font-semibold leading-[1.05]">{service.title}</h3>
                )}
                <p className="relative text-body">{service.summary}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center gap-2">
        {services.map((service, index) => (
          <button
            key={service.slug}
            type="button"
            aria-label={`${showLabel} ${service.title}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
            className="group -my-2.5 flex h-11 w-12 items-center"
          >
            <span className="relative h-1 w-full overflow-hidden rounded-full bg-ink/15 transition-colors group-hover:bg-ink/30">
              {index === active && (
                <span
                  key={active}
                  className={cn(
                    "absolute inset-0 origin-left rounded-full bg-ink",
                    autoplay && "carousel-progress",
                  )}
                  style={{ "--carousel-interval": `${AUTOPLAY_MS}ms`, animationPlayState: paused ? "paused" : "running" } as CSSProperties}
                  onAnimationEnd={(event) => {
                    if (event.target === event.currentTarget) advance();
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
