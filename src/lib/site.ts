// Live custom domain on Cloudflare; override with NEXT_PUBLIC_SITE_URL if needed.
const DEFAULT_SITE_URL = "https://lifespokenenglish.com";

// Visible copy writes "Mani Sir" with a non-breaking space (\u00A0 in strings, &nbsp; in JSX) so it never wraps
// across lines. Use plainText() for machine-read output (JSON-LD, metadata).
export const plainText = (text: string) => text.replace(/\u00A0/g, " ");

export const SITE = {
  name: "LIFE Spoken English & Soft Skills Training Institute",
  alternateName: "LIFE by Mani Sir",
  brand: "LIFE",
  tagline: "Spoken English & Soft Skills | Mani\u00A0Sir",
  founder: "K. Maneendra Kumar",
  founderAlias: "Mani\u00A0Sir",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || DEFAULT_SITE_URL,
  rating: { value: "5.0", count: 1800, label: "1,800+" },
};

// Single official line for calls, WhatsApp, offline and online batches.
export const PHONES = {
  primary: { display: "+91 73374 12999", e164: "+917337412999", wa: "917337412999" },
} as const;

// Official brand email; also the Grievance / Privacy contact on /privacy and /terms.
export const EMAIL = "lifebymanisir@gmail.com";

export const ADDRESS = {
  building: "Vasu Brothers Nilayam, D.No. 2-158/2",
  street: "Midhilapuri VUDA Colony",
  landmark: "Near Kushi Junction / Naira Petrol Bunk, Opp. PM Palem area",
  locality: "Madhurawada",
  city: "Visakhapatnam",
  region: "Andhra Pradesh",
  postalCode: "530041",
  country: "IN",
} as const;

export const GEO = { latitude: "17.8185", longitude: "83.3532" } as const;

export const TIMINGS = {
  weekdays: "Monday to Friday",
  weekdayDetail: "6:00 AM to 10:00 PM",
  weekend: "Saturday and Sunday",
  weekendDetail: "Reserved for on-demand personal backup sessions",
} as const;

export const VIDEO_ID = "Er5SNUeJwmk";

export const LINKS = {
  youtube: "https://youtube.com/@englishbymanisir",
  instagram: "https://www.instagram.com/english.by.mani.sir",
  googleMaps: "https://www.google.com/maps/search/?api=1&query=Life+Spoken+English",
  mapEmbed:
    "https://www.google.com/maps?q=LIFE+Spoken+English+Madhurawada+Visakhapatnam&output=embed",
  video: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
} as const;

export const NAV_LINKS = [
  { href: "/about", label: "About LIFE" },
  { href: "/#courses", label: "Courses" },
  { href: "/#promises", label: "The 10 Promises" },
  { href: "/#fees", label: "Fees & Trial" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#contact", label: "Location & Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About LIFE & Mani\u00A0Sir" },
  { href: "/about#logo-story", label: "The Story Inside Our Logo" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#courses", label: "Courses" },
  { href: "/#fees", label: "Fees & Free Trial" },
  { href: "/#enroll", label: "Book 10 Free Classes" },
  { href: "/#contact", label: "Location & Contact" },
] as const;

export const DEFAULT_WA_MESSAGE =
  "Hello Mani Sir, I am interested in the 10 Free Trial Classes at LIFE Spoken English. Please share the next batch details.";

export const WHATSAPP_URL = `https://wa.me/${PHONES.primary.wa}`;

export function whatsappLink(text: string = DEFAULT_WA_MESSAGE) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export const telLink = (e164: string = PHONES.primary.e164) => `tel:${e164}`;

export const mailtoLink = (subject?: string) =>
  `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
