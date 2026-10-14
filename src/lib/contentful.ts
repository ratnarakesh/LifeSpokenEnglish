// Contentful Delivery API (CDA) client, used only at build time by scripts/sync-cms.mts.
// Self-contained (npm imports only) so Node can run it directly; never import it from client components.
import { createClient } from "contentful";

export const PHOTO_CATEGORIES = ["Classroom", "Orientation", "Student Success", "Event"] as const;
export type PhotoCategory = (typeof PHOTO_CATEGORIES)[number];

export type CmsPhoto = {
  id: string;
  title: string;
  category: PhotoCategory;
  alt: string;
  /** Absolute https URL of the original asset on images.ctfassets.net (downloaded and self-hosted at build). */
  assetUrl: string;
  width: number;
  height: number;
  date: string | null;
  order: number;
};

export type CmsAnnouncement = { message: string; badgeText: string | null };
export type CmsContent = { photos: CmsPhoto[]; announcement: CmsAnnouncement | null };

const TIMEOUT_MS = 15_000;

export const cmsConfigured = () => Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);

/** House style for editor-typed copy: no em/en dashes, and "Mani Sir" never wraps across lines. */
export const cleanText = (text: unknown) =>
  String(text ?? "")
    .replace(/\s*[\u2013\u2014]\s*/g, " - ")
    .replace(/Mani\s+Sir/g, "Mani\u00A0Sir")
    .trim();

type Fields = Record<string, unknown>;
type AssetLike = { fields?: { title?: unknown; description?: unknown; file?: { url?: string; contentType?: string; details?: { image?: { width?: number; height?: number } } } } };

function toPhoto(entry: { sys: { id: string }; fields: Fields }): CmsPhoto | null {
  const f = entry.fields;
  const asset = f.image as AssetLike | undefined;
  const file = asset?.fields?.file;
  const size = file?.details?.image;
  const title = cleanText(f.title);
  if (!title || !file?.url || !file.contentType?.startsWith("image/") || !size?.width || !size.height) return null;
  const category = PHOTO_CATEGORIES.find((c) => c === f.category) ?? "Classroom";
  return {
    id: entry.sys.id,
    title,
    category,
    alt: cleanText(asset?.fields?.description) || title,
    assetUrl: file.url.startsWith("//") ? `https:${file.url}` : file.url,
    width: size.width,
    height: size.height,
    date: typeof f.date === "string" ? f.date : null,
    order: typeof f.order === "number" ? f.order : Number.MAX_SAFE_INTEGER,
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

  const [gallery, announcements] = await Promise.all([
    client.getEntries({ content_type: "galleryItem", include: 1, limit: 200 }),
    client.getEntries({ content_type: "announcement", "fields.isActive": true, order: ["-sys.updatedAt"], limit: 1 }),
  ]);

  const photos = gallery.items
    .map((e) => toPhoto(e as unknown as { sys: { id: string }; fields: Fields }))
    .filter((p): p is CmsPhoto => p !== null)
    .sort((a, b) => a.order - b.order || (b.date ?? "").localeCompare(a.date ?? ""));

  const top = announcements.items[0]?.fields as Fields | undefined;
  const message = cleanText(top?.message);
  return { photos, announcement: message ? { message, badgeText: cleanText(top?.badgeText) || null } : null };
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
