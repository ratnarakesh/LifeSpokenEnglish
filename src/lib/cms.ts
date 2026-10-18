import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ANNOUNCEMENT, MANI_SIR, PHOTOS, type Announcement, type GalleryPhoto } from "./content";
import { brandCopy, courseCopy, faqCopy, heroCopy, testimonialsCopy } from "./site-copy";

export type FounderProfile = {
  name: string;
  title: string;
  bio: string | null;
  portraitSrc: string;
  altText: string;
  width: number;
  height: number;
};

export type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  primaryPhone: string;
  whatsappNumber: string;
  address: string;
  trialTerms: string;
};

export type CourseTrack = {
  id: string;
  title: string;
  trackId: string;
  description: string;
  highlights: string[];
  order: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
};

// Snapshot written by scripts/sync-cms.mts before `next build`. Git-ignored; absent means "use local content".
type Snapshot = {
  syncedAt: string;
  photos: GalleryPhoto[];
  announcement: Announcement | null;
  founderProfile: FounderProfile | null;
  siteSettings: SiteSettings | null;
  courseTracks: CourseTrack[] | null;
  faqItems: FaqItem[] | null;
  testimonials: TestimonialItem[] | null;
};

const DEFAULT_FOUNDER_PROFILE: FounderProfile = {
  name: MANI_SIR.name,
  title: MANI_SIR.role,
  bio: MANI_SIR.lede,
  portraitSrc: "/media/people/mani-sir-portrait-v2.webp",
  altText: `${MANI_SIR.alias} (${MANI_SIR.name}) in the LIFE classroom`,
  width: 610,
  height: 763,
};

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroTitle: heroCopy.headlineFull,
  heroSubtitle: heroCopy.subheadline,
  primaryPhone: brandCopy.phones.primary.display,
  whatsappNumber: brandCopy.phones.primary.display,
  address: brandCopy.address.full,
  trialTerms:
    "10 full live classes completely free with zero advance payment. Stop at any time during the trial. ₹3,000 for the first month, then ₹2,000 per month.",
};

const DEFAULT_COURSE_TRACKS: CourseTrack[] = courseCopy.tracks.map((t, idx) => ({
  id: `life-course-${t.id}`,
  title: t.name,
  trackId: t.id,
  description: t.tagline,
  highlights: t.focus,
  order: idx + 1,
}));

const DEFAULT_FAQ_ITEMS: FaqItem[] = faqCopy.items.map((f, idx) => ({
  id: `life-faq-${idx + 1}`,
  question: f.question,
  answer: f.answer,
  category: f.category,
  order: idx + 1,
}));

const DEFAULT_TESTIMONIALS: TestimonialItem[] = testimonialsCopy.items.map((t, idx) => ({
  id: `life-testimonial-${idx + 1}`,
  name: t.name,
  role: t.role,
  quote: t.quote,
  rating: 5,
  order: idx + 1,
}));

function readSnapshot(): Snapshot | null {
  const file = path.join(process.cwd(), "src/lib/cms.generated.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Snapshot;
  } catch {
    return null;
  }
}

/** Gallery photos and videos from Contentful, or the local fallback when the CMS is unavailable. */
export function getGalleryPhotos(): GalleryPhoto[] {
  const photos = readSnapshot()?.photos;
  return photos?.length ? photos : PHOTOS;
}

/** The active Contentful announcement, or the local default banner when none is available. */
export function getAnnouncement(): Announcement {
  return readSnapshot()?.announcement ?? ANNOUNCEMENT;
}

/** Mani Sir's official profile and portrait from Contentful, or the local fallback. */
export function getFounderProfile(): FounderProfile {
  return readSnapshot()?.founderProfile ?? DEFAULT_FOUNDER_PROFILE;
}

/** Global site settings from Contentful, or the local fallback when CMS is unavailable. */
export function getSiteSettings(): SiteSettings {
  return readSnapshot()?.siteSettings ?? DEFAULT_SITE_SETTINGS;
}

/** Course tracks from Contentful, or the local fallback when CMS is unavailable. */
export function getCourseTracks(): CourseTrack[] {
  const tracks = readSnapshot()?.courseTracks;
  return tracks?.length ? tracks : DEFAULT_COURSE_TRACKS;
}

/** FAQ items from Contentful, or the local fallback when CMS is unavailable. */
export function getFaqItems(): FaqItem[] {
  const items = readSnapshot()?.faqItems;
  return items?.length ? items : DEFAULT_FAQ_ITEMS;
}

/** Testimonials from Contentful, or the local fallback when CMS is unavailable. */
export function getTestimonials(): TestimonialItem[] {
  const items = readSnapshot()?.testimonials;
  return items?.length ? items : DEFAULT_TESTIMONIALS;
}
