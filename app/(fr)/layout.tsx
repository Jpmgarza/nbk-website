import type { Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata("fr");

export const viewport: Viewport = {
  themeColor: "#FEFDFD",
};

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="fr">{children}</SiteShell>;
}
