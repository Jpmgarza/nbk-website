import type { Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata("es");

export const viewport: Viewport = {
  themeColor: "#FEFDFD",
};

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="es">{children}</SiteShell>;
}
