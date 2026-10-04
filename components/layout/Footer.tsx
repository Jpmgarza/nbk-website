import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo-nbk.webp";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SITE } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";

const linkClass = "opacity-85 transition-opacity hover:opacity-100 hover:underline";
const columnTitleClass = "font-display text-h4 font-medium lg:font-semibold";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const { footer, nav } = getContent(locale);

  return (
    <footer className="on-accent bg-accent text-bg">
      <div className="container-page flex flex-col gap-8 pb-12 pt-24 lg:gap-18 lg:pb-18 lg:pt-46">
        <div className="flex flex-col items-start">
          <SectionTitle tone="light" rule="ink" className="lg:max-w-[845px]">
            {footer.title}
          </SectionTitle>
          <ButtonLink href={PAGES.contact[locale]} variant="ink" className="mt-2 lg:mt-4">
            {footer.cta}
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:hidden">
          <nav aria-label={footer.navLabel}>
            <p className={columnTitleClass}>{footer.navigation}</p>
            <ul className="mt-4 flex flex-col gap-2 text-body font-light">
              {nav.mobileFooter.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={columnTitleClass}>{footer.contact}</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a href={SITE.phone.href} className="text-body hover:underline">
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all text-base hover:underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block lg:-mt-1">
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={64} height={64} unoptimized />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav aria-label={footer.sitemapLabel} className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          {nav.footerGroups.map((group) => (
            <div key={group.title}>
              <p className={columnTitleClass}>{group.title}</p>
              <ul className="mt-4 flex flex-col gap-2 text-body">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className={columnTitleClass}>{footer.reachUs}</p>
            <ul className="mt-4 flex flex-col gap-2 text-body">
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phone.href} className={linkClass}>
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className={columnTitleClass}>{footer.legal}</p>
            <ul className="mt-4 flex flex-col gap-2 text-body">
              {nav.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="hidden lg:flex lg:flex-col lg:gap-2">
          <a href={SITE.studio.url} target="_blank" rel="noopener" className="-my-3 self-start py-3 font-display text-h4 hover:underline">
            {footer.madeBy} {SITE.studio.name}
          </a>
          <p className="text-caption">© {year} {SITE.name}. {footer.rights}</p>
        </div>

        <div className="flex w-fit items-center justify-center rounded bg-bg p-4 lg:h-[273px] lg:w-full lg:p-16">
          <Image src={logo} alt={SITE.name} sizes="(min-width: 1024px) 280px, 222px" className="h-[131px] w-auto lg:h-[166px]" />
        </div>

        <div className="lg:hidden">
          <hr className="border-ink" />
          <div className="mt-8 flex flex-col gap-2 text-caption opacity-85">
            <p>© {year} NBK, Interprétation & Traduction juridique. {footer.rights}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {nav.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-offset-2 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={SITE.studio.url} target="_blank" rel="noopener" className="-mb-3 self-start py-3 hover:underline">
              {footer.madeByShort} {SITE.studio.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
