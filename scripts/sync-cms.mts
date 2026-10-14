// Build-time Contentful sync (runs automatically before `npm run build`).
// Fetches published gallery items and the active announcement, downloads every photo as an optimised
// WebP into public/media/cms/ (so visitors never contact a third party), and writes a snapshot to
// src/lib/cms.generated.json. If keys are missing, CMS_SYNC=off, or Contentful fails or times out, it
// removes the snapshot so the site falls back to local content in src/lib/content.ts. Never fails the build.
import { mkdir, rm, writeFile } from "node:fs/promises";
import { fetchCmsContent, type CmsPhoto } from "../src/lib/contentful.ts";

const IMAGE_DIR = "public/media/cms";
const SNAPSHOT = "src/lib/cms.generated.json";
const MAX_WIDTH = 1600;

async function fallbackToLocal(reason: string) {
  await rm(SNAPSHOT, { force: true });
  await rm(IMAGE_DIR, { recursive: true, force: true });
  console.log(`[cms] ${reason} Using local content from src/lib/content.ts.`);
}

async function download(photo: CmsPhoto) {
  const width = Math.min(photo.width, MAX_WIDTH);
  const height = Math.round((photo.height * width) / photo.width);
  const res = await fetch(`${photo.assetUrl}?fm=webp&q=78&w=${width}`, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`image ${photo.id} returned ${res.status}`);
  const file = `${photo.id}.webp`;
  await writeFile(`${IMAGE_DIR}/${file}`, Buffer.from(await res.arrayBuffer()));
  return {
    id: photo.id,
    src: `/media/cms/${file}`,
    width,
    height,
    alt: photo.alt,
    caption: photo.title,
    category: photo.category,
  };
}

async function main() {
  if (process.env.CMS_SYNC === "off") return fallbackToLocal("CMS sync disabled (CMS_SYNC=off).");
  const content = await fetchCmsContent();
  if (!content) return fallbackToLocal("Contentful not configured or unavailable.");

  await rm(IMAGE_DIR, { recursive: true, force: true });
  await mkdir(IMAGE_DIR, { recursive: true });
  const photos = await Promise.all(content.photos.map(download));
  await writeFile(
    SNAPSHOT,
    `${JSON.stringify({ syncedAt: new Date().toISOString(), photos, announcement: content.announcement }, null, 2)}\n`,
  );
  console.log(`[cms] Synced ${photos.length} gallery photo(s); announcement: ${content.announcement ? "active" : "none"}.`);
}

main().catch((error: Error) => fallbackToLocal(`Sync failed (${error.message}).`));
