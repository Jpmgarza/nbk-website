"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import logo from "@/assets/images/logo-nbk.webp";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { MAIN_NAV, SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";

/** Past this scroll offset the header turns into the compact bar (logo + burger on every size). */
const COMPACT_AFTER = 80;

const headerItem = (index: number) => ({ "--header-i": index }) as CSSProperties;

const navLinkClass =
  "inline-flex min-h-11 items-center text-body uppercase transition-colors hover:text-accent aria-[current=page]:text-accent";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLLIElement>(null);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCompact(window.scrollY > COMPACT_AFTER));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const outside = document.querySelectorAll<HTMLElement>("main, footer");
    outside.forEach((el) => (el.inert = menuOpen));
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      outside.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      setServicesOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const isCurrent = (href: string) => (href === pathname ? "page" : undefined);

  return (
    <>
      {/* The header is fixed so it can shrink without moving the page; this keeps its full height in the flow. */}
      <div aria-hidden="true" className="h-[100px] xl:h-[134px]" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-bg transition-shadow duration-300",
          compact && "shadow-[0_1px_0_rgb(29_29_27/0.08),0_8px_24px_rgb(29_29_27/0.06)]",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between transition-[height] duration-300 ease-out",
            compact ? "h-[76px]" : "h-[100px] xl:h-[134px]",
          )}
        >
          <Link
            href="/"
            className="motion-header-item shrink-0"
            style={headerItem(0)}
            aria-label="NBK Interprétation & Traduction juridique, accueil"
          >
            <Image
              src={logo}
              alt=""
              priority
              sizes="151px"
              className={cn("w-auto transition-[height] duration-300 ease-out", compact ? "h-[52px]" : "h-[68px] xl:h-[86px]")}
            />
          </Link>

          {/* Unmounted from view (display: none) in compact mode, so its items replay the drop-in when it returns. */}
          <nav
            aria-label="Navigation principale"
            className={cn("ml-[clamp(2rem,5vw,4.5rem)] hidden flex-1", !compact && "xl:block")}
          >
            <ul className="flex items-center justify-between">
              {MAIN_NAV.map((item, index) =>
                item.href === "/services" ? (
                  <li
                    key={item.href}
                    ref={servicesRef}
                    className="motion-header-item relative"
                    style={headerItem(index + 1)}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      className={cn(navLinkClass, "gap-2", pathname === "/services" && "text-accent")}
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((open) => !open)}
                    >
                      {item.label}
                      <Image
                        src="/icons/caret.svg"
                        alt=""
                        width={7}
                        height={6}
                        unoptimized
                        className={cn("transition-transform duration-200", !servicesOpen && "rotate-180")}
                      />
                    </button>
                    <div id="services-menu" hidden={!servicesOpen} className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                      <ul className="w-[22rem] rounded bg-bg p-2 shadow-menu ring-1 ring-ink/8">
                        <li>
                          <Link
                            href="/services"
                            className="flex min-h-11 items-center rounded px-3 font-semibold hover:bg-accent/8 hover:text-accent"
                          >
                            Tous les services
                          </Link>
                        </li>
                        {SERVICES.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services#${service.slug}`}
                              className="flex min-h-11 items-center rounded px-3 py-2 hover:bg-accent/8 hover:text-accent"
                              onClick={() => setServicesOpen(false)}
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href} className="motion-header-item" style={headerItem(index + 1)}>
                    <Link href={item.href} className={navLinkClass} aria-current={isCurrent(item.href)}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn("motion-header-item relative -mr-1 size-14", !compact && "xl:hidden")}
            style={headerItem(1)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={cn(
                "absolute left-1 top-[10px] h-[3px] w-12 rounded-full bg-ink transition-transform duration-300",
                menuOpen && "translate-y-[18px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-1 top-[28px] h-[3px] w-12 rounded-full bg-ink transition-opacity duration-200",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-1 top-[46px] h-[3px] w-12 rounded-full bg-accent transition-transform duration-300",
                menuOpen && "-translate-y-[18px] -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-bg",
          compact ? "top-[76px]" : "top-[100px] xl:hidden",
        )}
      >
        <nav aria-label="Navigation mobile" className="container-page flex flex-col pb-12 pt-4">
          <ul className="flex flex-col divide-y divide-ink/10">
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="py-2">
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center font-display text-menu transition-colors hover:text-accent aria-[current=page]:text-accent"
                  aria-current={isCurrent(item.href)}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.href === "/services" && (
                  <ul className="mb-2 flex flex-col border-l-2 border-accent/30 pl-4">
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services#${service.slug}`}
                          className="flex min-h-11 items-center py-1 text-body text-ink/72 hover:text-accent"
                          onClick={() => setMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact" className="mt-8 self-start" onClick={() => setMenuOpen(false)}>
            Recevoir mon devis
          </ButtonLink>
          <div className="mt-8 flex flex-col text-body">
            <a href={SITE.phone.href} className="inline-flex min-h-11 items-center text-accent hover:underline">
              {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center text-accent hover:underline">
              {SITE.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
