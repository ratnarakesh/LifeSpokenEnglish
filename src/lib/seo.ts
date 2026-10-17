import type { Metadata } from "next";
import { SITE } from "./site";

export const OG_IMAGE = "/brand/og-image.png";
export const TITLE_SUFFIX = "LIFE Spoken English by Mani Sir - Madhurawada, Vizag";

export const HOME_TITLE = "LIFE Spoken English & Soft Skills | Mani Sir - Madhurawada, Visakhapatnam";
export const HOME_DESCRIPTION =
  "Join LIFE Spoken English in Madhurawada, Vizag. Attend 10 full classes 100% free with zero upfront fees. Practical, live speaking practice led personally by Mani Sir for Telugu-medium students, job seekers, and homemakers.";

export const KEYWORDS = [
  "spoken english vizag",
  "spoken english madhurawada",
  "mani sir spoken english",
  "life spoken english",
  "english classes pm palem",
  "spoken english for homemakers vizag",
  "soft skills training visakhapatnam",
];

/** Share images: the 1200x630 card first (large previews), then the official logo and Mani Sir's portrait. */
export const OG_IMAGES = [
  { url: OG_IMAGE, width: 1200, height: 630, alt: "LIFE: Live It For Eternity" },
  { url: "/brand/life-logo.webp", width: 520, height: 537, alt: "LIFE Spoken English official logo" },
  { url: "/media/people/mani-sir-portrait-v2.webp", width: 610, height: 763, alt: "Mani Sir (K. Maneendra Kumar), founder of LIFE" },
];

const social = (title: string, description: string, path?: string) => ({
  openGraph: {
    type: "website" as const,
    locale: "en_IN",
    siteName: SITE.name,
    title,
    description,
    ...(path && { url: path }),
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image" as const,
    title,
    description,
    images: OG_IMAGES.map((i) => i.url),
  },
});

export const rootSocial = social(HOME_TITLE, HOME_DESCRIPTION, "/");

/** Builds complete per-page metadata (page-level openGraph replaces the root one, so repeat shared fields). */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...social(`${title} | ${TITLE_SUFFIX}`, description, path),
  };
}
