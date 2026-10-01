import type { Metadata } from "next";
import { SITE } from "./constants";

export const HOME_TITLE = "Interprète français-espagnol juridique, Vaud | NBK";
export const TITLE_TEMPLATE = "%s | NBK Interprétation";

const SHARE_IMAGE = {
  url: "/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "NBK Interprétation & Traduction Juridique, Noelia Krähenbühl",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle, noindex }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : TITLE_TEMPLATE.replace("%s", title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
