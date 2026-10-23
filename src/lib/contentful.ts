// Contentful Delivery API (CDA) client, used only at build time by scripts/sync-cms.mts.
// Self-contained (npm imports only) so Node can run it directly; never import it from client components.
import { createClient } from "contentful";

export const PHOTO_CATEGORIES = ["Classroom", "Lessons", "Orientation", "Student Success", "Event"] as const;
export type PhotoCategory = (typeof PHOTO_CATEGORIES)[number];

export type CmsMediaType = "Photo" | "Video";

export type CmsGalleryItem = {
  id: string;
  title: string;
  category: PhotoCategory;
  mediaType: CmsMediaType;
  alt: string;
  /** Absolute https URL of the asset image, or null for YouTube video fallback. */
  assetUrl: string | null;
  /** Extracted YouTube video ID if mediaType is 'Video' or youtubeUrl is given. */
  youtubeId: string | null;
  youtubeUrl: string | null;
  width: number;
  height: number;
  date: string | null;
  order: number;
};

// Backward-compatible alias for existing imports
export type CmsPhoto = CmsGalleryItem;

export type CmsFounderProfile = {
  name: string;
  title: string;
  bio: string | null;
  portraitUrl: string;
  altText: string;
  width: number;
  height: number;
  storyHeadline?: string | null;
  spiritOfLifeTitle?: string | null;
  spiritOfLifeContent?: string | null;
  journeyMilestones?: string | null;
  teachingPhilosophy?: string | null;
};

export type CmsAnnouncement = { message: string; badgeText: string | null };

export type CmsSiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  primaryPhone: string;
  whatsappNumber: string;
  address: string;
  trialTerms: string;
  promises?: string[];
  workingHours?: string;
  batchTimings?: string;
  logoStory?: string;
  logoStoryEagle?: string;
  lifeAcronymL?: string;
  lifeAcronymI?: string;
  lifeAcronymF?: string;
  lifeAcronymE?: string;
};

export type CmsLegalDocument = {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  content: string;
};

export type CmsCourseTrack = {
  id: string;
  title: string;
  trackId: string;
  description: string;
  highlights: string[];
  order: number;
};

export type CmsFaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export type CmsTestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
};

export type CmsContent = {
  photos: CmsGalleryItem[];
  announcement: CmsAnnouncement | null;
  founderProfile: CmsFounderProfile | null;
  siteSettings: CmsSiteSettings | null;
  courseTracks: CmsCourseTrack[];
  faqItems: CmsFaqItem[];
  testimonials: CmsTestimonialItem[];
  legalDocuments: CmsLegalDocument[];
};

const TIMEOUT_MS = 15_000;

export const cmsConfigured = () =>
  Boolean(
    process.env.CONTENTFUL_SPACE_ID &&
      (process.env.CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_MANAGEMENT_TOKEN),
  );

/** House style for editor-typed copy: no em/en dashes, and "Mani Sir" never wraps across lines. */
export const cleanText = (text: unknown) =>
  String(text ?? "")
    .replace(/\s*[\u2013\u2014]\s*/g, " - ")
    .replace(/Mani\s+Sir/g, "Mani\u00A0Sir")
    .trim();

export function extractYouTubeId(urlOrId: unknown): string | null {
  if (!urlOrId || typeof urlOrId !== "string") return null;
  const s = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const match = s.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

type Fields = Record<string, unknown>;
type AssetLike = { fields?: { title?: unknown; description?: unknown; file?: { url?: string; contentType?: string; details?: { image?: { width?: number; height?: number } } } } };

function toGalleryItem(entry: { sys: { id: string }; fields: Fields }): CmsGalleryItem | null {
  const f = entry.fields;
  const title = cleanText(f.title);
  if (!title) return null;

  const category = PHOTO_CATEGORIES.find((c) => c === f.category) ?? "Classroom";
  const mediaType: CmsMediaType = f.mediaType === "Video" ? "Video" : "Photo";
  const youtubeUrl = typeof f.youtubeUrl === "string" ? f.youtubeUrl.trim() : null;
  const youtubeId = extractYouTubeId(youtubeUrl);

  const asset = f.image as AssetLike | undefined;
  const file = asset?.fields?.file;
  const size = file?.details?.image;

  let assetUrl: string | null = null;
  let width = 1280;
  let height = 720;

  if (file?.url && file.contentType?.startsWith("image/")) {
    assetUrl = file.url.startsWith("//") ? `https:${file.url}` : file.url;
    if (size?.width && size?.height) {
      width = size.width;
      height = size.height;
    }
  }

  // If Photo, it must have an asset image. If Video without an asset image, it must have a youtubeId.
  if (mediaType === "Photo" && !assetUrl) return null;
  if (mediaType === "Video" && !assetUrl && !youtubeId) return null;

  return {
    id: entry.sys.id,
    title,
    category,
    mediaType,
    alt: cleanText(asset?.fields?.description) || title,
    assetUrl,
    youtubeId,
    youtubeUrl,
    width,
    height,
    date: typeof f.date === "string" ? f.date : null,
    order: typeof f.order === "number" ? f.order : Number.MAX_SAFE_INTEGER,
  };
}

function toFounderProfile(entry: { sys: { id: string }; fields: Fields } | undefined): CmsFounderProfile | null {
  if (!entry) return null;
  const f = entry.fields;
  const asset = f.portraitImage as AssetLike | undefined;
  const file = asset?.fields?.file;
  const size = file?.details?.image;
  if (!file?.url || !size?.width || !size?.height) return null;

  const name = cleanText(f.name) || "Mani\u00A0Sir";
  const title = cleanText(f.title) || "Founder & Chief Mentor";
  const bio = cleanText(f.bio) || null;
  const altText = cleanText(f.altText) || cleanText(asset?.fields?.description) || `${name} - ${title}`;
  const portraitUrl = file.url.startsWith("//") ? `https:${file.url}` : file.url;

  return {
    name,
    title,
    bio,
    portraitUrl,
    altText,
    width: size.width,
    height: size.height,
    storyHeadline: cleanText(f.storyHeadline) || null,
    spiritOfLifeTitle: cleanText(f.spiritOfLifeTitle) || null,
    spiritOfLifeContent: cleanText(f.spiritOfLifeContent) || null,
    journeyMilestones: cleanText(f.journeyMilestones) || null,
    teachingPhilosophy: cleanText(f.teachingPhilosophy) || null,
  };
}

function toSiteSettings(entry: { fields: Fields } | undefined): CmsSiteSettings | null {
  if (!entry?.fields) return null;
  const f = entry.fields;
  const rawPromises = Array.isArray(f.promises)
    ? f.promises.map((p) => cleanText(p)).filter(Boolean)
    : [];
  return {
    heroTitle: cleanText(f.heroTitle),
    heroSubtitle: cleanText(f.heroSubtitle),
    primaryPhone: cleanText(f.primaryPhone),
    whatsappNumber: cleanText(f.whatsappNumber),
    address: cleanText(f.address),
    trialTerms: cleanText(f.trialTerms),
    promises: rawPromises.length ? rawPromises : undefined,
    workingHours: cleanText(f.workingHours) || undefined,
    batchTimings: cleanText(f.batchTimings) || undefined,
    logoStory: cleanText(f.logoStory) || undefined,
    logoStoryEagle: cleanText(f.logoStoryEagle) || undefined,
    lifeAcronymL: cleanText(f.lifeAcronymL) || undefined,
    lifeAcronymI: cleanText(f.lifeAcronymI) || undefined,
    lifeAcronymF: cleanText(f.lifeAcronymF) || undefined,
    lifeAcronymE: cleanText(f.lifeAcronymE) || undefined,
  };
}

function toLegalDocument(entry: { sys: { id: string }; fields: Fields }): CmsLegalDocument | null {
  const f = entry.fields;
  const slug = cleanText(f.slug);
  const title = cleanText(f.title);
  if (!slug || !title) return null;
  return {
    id: entry.sys.id,
    slug,
    title,
    lastUpdated: cleanText(f.lastUpdated) || "11 October 2026",
    content: cleanText(f.content),
  };
}

function toCourseTrack(entry: { sys: { id: string }; fields: Fields }): CmsCourseTrack | null {
  const f = entry.fields;
  const title = cleanText(f.title);
  const trackId = cleanText(f.trackId);
  if (!title || !trackId) return null;
  const highlights = Array.isArray(f.highlights)
    ? f.highlights.map((h) => cleanText(h)).filter(Boolean)
    : [];
  return {
    id: entry.sys.id,
    title,
    trackId,
    description: cleanText(f.description),
    highlights,
    order: typeof f.order === "number" ? f.order : 0,
  };
}

function toFaqItem(entry: { sys: { id: string }; fields: Fields }): CmsFaqItem | null {
  const f = entry.fields;
  const question = cleanText(f.question);
  const answer = cleanText(f.answer);
  if (!question || !answer) return null;
  return {
    id: entry.sys.id,
    question,
    answer,
    category: cleanText(f.category) || "General",
    order: typeof f.order === "number" ? f.order : 0,
  };
}

function toTestimonialItem(entry: { sys: { id: string }; fields: Fields }): CmsTestimonialItem | null {
  const f = entry.fields;
  const name = cleanText(f.name);
  const quote = cleanText(f.quote);
  if (!name || !quote) return null;
  return {
    id: entry.sys.id,
    name,
    role: cleanText(f.role),
    quote,
    rating: typeof f.rating === "number" ? f.rating : 5,
    order: typeof f.order === "number" ? f.order : 0,
  };
}

function normalizeCmaFields(fields: unknown): Fields {
  const out: Fields = {};
  if (!fields || typeof fields !== "object") return out;
  for (const [k, v] of Object.entries(fields as Record<string, unknown>)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const loc = Object.keys(v)[0];
      out[k] = loc ? (v as Record<string, unknown>)[loc] : undefined;
    } else {
      out[k] = v;
    }
  }
  return out;
}

async function fetchAllViaCda(): Promise<CmsContent> {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    timeout: TIMEOUT_MS,
    retryLimit: 2,
  }).withoutUnresolvableLinks;

  const [gallery, announcements, founders, settings, courses, faqs, testimonials, legalDocs] = await Promise.all([
    client.getEntries({ content_type: "galleryItem", include: 1, limit: 200 }),
    client.getEntries({ content_type: "announcement", "fields.isActive": true, order: ["-sys.updatedAt"], limit: 1 }),
    client.getEntries({ content_type: "founderProfile", include: 1, limit: 5 }),
    client.getEntries({ content_type: "siteSettings", limit: 1 }),
    client.getEntries({ content_type: "courseTrack", order: ["fields.order"], limit: 20 }),
    client.getEntries({ content_type: "faqItem", order: ["fields.order"], limit: 50 }),
    client.getEntries({ content_type: "testimonialItem", order: ["fields.order"], limit: 50 }),
    client.getEntries({ content_type: "legalDocument", limit: 10 }).catch(() => ({ items: [] })),
  ]);

  const photos = gallery.items
    .map((e) => toGalleryItem(e as unknown as { sys: { id: string }; fields: Fields }))
    .filter((p): p is CmsGalleryItem => p !== null)
    .sort((a, b) => a.order - b.order || (b.date ?? "").localeCompare(a.date ?? ""));

  const top = announcements.items[0]?.fields as Fields | undefined;
  const message = cleanText(top?.message);
  const announcement = message ? { message, badgeText: cleanText(top?.badgeText) || null } : null;

  const founderItem = founders.items.find(
    (it) => ((it as unknown as { fields: Fields }).fields?.portraitImage as AssetLike | undefined)?.fields?.file?.url,
  ) ?? founders.items[0];
  const founderProfile = toFounderProfile(founderItem as unknown as { sys: { id: string }; fields: Fields } | undefined);

  const siteSettings = toSiteSettings(settings.items[0] as unknown as { fields: Fields } | undefined);

  const courseTracks = courses.items
    .map((e) => toCourseTrack(e as unknown as { sys: { id: string }; fields: Fields }))
    .filter((c): c is CmsCourseTrack => c !== null)
    .sort((a, b) => a.order - b.order);

  const faqItems = faqs.items
    .map((e) => toFaqItem(e as unknown as { sys: { id: string }; fields: Fields }))
    .filter((f): f is CmsFaqItem => f !== null)
    .sort((a, b) => a.order - b.order);

  const testimonialList = testimonials.items
    .map((e) => toTestimonialItem(e as unknown as { sys: { id: string }; fields: Fields }))
    .filter((t): t is CmsTestimonialItem => t !== null)
    .sort((a, b) => a.order - b.order);

  const legalDocuments = legalDocs.items
    .map((e) => toLegalDocument(e as unknown as { sys: { id: string }; fields: Fields }))
    .filter((l): l is CmsLegalDocument => l !== null);

  return {
    photos,
    announcement,
    founderProfile,
    siteSettings,
    courseTracks,
    faqItems,
    testimonials: testimonialList,
    legalDocuments,
  };
}

async function fetchAllViaCma(): Promise<CmsContent> {
  const space = process.env.CONTENTFUL_SPACE_ID!;
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
  const env = process.env.CONTENTFUL_ENVIRONMENT || "master";
  const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/vnd.contentful.management.v1+json",
  };

  const [assetsRes, galleryRes, annRes, foundersRes, settingsRes, coursesRes, faqsRes, testsRes, legalRes] =
    await Promise.all([
      fetch(`${base}/assets?limit=100`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=galleryItem&limit=100`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=announcement&order=-sys.updatedAt&limit=1`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=founderProfile&limit=5`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=siteSettings&limit=1`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=courseTrack&order=fields.order&limit=20`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=faqItem&order=fields.order&limit=50`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=testimonialItem&order=fields.order&limit=50`, { headers }).then((r) => r.json()),
      fetch(`${base}/entries?content_type=legalDocument&limit=10`, { headers }).then((r) => r.json()).catch(() => ({ items: [] })),
    ]);

  const assetMap = new Map<string, AssetLike>();
  const assetItems = (assetsRes as { items?: Array<{ sys: { id: string }; fields: Record<string, unknown> }> })?.items ?? [];
  for (const a of assetItems) {
    const norm = normalizeCmaFields(a.fields);
    assetMap.set(a.sys.id, { fields: norm });
  }

  const galleryItems = (galleryRes as { items?: Array<{ sys: { id: string }; fields: Record<string, unknown> }> })?.items ?? [];
  const photos = galleryItems
    .map((e) => {
      const norm = normalizeCmaFields(e.fields);
      const imgLink = norm.image as { sys?: { id?: string } } | undefined;
      const linkedAsset = imgLink?.sys?.id ? assetMap.get(imgLink.sys.id) : undefined;
      return toGalleryItem({ sys: e.sys, fields: { ...norm, image: linkedAsset } });
    })
    .filter((p): p is CmsGalleryItem => p !== null)
    .sort((a, b) => a.order - b.order);

  const annItems = (annRes as { items?: Array<{ fields: Record<string, unknown> }> })?.items ?? [];
  const topAnn = annItems[0] ? normalizeCmaFields(annItems[0].fields) : undefined;
  const message = cleanText(topAnn?.message);
  const announcement = message ? { message, badgeText: cleanText(topAnn?.badgeText) || null } : null;

  const founderItems = (foundersRes as { items?: Array<{ sys: { id: string }; fields: Record<string, unknown> }> })?.items ?? [];
  const normFounders = founderItems.map((e) => {
    const norm = normalizeCmaFields(e.fields);
    const pLink = norm.portraitImage as { sys?: { id?: string } } | undefined;
    const linkedAsset = pLink?.sys?.id ? assetMap.get(pLink.sys.id) : undefined;
    return { sys: e.sys, fields: { ...norm, portraitImage: linkedAsset } };
  });
  const bestFounder = normFounders.find((f) => (f.fields.portraitImage as AssetLike | undefined)?.fields?.file) ?? normFounders[0];
  const founderProfile = toFounderProfile(bestFounder);

  const settingItems = (settingsRes as { items?: Array<{ fields: Record<string, unknown> }> })?.items ?? [];
  const siteSettings = settingItems[0] ? toSiteSettings({ fields: normalizeCmaFields(settingItems[0].fields) }) : null;

  const courseItems = (coursesRes as { items?: Array<{ sys: { id: string }; fields: Record<string, unknown> }> })?.items ?? [];
  const courseTracks = courseItems
    .map((e) => toCourseTrack({ sys: e.sys, fields: normalizeCmaFields(e.fields) }))
    .filter((c): c is CmsCourseTrack => c !== null)
    .sort((a, b) => a.order - b.order);

  const faqItemsRaw = (faqsRes as { items?: Array<{ sys: { id: string }; fields: Record<string, unknown> }> })?.items ?? [];
  const faqItems = faqItemsRaw
    .map((e) => toFaqItem({ sys: e.sys, fields: normalizeCmaFields(e.fields) }))
    .filter((f): f is CmsFaqItem => f !== null)
    .sort((a, b) => a.order - b.order);

  const testItemsRaw = (testsRes as { items?: Array<{ sys: { id: string }; fields: Record<string, unknown> }> })?.items ?? [];
  const testimonials = testItemsRaw
    .map((e) => toTestimonialItem({ sys: e.sys, fields: normalizeCmaFields(e.fields) }))
    .filter((t): t is CmsTestimonialItem => t !== null)
    .sort((a, b) => a.order - b.order);

  const legalItemsRaw = (legalRes as { items?: Array<{ sys: { id: string }; fields: Record<string, unknown> }> })?.items ?? [];
  const legalDocuments = legalItemsRaw
    .map((e) => toLegalDocument({ sys: e.sys, fields: normalizeCmaFields(e.fields) }))
    .filter((l): l is CmsLegalDocument => l !== null);

  return {
    photos,
    announcement,
    founderProfile,
    siteSettings,
    courseTracks,
    faqItems,
    testimonials,
    legalDocuments,
  };
}

/** Returns published CMS content, or null when keys are missing, the API errors, or it does not answer in time. */
export async function fetchCmsContent(): Promise<CmsContent | null> {
  if (!cmsConfigured()) return null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => (timer = setTimeout(() => resolve(null), TIMEOUT_MS + 5_000)));
  try {
    const fetchFn = async () => {
      if (process.env.CONTENTFUL_ACCESS_TOKEN) {
        try {
          console.log("[cms] Fetching via Contentful Delivery API (CDA)...");
          return await fetchAllViaCda();
        } catch (e) {
          console.warn("[cms] CDA attempt failed, checking CMA fallback...", e);
        }
      }
      if (process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
        console.log("[cms] Fetching via Contentful Management API (CMA)...");
        return await fetchAllViaCma();
      }
      return null;
    };
    const result = await Promise.race([fetchFn(), timeout]);
    if (!result) console.warn("[cms] Contentful did not answer in time.");
    return result;
  } catch (error) {
    const e = error as { name?: string; status?: number; sys?: { id?: string } };
    console.warn(`[cms] Contentful request failed (${e.name ?? "Error"}${e.status ? ` ${e.status}` : ""}).`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}
