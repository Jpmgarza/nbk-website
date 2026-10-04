import Image from "next/image";
import faqIllustration from "@/assets/images/illustration-faq.webp";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getContent } from "@/lib/content";
import { PAGES, type Locale } from "@/lib/i18n";

export function FaqSection({ locale }: { locale: Locale }) {
  const { faq, anchors } = getContent(locale);
  return (
    <section id={anchors.faq} aria-labelledby="faq-title" className="section">
      <div className="container-page lg:grid lg:grid-cols-[minmax(0,652fr)_minmax(0,519fr)] lg:items-center lg:gap-x-[clamp(3rem,7.6vw,6.8rem)]">
        <div>
          <SectionTitle id="faq-title" reveal="scroll" className="lg:max-w-[519px]">
            {faq.title}
          </SectionTitle>
          <FaqList items={faq.items} reveal className="mt-10 lg:mt-12" />
          <ButtonLink href={PAGES.contact[locale]} size="wide" className="mt-10 lg:mt-12">
            {faq.cta}
          </ButtonLink>
        </div>
        <div data-reveal="clip" className="relative hidden aspect-[519/359] overflow-hidden lg:block">
          <Image src={faqIllustration} alt="" fill sizes="519px" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
