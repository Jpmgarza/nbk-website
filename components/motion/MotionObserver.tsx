"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Scroll reveals for elements marked with data-reveal (variants in styles/motion.css).
 * Elements are only hidden once this runs, so the page stays complete without JavaScript or
 * with reduced motion. Anything already on screen is left alone; the rest gets
 * data-reveal-state="pending", then "in" the first time it scrolls into view. Elements with
 * data-reveal-manual are revealed by their own component (the process timeline).
 */
export function MotionObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal-state", "in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-reveal-manual]):not([data-reveal-state='in'])",
    );
    for (const target of targets) {
      const rect = target.getBoundingClientRect();
      const onScreen = rect.bottom > 0 && rect.top < window.innerHeight && rect.height > 0;
      if (onScreen && !target.hasAttribute("data-reveal-state")) continue;
      target.setAttribute("data-reveal-state", "pending");
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
