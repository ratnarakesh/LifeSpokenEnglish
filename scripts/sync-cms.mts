// Build-time Contentful sync (runs automatically before `npm run build`).
// Fetches published gallery items (photos and videos), the active announcement, and the founder profile.
// Downloads every asset into public/media/cms/ as optimised WebP (or YouTube thumbnail as WebP for videos),
// prunes any orphaned files not present in the current sync, and writes a snapshot to src/lib/cms.generated.json.
// If keys are missing, CMS_SYNC=off, or Contentful fails/times out, it removes the snapshot so the site
// falls back to local content in src/lib/content.ts. Never fails the build.
import { mkdir, readdir, rm, unlink, writeFile } from "node:fs/promises";
import {
  fetchCmsContent,
  type CmsFounderProfile,
  type CmsGalleryItem,
} from "../src/lib/contentful.ts";

const IMAGE_DIR = "public/media/cms";
const SNAPSHOT = "src/lib/cms.generated.json";
const MAX_WIDTH = 1600;

async function writeBuildDiagnostic(status: string, details?: Record<string, unknown>) {
  try {
    const diag = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      hasSpaceId: Boolean(process.env.CONTENTFUL_SPACE_ID),
      hasAccessToken: Boolean(process.env.CONTENTFUL_ACCESS_TOKEN),
      hasManagementToken: Boolean(process.env.CONTENTFUL_MANAGEMENT_TOKEN),
      status,
      ...details,
    };
    await writeFile("public/cms-build-status.json", JSON.stringify(diag, null, 2));
  } catch {
    // Ignore error writing diagnostic
  }
}

async function fallbackToLocal(reason: string) {
  await rm(SNAPSHOT, { force: true });
  await rm(IMAGE_DIR, { recursive: true, force: true });
  await writeBuildDiagnostic("fallback", { reason });
  console.log(`[cms] ${reason} Using local content from src/lib/content.ts.`);
}

async function downloadAsset(url: string, filename: string, targetWidth?: number) {
  const widthParam = targetWidth ? `&w=${Math.min(targetWidth, MAX_WIDTH)}` : `&w=${MAX_WIDTH}`;
  const res = await fetch(`${url}?fm=webp&q=78${widthParam}`, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`Asset download failed (${res.status}) from ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(`${IMAGE_DIR}/${filename}`, buffer);
}

async function downloadYouTubeThumbnail(youtubeId: string, filename: string) {
  // Try maxresdefault first, then hqdefault
  let res = await fetch(`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) {
    res = await fetch(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`, { signal: AbortSignal.timeout(15_000) });
  }
  if (!res.ok) throw new Error(`YouTube thumbnail failed for ${youtubeId}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  // Save as WebP extension (browsers handle JPEG/WebP streams transparently when decoded via Image)
  await writeFile(`${IMAGE_DIR}/${filename}`, buffer);
}

function getAssetHash(url: string | null | undefined): string {
  if (!url) return "v2";
  const match = url.match(/\/([a-f0-9]{16,40})\//i);
  return match ? match[1].slice(0, 8) : "v2";
}

async function syncGalleryItem(item: CmsGalleryItem): Promise<{
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: CmsGalleryItem["category"];
  mediaType: CmsGalleryItem["mediaType"];
  youtubeId?: string | null;
  youtubeUrl?: string | null;
  file: string;
  legacyFile: string;
}> {
  const hash = getAssetHash(item.assetUrl);
  const file = `${item.id}-${hash}.webp`;
  const legacyFile = `${item.id}-v2.webp`;
  const width = Math.min(item.width, MAX_WIDTH);
  const height = Math.round((item.height * width) / item.width);

  if (item.assetUrl) {
    await downloadAsset(item.assetUrl, file, width);
    if (file !== legacyFile) {
      await downloadAsset(item.assetUrl, legacyFile, width);
    }
  } else if (item.youtubeId) {
    await downloadYouTubeThumbnail(item.youtubeId, file);
    if (file !== legacyFile) {
      await downloadYouTubeThumbnail(item.youtubeId, legacyFile);
    }
  } else {
    throw new Error(`Item ${item.id} has neither assetUrl nor youtubeId`);
  }

  return {
    id: item.id,
    src: `/media/cms/${file}`,
    width,
    height,
    alt: item.alt,
    caption: item.title,
    category: item.category,
    mediaType: item.mediaType,
    youtubeId: item.youtubeId,
    youtubeUrl: item.youtubeUrl,
    file,
    legacyFile,
  };
}

async function syncFounderProfile(profile: CmsFounderProfile | null): Promise<{
  name: string;
  title: string;
  bio: string | null;
  portraitSrc: string;
  altText: string;
  width: number;
  height: number;
  file?: string;
  legacyFile?: string;
} | null> {
  if (!profile) return null;
  const hash = getAssetHash(profile.portraitUrl);
  const file = `mani-sir-portrait-${hash}.webp`;
  const legacyFile = "mani-sir-portrait-v2.webp";
  const width = Math.min(profile.width, 1200);
  const height = Math.round((profile.height * width) / profile.width);
  await downloadAsset(profile.portraitUrl, file, width);
  if (file !== legacyFile) {
    await downloadAsset(profile.portraitUrl, legacyFile, width);
  }

  return {
    name: profile.name,
    title: profile.title,
    bio: profile.bio,
    portraitSrc: `/media/cms/${file}`,
    altText: profile.altText,
    width,
    height,
    file,
    legacyFile,
  };
}

async function pruneOrphanedFiles(activeFiles: Set<string>) {
  try {
    const entries = await readdir(IMAGE_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && !activeFiles.has(entry.name)) {
        await unlink(`${IMAGE_DIR}/${entry.name}`);
        console.log(`[cms] Pruned orphaned asset: ${entry.name}`);
      }
    }
  } catch {
    // If directory doesn't exist, nothing to prune
  }
}

async function main() {
  if (process.env.CMS_SYNC === "off") return fallbackToLocal("CMS sync disabled (CMS_SYNC=off).");
  const content = await fetchCmsContent();
  if (!content) return fallbackToLocal("Contentful not configured or unavailable.");

  await mkdir(IMAGE_DIR, { recursive: true });

  const activeFiles = new Set<string>();

  // Sync gallery items (photos and videos)
  const galleryItems = await Promise.all(
    content.photos.map(async (item) => {
      const synced = await syncGalleryItem(item);
      activeFiles.add(synced.file);
      activeFiles.add(synced.legacyFile);
      return synced;
    }),
  );

  // Sync founder profile
  const founder = await syncFounderProfile(content.founderProfile);
  if (founder?.file) {
    activeFiles.add(founder.file);
  }
  if (founder?.legacyFile) {
    activeFiles.add(founder.legacyFile);
  }

  // Prune any deleted/unpublished assets
  await pruneOrphanedFiles(activeFiles);

  const photos = galleryItems.map((item) => {
    const copy = { ...item };
    delete (copy as { file?: string; legacyFile?: string }).file;
    delete (copy as { file?: string; legacyFile?: string }).legacyFile;
    return copy;
  });
  let founderProfile: Omit<NonNullable<typeof founder>, "file" | "legacyFile"> | null = null;
  if (founder) {
    const copy = { ...founder };
    delete (copy as { file?: string; legacyFile?: string }).file;
    delete (copy as { file?: string; legacyFile?: string }).legacyFile;
    founderProfile = copy;
  }

  const videoCount = photos.filter((p) => p.mediaType === "Video").length;
  const photoCount = photos.filter((p) => p.mediaType === "Photo").length;

  await writeFile(
    SNAPSHOT,
    `${JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        photos,
        announcement: content.announcement,
        founderProfile,
        siteSettings: content.siteSettings,
        courseTracks: content.courseTracks,
        faqItems: content.faqItems,
        testimonials: content.testimonials,
        legalDocuments: content.legalDocuments,
      },
      null,
      2,
    )}\n`,
  );

  await writeBuildDiagnostic("success", {
    photoCount,
    videoCount,
    founderProfile: founderProfile ? "active" : "none",
  });

  console.log(
    `[cms] Synced ${photoCount} photo(s), ${videoCount} video(s), ${content.courseTracks.length} course track(s), ${content.faqItems.length} FAQ(s), ${content.testimonials.length} testimonial(s), ${content.legalDocuments.length} legal doc(s); site settings: ${content.siteSettings ? "active" : "none"}; founder profile: ${founderProfile ? "active" : "none"}; announcement: ${content.announcement ? "active" : "none"}.`,
  );
}

main().catch(async (error: Error) => {
  await writeBuildDiagnostic("error", { message: error.message });
  return fallbackToLocal(`Sync failed (${error.message}).`);
});
