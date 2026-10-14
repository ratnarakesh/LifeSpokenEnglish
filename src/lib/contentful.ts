// Contentful Delivery API (CDA) client, used only at build time by scripts/sync-cms.mts.
// Self-contained (npm imports only) so Node can run it directly; never import it from client components.
import { createClient } from "contentful";

export const PHOTO_CATEGORIES = ["Classroom", "Orientation", "Student Success", "Event"] as const;
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
};

export type CmsAnnouncement = { message: string; badgeText: string | null };

export type CmsContent = {
  photos: CmsGalleryItem[];
  announcement: CmsAnnouncement | null;
  founderProfile: CmsFounderProfile | null;
};

const TIMEOUT_MS = 15_000;

export const cmsConfigured = () => Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);

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
  };
}

async function fetchAll(): Promise<CmsContent> {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    timeout: TIMEOUT_MS,
    retryLimit: 2,
  }).withoutUnresolvableLinks;

  const [gallery, announcements, founders] = await Promise.all([
    client.getEntries({ content_type: "galleryItem", include: 1, limit: 200 }),
    client.getEntries({ content_type: "announcement", "fields.isActive": true, order: ["-sys.updatedAt"], limit: 1 }),
    client.getEntries({ content_type: "founderProfile", include: 1, limit: 1 }),
  ]);

  const photos = gallery.items
    .map((e) => toGalleryItem(e as unknown as { sys: { id: string }; fields: Fields }))
    .filter((p): p is CmsGalleryItem => p !== null)
    .sort((a, b) => a.order - b.order || (b.date ?? "").localeCompare(a.date ?? ""));

  const top = announcements.items[0]?.fields as Fields | undefined;
  const message = cleanText(top?.message);
  const announcement = message ? { message, badgeText: cleanText(top?.badgeText) || null } : null;

  const founderProfile = toFounderProfile(founders.items[0] as unknown as { sys: { id: string }; fields: Fields } | undefined);

  return { photos, announcement, founderProfile };
}

/** Returns published CMS content, or null when keys are missing, the API errors, or it does not answer in time. */
export async function fetchCmsContent(): Promise<CmsContent | null> {
  if (!cmsConfigured()) return null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => (timer = setTimeout(() => resolve(null), TIMEOUT_MS + 5_000)));
  try {
    const result = await Promise.race([fetchAll(), timeout]);
    if (!result) console.warn("[cms] Contentful did not answer in time.");
    return result;
  } catch (error) {
    // Log only the error type/status: SDK error messages can echo request details.
    const e = error as { name?: string; status?: number; sys?: { id?: string } };
    console.warn(`[cms] Contentful request failed (${e.name ?? "Error"}${e.status ? ` ${e.status}` : ""}).`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}
