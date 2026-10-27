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

export const EXTENDED_KEYWORDS = [
  ...KEYWORDS,
  "best spoken english classes in visakhapatnam",
  "spoken english in vizag",
  "spoken english classes in vizag with fees",
  "english coaching midhilapuri vuda colony",
  "spoken english near me vizag",
  "spoken english institute madhurawada",
  "spoken english for telugu medium students",
  "telugu to english spoken english classes",
  "spoken english for software engineers",
  "interview preparation english coaching vizag",
  "stage fear removal english speaking",
  "10 days free demo spoken english",
  "free trial spoken english classes vizag",
  "online spoken english classes in telugu",
  "k maneendra kumar english",
];

/** Share images: the 1200x630 card first (large previews), then the official logo and Mani Sir's portrait. */
export const OG_IMAGES = [
  { url: OG_IMAGE, width: 1200, height: 630, alt: "LIFE: Live It For Eternity" },
  { url: "/brand/life-logo.webp", width: 520, height: 537, alt: "LIFE Spoken English official logo" },
  { url: "/media/people/mani-sir-portrait-v2.webp", width: 767, height: 959, alt: "Mani Sir (K. Maneendra Kumar), founder of LIFE" },
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
export function pageMetadata({
  title,
  description,
  path,
  keywords = KEYWORDS,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    authors: [{ name: "Mani Sir (K. Maneendra Kumar)" }],
    creator: "K. Maneendra Kumar",
    publisher: "LIFE Spoken English & Soft Skills Training Institute",
    alternates: { canonical: path },
    other: {
      "geo.region": "IN-AP",
      "geo.placename": "Madhurawada, Visakhapatnam",
      "geo.position": "17.8185;83.3532",
      ICBM: "17.8185, 83.3532",
    },
    ...social(`${title} | ${TITLE_SUFFIX}`, description, path),
  };
}
