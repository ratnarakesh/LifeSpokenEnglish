export const SITE = {
  name: "LIFE Spoken English & Soft Skills Training Institute",
  brand: "LIFE",
  tagline: "Spoken English & Soft Skills | Mani Sir",
  founder: "K. Maneendra Kumar",
  founderAlias: "Mani Sir",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined,
  rating: { value: "5.0", count: 1800, label: "1,800+" },
};

export const PHONES = {
  primary: { display: "+91 73374 12999", e164: "+917337412999", wa: "917337412999" },
  online: { display: "+91 90590 56833", e164: "+919059056833", wa: "919059056833" },
} as const;

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

export const TIMINGS = {
  weekdays: "Monday to Friday",
  weekdayDetail: "Morning & Evening Batches (e.g. 8:00 PM – 9:30 PM)",
  saturday: "Saturdays reserved for backup / extra sessions",
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
  { href: "#why", label: "Why LIFE" },
  { href: "#courses", label: "Courses" },
  { href: "#promises", label: "The 10 Promises" },
  { href: "#fees", label: "Fees & Trial" },
  { href: "#video", label: "Video Tour" },
  { href: "#contact", label: "Location & Contact" },
] as const;

export const DEFAULT_WA_MESSAGE =
  "Hello Mani Sir, I am interested in the 10 Free Trial Classes at LIFE Spoken English. Please share the next batch details.";

export function whatsappLink(text: string = DEFAULT_WA_MESSAGE, phone: string = PHONES.primary.wa) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export const telLink = (e164: string = PHONES.primary.e164) => `tel:${e164}`;
