import Image from "next/image";
import illustration404 from "@/assets/images/illustration-404.webp";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getContent } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";

/**
 * Same layout as a service section (ServiceDetail): text and buttons on the left, illustration on
 * the right from lg, a cropped illustration band between text and buttons below lg. The page is on
 * screen at load, so it plays the load entrance instead of scroll reveals.
 */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { notFound } = getContent(locale);
  return (
    <section className="section-tight">
      <div className="container-page lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,clamp(480px,calc(51.3vw_-_45px),519px))] lg:items-center lg:gap-x-[clamp(3rem,6.7vw,6rem)]">
        <div>
          <SectionTitle as="h1" reveal="load">
            {notFound.title}
          </SectionTitle>

          <p className="motion-load-up mt-8 text-body [--load-delay:650ms] lg:mt-12 lg:max-w-[521px]">{notFound.text}</p>

          <div className="motion-load-fade relative mt-8 aspect-[328/155] overflow-hidden [--load-delay:400ms] md:aspect-[2/1] lg:hidden">
            <Image
              src={illustration404}
              alt=""
              priority
              sizes="(min-width: 768px) 50vw, 68vw"
              className="absolute left-1/2 top-[-17.6%] aspect-square h-auto w-[68.4%] -translate-x-1/2 md:top-[-10%] md:w-1/2"
            />
          </div>

          <div className="motion-load-up mt-8 flex flex-wrap gap-4 [--load-delay:800ms] lg:mt-12">
            <ButtonLink href={PAGES.home[locale]}>{notFound.home}</ButtonLink>
            <ButtonLink href={PAGES.contact[locale]} variant="ink">
              {notFound.contact}
            </ButtonLink>
          </div>
        </div>

        <div className="motion-load-fade relative hidden aspect-[519/668] [--load-delay:400ms] lg:block">
          <Image src={illustration404} alt="" fill priority sizes="519px" className="object-contain" />
        </div>
      </div>
    </section>
  );
}
