// One-time (idempotent) Contentful provisioning via the Content Management API.
//   1. Creates/updates and publishes `galleryItem`, `announcement`, and `founderProfile` content types.
//   2. Uploads existing photos as assets (classroom photo and founder portrait).
//   3. Creates and publishes initial entries: gallery classroom, founder profile, and default announcement.
// Existing assets and entries are never overwritten, so Mani Sir's edits in Contentful are safe.
// Reads CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN from .env.local. Usage: npm run cms:setup
import { readFile } from "node:fs/promises";

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENV = process.env.CONTENTFUL_ENVIRONMENT || "master";
if (!SPACE || !TOKEN) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local.");
  process.exit(1);
}

const BASE = `https://api.contentful.com/spaces/${SPACE}/environments/${ENV}`;

async function cma(path, { method = "GET", version, body, url, contentType, entryType } = {}) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url ?? `${BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": contentType ?? "application/vnd.contentful.management.v1+json",
        ...(version !== undefined && { "X-Contentful-Version": String(version) }),
        ...(entryType && { "X-Contentful-Content-Type": entryType }),
      },
      body: body === undefined || body instanceof Uint8Array ? body : JSON.stringify(body),
    });
    if (res.status === 429 && attempt < 5) {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      continue;
    }
    if (res.status === 404 && method === "GET") return null;
    const json = res.status === 204 ? {} : await res.json();
    if (!res.ok) throw new Error(`${method} ${path ?? "upload"} failed: ${res.status} ${json?.sys?.id ?? ""} ${json?.message ?? ""}`);
    return json;
  }
}

const CONTENT_TYPES = (locale) => [
  {
    id: "galleryItem",
    name: "Gallery Item",
    description: "A photo or video on the website gallery (/gallery). Lower 'order' shows first.",
    displayField: "title",
    fields: [
      { id: "title", name: "Title", type: "Symbol", required: true, validations: [{ size: { max: 120 } }] },
      {
        id: "category",
        name: "Category",
        type: "Symbol",
        required: true,
        validations: [{ in: ["Classroom", "Lessons", "Orientation", "Student Success", "Event"] }],
      },
      {
        id: "mediaType",
        name: "Media Type",
        type: "Symbol",
        required: true,
        defaultValue: { [locale]: "Photo" },
        validations: [{ in: ["Photo", "Video"] }],
      },
      {
        id: "image",
        name: "Image",
        type: "Link",
        linkType: "Asset",
        required: false,
        validations: [{ linkMimetypeGroup: ["image"] }, { assetFileSize: { max: 20 * 1024 * 1024 } }],
      },
      {
        id: "youtubeUrl",
        name: "YouTube URL",
        type: "Symbol",
        required: false,
        validations: [{ size: { max: 200 } }],
      },
      { id: "date", name: "Date", type: "Date", required: false },
      { id: "order", name: "Order", type: "Integer", required: false },
    ],
  },
  {
    id: "announcement",
    name: "Announcement",
    description: "Banner at the top of the homepage. The most recently updated active announcement is shown.",
    displayField: "message",
    fields: [
      { id: "message", name: "Message", type: "Symbol", required: true, validations: [{ size: { max: 200 } }] },
      { id: "isActive", name: "Is Active", type: "Boolean", required: true, defaultValue: { [locale]: true } },
      { id: "badgeText", name: "Badge Text", type: "Symbol", required: false, validations: [{ size: { max: 24 } }] },
    ],
  },
  {
    id: "siteSettings",
    name: "Site Settings",
    description: "Global site settings including hero headline, contact details, trial terms, and brand story.",
    displayField: "heroTitle",
    fields: [
      { id: "heroTitle", name: "Hero Title", type: "Symbol", required: true },
      { id: "heroSubtitle", name: "Hero Subtitle", type: "Text", required: true },
      { id: "primaryPhone", name: "Primary Phone", type: "Symbol", required: true },
      { id: "whatsappNumber", name: "WhatsApp Number", type: "Symbol", required: true },
      { id: "address", name: "Address", type: "Text", required: true },
      { id: "trialTerms", name: "Trial Terms", type: "Text", required: true },
      { id: "promises", name: "Core Promises", type: "Array", items: { type: "Symbol" }, required: false },
      { id: "workingHours", name: "Working Hours", type: "Symbol", required: false },
      { id: "batchTimings", name: "Batch Timings", type: "Text", required: false },
      { id: "logoStory", name: "Logo Story & Meaning", type: "Text", required: false },
      { id: "logoStoryEagle", name: "Logo Story Eagle Parable", type: "Text", required: false },
      { id: "lifeAcronymL", name: "LIFE Acronym L", type: "Symbol", required: false },
      { id: "lifeAcronymI", name: "LIFE Acronym I", type: "Symbol", required: false },
      { id: "lifeAcronymF", name: "LIFE Acronym F", type: "Symbol", required: false },
      { id: "lifeAcronymE", name: "LIFE Acronym E", type: "Symbol", required: false },
    ],
  },
  {
    id: "founderProfile",
    name: "Founder Profile",
    description: "Mani Sir's official profile information, portrait photo, and biography.",
    displayField: "name",
    fields: [
      { id: "name", name: "Name", type: "Symbol", required: true, defaultValue: { [locale]: "Mani Sir" }, validations: [{ size: { max: 80 } }] },
      { id: "title", name: "Title", type: "Symbol", required: false, defaultValue: { [locale]: "Founder & Chief Mentor" }, validations: [{ size: { max: 120 } }] },
      { id: "bio", name: "Bio", type: "Text", required: false },
      {
        id: "portraitImage",
        name: "Portrait Image",
        type: "Link",
        linkType: "Asset",
        required: true,
        validations: [{ linkMimetypeGroup: ["image"] }, { assetFileSize: { max: 20 * 1024 * 1024 } }],
      },
      { id: "altText", name: "Alt Text", type: "Symbol", required: false, validations: [{ size: { max: 160 } }] },
      { id: "storyHeadline", name: "Story Headline", type: "Symbol", required: false, validations: [{ size: { max: 200 } }] },
      { id: "spiritOfLifeTitle", name: "Spirit of LIFE Title", type: "Symbol", required: false, validations: [{ size: { max: 120 } }] },
      { id: "spiritOfLifeContent", name: "Spirit of LIFE Content", type: "Text", required: false },
      { id: "journeyMilestones", name: "Journey Milestones", type: "Text", required: false },
      { id: "teachingPhilosophy", name: "Teaching Philosophy", type: "Text", required: false },
    ],
  },
];

async function upsertContentType({ id, ...definition }) {
  const existing = await cma(`/content_types/${id}`);
  const saved = await cma(`/content_types/${id}`, { method: "PUT", version: existing?.sys.version, body: definition });
  await cma(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`Content type ${id}: ${existing ? "updated" : "created"} and published.`);
}

async function publish(kind, id, version) {
  await cma(`/${kind}/${id}/published`, { method: "PUT", version });
}

async function ensureAsset({ id, file, fileName, contentType, title, description }, locale) {
  if (await cma(`/assets/${id}`)) return console.log(`Asset ${id}: exists, left unchanged.`);
  const upload = await cma(null, {
    method: "POST",
    url: `https://upload.contentful.com/spaces/${SPACE}/uploads`,
    contentType: "application/octet-stream",
    body: new Uint8Array(await readFile(file)),
  });
  let asset = await cma(`/assets/${id}`, {
    method: "PUT",
    body: {
      fields: {
        title: { [locale]: title },
        description: { [locale]: description },
        file: { [locale]: { contentType, fileName, uploadFrom: { sys: { type: "Link", linkType: "Upload", id: upload.sys.id } } } },
      },
    },
  });
  await cma(`/assets/${id}/files/${locale}/process`, { method: "PUT", version: asset.sys.version });
  for (let i = 0; i < 30 && !asset.fields.file?.[locale]?.url; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    asset = await cma(`/assets/${id}`);
  }
  if (!asset.fields.file?.[locale]?.url) throw new Error(`Asset ${id} did not finish processing.`);
  await publish("assets", id, asset.sys.version);
  console.log(`Asset ${id}: uploaded and published.`);
}

async function ensureEntry(id, contentTypeId, fields, locale) {
  if (await cma(`/entries/${id}`)) return console.log(`Entry ${id}: exists, left unchanged.`);
  const localized = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { [locale]: v }]));
  const entry = await cma(`/entries/${id}`, { method: "PUT", body: { fields: localized }, entryType: contentTypeId });
  await publish("entries", id, entry.sys.version);
  console.log(`Entry ${id}: created and published.`);
}

const locales = await cma("/locales");
const locale = locales.items.find((l) => l.default)?.code ?? "en-US";

for (const type of CONTENT_TYPES(locale)) await upsertContentType(type);

await ensureAsset(
  {
    id: "life-mani-sir-classroom",
    file: "assets/people/mani-sir-classroom-source.jpg",
    fileName: "mani-sir-classroom.jpg",
    contentType: "image/jpeg",
    title: "Mani Sir in the LIFE classroom, Madhurawada",
    description: "Mani Sir teaching in the LIFE Spoken English & Soft Skills classroom in Madhurawada",
  },
  locale,
);

await ensureAsset(
  {
    id: "life-mani-sir-portrait",
    file: "assets/people/mani-sir-classroom-source.jpg",
    fileName: "mani-sir-portrait.jpg",
    contentType: "image/jpeg",
    title: "Mani Sir - Official Portrait",
    description: "Mani Sir (K. Maneendra Kumar), Founder & Chief Mentor of LIFE Spoken English",
  },
  locale,
);

await ensureEntry(
  "life-gallery-classroom",
  "galleryItem",
  {
    title: "Mani Sir in the LIFE classroom, Madhurawada",
    category: "Classroom",
    mediaType: "Photo",
    image: { sys: { type: "Link", linkType: "Asset", id: "life-mani-sir-classroom" } },
    order: 1,
  },
  locale,
);

await ensureEntry(
  "life-announcement-default",
  "announcement",
  {
    message: "New batches are starting soon. Book your 10 free trial classes with Mani Sir today.",
    isActive: true,
    badgeText: "New Batch",
  },
  locale,
);

await ensureEntry(
  "life-founder-profile",
  "founderProfile",
  {
    name: "Mani Sir",
    title: "Founder & Chief Mentor",
    bio: "K. Maneendra Kumar, known to thousands of learners as Mani Sir, founded LIFE in Madhurawada, Visakhapatnam to give learners a safe, judgment-free space to build English fluency.",
    portraitImage: { sys: { type: "Link", linkType: "Asset", id: "life-mani-sir-portrait" } },
    altText: "Mani Sir - Founder of LIFE Spoken English",
  },
  locale,
);

// Optional: rebuild the live site whenever content is published or unpublished.
const DEPLOY_HOOK = process.env.CLOUDFLARE_DEPLOY_HOOK_URL;
if (DEPLOY_HOOK) {
  const webhooksUrl = `https://api.contentful.com/spaces/${SPACE}/webhook_definitions`;
  const existing = await cma(null, { url: webhooksUrl });
  const hook = existing.items.find((w) => w.name === "Cloudflare Pages rebuild");
  const definition = {
    name: "Cloudflare Pages rebuild",
    url: DEPLOY_HOOK,
    httpBasicUsername: null,
    topics: ["Entry.publish", "Entry.unpublish", "Asset.publish", "Asset.unpublish"],
    filters: [{ equals: [{ doc: "sys.environment.sys.id" }, ENV] }],
  };
  await cma(null, hook
    ? { method: "PUT", url: `${webhooksUrl}/${hook.sys.id}`, version: hook.sys.version, body: definition }
    : { method: "POST", url: webhooksUrl, body: definition });
  console.log(`Webhook "Cloudflare Pages rebuild": ${hook ? "updated" : "created"}.`);
} else {
  console.log("No CLOUDFLARE_DEPLOY_HOOK_URL set: skipped the auto-rebuild webhook.");
}

console.log("Contentful is ready. Run `npm run build` to sync the content into the site.");
