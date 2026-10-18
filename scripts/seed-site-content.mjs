// Idempotent Contentful provisioning and content seeding script.
// Provisions `siteSettings`, `courseTrack`, `faqItem`, and `testimonialItem` content types via CMA,
// and seeds all initial content directly from `src/lib/site-copy.ts`.
// Reads CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN from .env.local.
import { brandCopy, courseCopy, faqCopy, heroCopy, testimonialsCopy } from "../src/lib/site-copy.ts";

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
    if (!res.ok) {
      throw new Error(
        `${method} ${path ?? url} failed: ${res.status} ${json?.sys?.id ?? ""} ${json?.message ?? JSON.stringify(json)}`,
      );
    }
    return json;
  }
}

const CONTENT_TYPES = [
  {
    id: "siteSettings",
    name: "Site Settings",
    description: "Global site settings including hero headline, contact details, and trial terms.",
    displayField: "heroTitle",
    fields: [
      { id: "heroTitle", name: "Hero Title", type: "Symbol", required: true },
      { id: "heroSubtitle", name: "Hero Subtitle", type: "Text", required: true },
      { id: "primaryPhone", name: "Primary Phone", type: "Symbol", required: true },
      { id: "whatsappNumber", name: "WhatsApp Number", type: "Symbol", required: true },
      { id: "address", name: "Address", type: "Text", required: true },
      { id: "trialTerms", name: "Trial Terms", type: "Text", required: true },
    ],
  },
  {
    id: "courseTrack",
    name: "Course Track",
    description: "Curriculum tracks offered at LIFE Spoken English.",
    displayField: "title",
    fields: [
      { id: "title", name: "Title", type: "Symbol", required: true },
      { id: "trackId", name: "Track ID", type: "Symbol", required: true },
      { id: "description", name: "Description", type: "Text", required: true },
      {
        id: "highlights",
        name: "Highlights",
        type: "Array",
        items: { type: "Symbol" },
        required: true,
      },
      { id: "order", name: "Order", type: "Integer", required: true },
    ],
  },
  {
    id: "faqItem",
    name: "FAQ Item",
    description: "Frequently Asked Questions displayed on the homepage and in structured data.",
    displayField: "question",
    fields: [
      { id: "question", name: "Question", type: "Symbol", required: true },
      { id: "answer", name: "Answer", type: "Text", required: true },
      {
        id: "category",
        name: "Category",
        type: "Symbol",
        required: true,
        validations: [
          {
            in: [
              "Trial & Fees",
              "Eligibility & Language",
              "Schedule & Batches",
              "Missed Classes & Support",
            ],
          },
        ],
      },
      { id: "order", name: "Order", type: "Integer", required: true },
    ],
  },
  {
    id: "testimonialItem",
    name: "Testimonial Item",
    description: "Student reviews and testimonials.",
    displayField: "name",
    fields: [
      { id: "name", name: "Name", type: "Symbol", required: true },
      { id: "role", name: "Role", type: "Symbol", required: true },
      { id: "quote", name: "Quote", type: "Text", required: true },
      { id: "rating", name: "Rating", type: "Integer", required: true },
      { id: "order", name: "Order", type: "Integer", required: true },
    ],
  },
];

async function upsertContentType({ id, ...definition }) {
  const existing = await cma(`/content_types/${id}`);
  const saved = await cma(`/content_types/${id}`, {
    method: "PUT",
    version: existing?.sys.version,
    body: definition,
  });
  await cma(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`Content type "${id}": ${existing ? "updated" : "created"} and published.`);
}

async function publish(kind, id, version) {
  return await cma(`/${kind}/${id}/published`, { method: "PUT", version });
}

async function upsertEntry(id, contentTypeId, fields, locale) {
  const existing = await cma(`/entries/${id}`);
  const localized = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, { [locale]: v }]),
  );

  let entry;
  if (existing) {
    entry = await cma(`/entries/${id}`, {
      method: "PUT",
      version: existing.sys.version,
      body: { fields: { ...existing.fields, ...localized } },
    });
    console.log(`Entry "${id}": updated.`);
  } else {
    entry = await cma(`/entries/${id}`, {
      method: "PUT",
      body: { fields: localized },
      entryType: contentTypeId,
    });
    console.log(`Entry "${id}": created.`);
  }

  await publish("entries", id, entry.sys.version);
  console.log(`Entry "${id}": published.`);
}

async function main() {
  const locales = await cma("/locales");
  const locale = locales.items.find((l) => l.default)?.code ?? "en-US";
  console.log(`Using Contentful locale: ${locale}`);

  // 1. Provision content types
  for (const type of CONTENT_TYPES) {
    await upsertContentType(type);
  }

  // 2. Seed siteSettings
  console.log("\nSeeding siteSettings...");
  await upsertEntry(
    "life-site-settings",
    "siteSettings",
    {
      heroTitle: heroCopy.headlineFull,
      heroSubtitle: heroCopy.subheadline,
      primaryPhone: brandCopy.phones.primary.display,
      whatsappNumber: brandCopy.phones.primary.display,
      address: brandCopy.address.full,
      trialTerms:
        "10 full live classes completely free with zero advance payment. Stop at any time during the trial. ₹3,000 for the first month, then ₹2,000 per month.",
    },
    locale,
  );

  // 3. Seed courseTrack
  console.log("\nSeeding courseTracks...");
  for (let i = 0; i < courseCopy.tracks.length; i++) {
    const track = courseCopy.tracks[i];
    await upsertEntry(
      `life-course-${track.id}`,
      "courseTrack",
      {
        title: track.name,
        trackId: track.id,
        description: track.tagline,
        highlights: track.focus,
        order: i + 1,
      },
      locale,
    );
  }

  // 4. Seed faqItem
  console.log("\nSeeding faqItems...");
  for (let i = 0; i < faqCopy.items.length; i++) {
    const faq = faqCopy.items[i];
    await upsertEntry(
      `life-faq-${i + 1}`,
      "faqItem",
      {
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: i + 1,
      },
      locale,
    );
  }

  // 5. Seed testimonialItem
  console.log("\nSeeding testimonialItems...");
  for (let i = 0; i < testimonialsCopy.items.length; i++) {
    const item = testimonialsCopy.items[i];
    await upsertEntry(
      `life-testimonial-${i + 1}`,
      "testimonialItem",
      {
        name: item.name,
        role: item.role,
        quote: item.quote,
        rating: 5,
        order: i + 1,
      },
      locale,
    );
  }

  console.log("\nAll content types provisioned and records successfully seeded to Contentful!");
}

main().catch((err) => {
  console.error("Contentful seeding failed:", err);
  process.exit(1);
});
