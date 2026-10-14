import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ANNOUNCEMENT, MANI_SIR, PHOTOS, type Announcement, type GalleryPhoto } from "./content";

export type FounderProfile = {
  name: string;
  title: string;
  bio: string | null;
  portraitSrc: string;
  altText: string;
  width: number;
  height: number;
};

// Snapshot written by scripts/sync-cms.mts before `next build`. Git-ignored; absent means "use local content".
type Snapshot = {
  syncedAt: string;
  photos: GalleryPhoto[];
  announcement: Announcement | null;
  founderProfile: FounderProfile | null;
};

const DEFAULT_FOUNDER_PROFILE: FounderProfile = {
  name: MANI_SIR.name,
  title: MANI_SIR.role,
  bio: MANI_SIR.lede,
  portraitSrc: "/media/people/mani-sir-portrait.webp",
  altText: `${MANI_SIR.alias} (${MANI_SIR.name}) in the LIFE classroom`,
  width: 611,
  height: 764,
};

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
