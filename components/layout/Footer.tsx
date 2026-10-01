import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo-nbk.webp";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FOOTER_NAV, LEGAL_NAV, MOBILE_FOOTER_NAV, SITE } from "@/lib/constants";

const linkClass = "opacity-85 transition-opacity hover:opacity-100 hover:underline";
const columnTitleClass = "font-display text-h4 font-medium lg:font-semibold";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-accent bg-accent text-bg">
      <div className="container-page flex flex-col gap-8 pb-12 pt-24 lg:gap-18 lg:pb-18 lg:pt-46">
        <div className="flex flex-col items-start">
          <SectionTitle tone="light" rule="ink" className="lg:max-w-[845px]">
            Sécurisez votre prochain rendez-vous ou audition dès aujourd’hui.
          </SectionTitle>
          <ButtonLink href="/contact" variant="ink" className="mt-2 lg:mt-4">
            Parler de mon besoin
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:hidden">
          <nav aria-label="Navigation du pied de page">
            <p className={columnTitleClass}>Navigation</p>
            <ul className="mt-4 flex flex-col gap-2 text-body font-light">
              {MOBILE_FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={columnTitleClass}>Contact</p>
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
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="-mt-1 inline-block">
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={64} height={64} unoptimized />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav aria-label="Plan du site" className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          {FOOTER_NAV.map((group) => (
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
            <p className={columnTitleClass}>Nous joindre</p>
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
            <p className={columnTitleClass}>Légalités</p>
            <ul className="mt-4 flex flex-col gap-2 text-body">
              {LEGAL_NAV.map((link) => (
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
          <a href={SITE.studio.url} target="_blank" rel="noopener" className="self-start font-display text-h4 hover:underline">
            Site Web conçu par {SITE.studio.name}
          </a>
          <p className="text-caption">© {year} {SITE.name}. Tous droits réservés.</p>
        </div>

        <div className="flex w-fit items-center justify-center rounded bg-bg p-4 lg:h-[273px] lg:w-full lg:p-16">
          <Image src={logo} alt={SITE.name} sizes="(min-width: 1024px) 280px, 222px" className="h-[131px] w-auto lg:h-[166px]" />
        </div>

        <div className="lg:hidden">
          <hr className="border-ink" />
          <div className="mt-8 flex flex-col gap-2 text-caption opacity-85">
            <p>© {year} NBK, Interprétation & Traduction juridique. Tous droits réservés.</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {LEGAL_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-offset-2 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={SITE.studio.url} target="_blank" rel="noopener" className="self-start hover:underline">
              Site conçu par {SITE.studio.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
