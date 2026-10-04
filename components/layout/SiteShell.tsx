import { Inter, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionObserver } from "@/components/motion/MotionObserver";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/lib/content";
import { HTML_LANG, type Locale } from "@/lib/i18n";
import { businessSchema } from "@/lib/structured-data";
import "@/styles/globals.css";
import "@/styles/motion.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const SKIP_LINK: Record<Locale, string> = { fr: "Aller au contenu", es: "Ir al contenido" };

/** The whole document, shared by the French and Spanish root layouts (app/(fr), app/(es)). */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const content = getContent(locale);

  return (
    <html lang={HTML_LANG[locale]} className={`${inter.variable} ${sourceSans.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">
          {SKIP_LINK[locale]}
        </a>
        <Header
          locale={locale}
          copy={content.header}
          nav={content.nav.main}
          services={content.services.map(({ slug, title }) => ({ slug, title }))}
        />
        <main id="contenu">{children}</main>
        <Footer locale={locale} />
        <MotionObserver />
        <JsonLd data={businessSchema(locale)} />
      </body>
    </html>
  );
}
