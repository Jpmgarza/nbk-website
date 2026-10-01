import type { Metadata, Viewport } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionObserver } from "@/components/motion/MotionObserver";
import { SITE } from "@/lib/constants";
import { HOME_TITLE, TITLE_TEMPLATE } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: HOME_TITLE, template: TITLE_TEMPLATE },
  applicationName: SITE.name,
  authors: [{ name: SITE.owner }],
  creator: SITE.studio.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#FEFDFD",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr-CH" className={`${inter.variable} ${sourceSans.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <MotionObserver />
      </body>
    </html>
  );
}
