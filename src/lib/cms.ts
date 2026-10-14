import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ANNOUNCEMENT, PHOTOS, type Announcement, type GalleryPhoto } from "./content";

// Snapshot written by scripts/sync-cms.ts before `next build`. Git-ignored; absent means "use local content".
type Snapshot = { syncedAt: string; photos: GalleryPhoto[]; announcement: Announcement | null };

function readSnapshot(): Snapshot | null {
  const file = path.join(process.cwd(), "src/lib/cms.generated.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Snapshot;
  } catch {
    return null;
  }
}

/** Gallery photos from Contentful, or the local list when the CMS is unavailable or has no published photos. */
export function getGalleryPhotos(): GalleryPhoto[] {
  const photos = readSnapshot()?.photos;
  return photos?.length ? photos : PHOTOS;
}

/** The active Contentful announcement, or the local default banner when none is available. */
export function getAnnouncement(): Announcement {
  return readSnapshot()?.announcement ?? ANNOUNCEMENT;
}
