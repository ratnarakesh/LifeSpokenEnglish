import type { Metadata } from "next";
import { SITE } from "./site";

export const OG_IMAGE = "/brand/og-image.png";

/** Builds complete per-page metadata (page-level openGraph replaces the root one, so repeat shared fields). */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    ...(SITE.url && { alternates: { canonical: path } }),
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE.name,
      title: `${title} | LIFE Spoken English`,
      description,
      ...(SITE.url && {
        url: path,
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "LIFE: Live It For Eternity" }],
      }),
    },
    twitter: {
      card: SITE.url ? "summary_large_image" : "summary",
      title: `${title} | LIFE Spoken English`,
      description,
      ...(SITE.url && { images: [OG_IMAGE] }),
    },
  };
}
