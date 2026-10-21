// Idempotent Contentful provisioning and content seeding script.
// Provisions `siteSettings`, `courseTrack`, `faqItem`, `testimonialItem`, and `legalDocument` via CMA,
// and seeds all initial content directly from `src/lib/site-copy.ts`.
// Reads CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN from .env.local.
import {
  brandCopy,
  courseCopy,
  faqCopy,
  heroCopy,
  testimonialsCopy,
} from "../src/lib/site-copy.ts";

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
  {
    id: "legalDocument",
    name: "Legal Document",
    description: "Privacy policy, terms of service and legal notices.",
    displayField: "title",
    fields: [
      { id: "slug", name: "Slug", type: "Symbol", required: true },
      { id: "title", name: "Title", type: "Symbol", required: true },
      { id: "lastUpdated", name: "Last Updated", type: "Symbol", required: true },
      { id: "content", name: "Content", type: "Text", required: true },
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

const PRIVACY_POLICY_CONTENT = JSON.stringify({
  intro:
    "We keep this simple: this website uses no cookies, no analytics and no tracking. We only receive your details when you choose to message or call us. This notice explains what we collect, why, and your rights under the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.",
  sections: [
    {
      id: "who",
      title: "1. Who we are",
      paragraphs: [
        "LIFE Spoken English & Soft Skills Training Institute (\"LIFE\", \"we\"), run by K. Maneendra Kumar (Mani\u00A0Sir), First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh - 530041. For the personal data described here, LIFE is the Data Fiduciary.",
      ],
    },
    {
      id: "collect",
      title: "2. What we collect, and when",
      paragraphs: [
        "We do not collect passwords, payment card details, health information or any other sensitive data on this website.",
      ],
      bullets: [
        "Booking form: your name, mobile number, learner category, course of interest and preferred mode. The form does not send or store anything on our website. When you tap \"Register\", it opens WhatsApp with a ready-made message, and we receive it only if you press send.",
        "Calls and WhatsApp messages you send us directly, and anything you choose to share in them.",
        "Enrolled learners: the details needed to run your classes, such as name, contact number, batch and attendance.",
      ],
    },
    {
      id: "purpose",
      title: "3. Why we use it",
      paragraphs: [
        "We never sell your data, never add you to advertising lists, and do not share it with anyone except where the law requires.",
      ],
      bullets: [
        "To reply to your enquiry and arrange your 10 free trial classes.",
        "To share batch timings, schedule backup sessions and run your course.",
        "To keep basic records required by law.",
      ],
    },
    {
      id: "cookies",
      title: "4. Cookies and tracking",
      paragraphs: [
        "This website sets no cookies and uses no analytics, advertising pixels, fingerprinting or session recording. Because of this, there is no cookie banner to accept.",
        "To open instantly and work offline, your browser keeps a copy of the website's own files using its standard cache and a service worker. These files contain no personal information, and you can clear them at any time from your browser settings.",
      ],
    },
    {
      id: "third-party",
      title: "5. Third-party services (only when you choose)",
      paragraphs: [
        "Until you use one of these, your browser does not contact these services from our website.",
      ],
      bullets: [
        "WhatsApp (Meta): used when you tap a WhatsApp button. WhatsApp's own privacy policy applies to messages you send.",
        "YouTube (Google): videos load from the privacy-enhanced youtube-nocookie.com player, and only after you press play.",
        "Google Maps: the map loads only when you tap \"Load interactive map\" or open Google Maps.",
        "Instagram and YouTube channel links open those platforms, where their policies apply.",
      ],
    },
    {
      id: "children",
      title: "6. Learners under 18",
      paragraphs: [
        "LIFE welcomes school students. If the learner is under 18, the enquiry should be made by a parent or legal guardian, or with their permission. Before enrolling a minor, we confirm consent directly with the parent or guardian, as required by the Digital Personal Data Protection Act, 2023. We do not use children's data for tracking, profiling or advertising.",
      ],
    },
    {
      id: "retention",
      title: "7. How long we keep it",
      paragraphs: [
        "Enquiry details are kept only as long as needed to answer you and, if you join, for the duration of your course and any records the law requires. You can ask us to delete your details at any time.",
      ],
    },
    {
      id: "rights",
      title: "8. Your rights",
      paragraphs: [
        "Under the Digital Personal Data Protection Act, 2023, you can:",
      ],
      bullets: [
        "ask what personal data we hold about you and how we use it;",
        "ask us to correct, complete, update or erase it;",
        "withdraw your consent at any time (this does not affect anything done before);",
        "nominate another person to exercise these rights for you;",
        "raise a grievance with us, and if you are not satisfied, complain to the Data Protection Board of India.",
      ],
    },
    {
      id: "contact",
      title: "9. Contact and grievances",
      paragraphs: [
        "For any privacy question, request to exercise your rights, or grievance, contact our Grievance / Privacy contact:",
        "We will respond as early as possible and within the time limits set by law.",
      ],
      bullets: [
        "Name: Mani\u00A0Sir (K. Maneendra Kumar), Founder",
        "Email: lifebymanisir@gmail.com",
        "Phone: +91 73374 12999 (call or WhatsApp)",
        "Address: First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam - 530041",
      ],
    },
    {
      id: "security",
      title: "10. Security and changes",
      paragraphs: [
        "The website is served securely over HTTPS and stores no personal data on its servers. Records we keep are protected with reasonable security safeguards. If this notice changes, we will update the date above. See also our Terms of Use.",
      ],
    },
  ],
});

const TERMS_OF_USE_CONTENT = JSON.stringify({
  intro:
    "By using this website you agree to these terms. They also summarise how classes at LIFE Spoken English work, so there are no surprises.",
  sections: [
    {
      id: "website",
      title: "1. Using this website",
      paragraphs: [
        "This website gives information about LIFE's courses and lets you contact us. Please use it lawfully and do not attempt to disrupt it or misuse its content.",
      ],
    },
    {
      id: "information",
      title: "2. Course information and fees",
      paragraphs: [
        "We keep course details, timings and fees accurate and up to date, but they may change. The details confirmed by Mani\u00A0Sir on call or WhatsApp at the time you join apply.",
        "For any question about fees, payments or refunds, please speak to Mani\u00A0Sir directly before paying.",
      ],
      bullets: [
        "10-Class Free Trial: 10 live sessions with no fee and no advance payment. You may stop at any time during the trial.",
        "Regular Batch: ₹3,000 for the first month, then ₹2,000 per month, paid month by month.",
        "1-on-1 Personal Mentorship: ₹10,000 per month.",
        "Custom schedule requests: discuss your preferred timing directly with Mani\u00A0Sir.",
      ],
    },
    {
      id: "refunds",
      title: "3. Refund policy",
      paragraphs: [
        "10-Class Free Trial allows 100% risk-free evaluation. Once a monthly batch fee is paid, fees are non-refundable for that active calendar month due to the strict 15 - 20 student seat limit. Batch pauses or transfers for genuine emergencies may be granted at Mani\u00A0Sir's sole discretion.",
      ],
    },
    {
      id: "classes",
      title: "4. Batches, timings and backup sessions",
      paragraphs: [],
      bullets: [
        "Strict 15 - 20 student seat limit per batch.",
        "Classes run Monday to Friday, 6:00 AM to 10:00 PM. Weekends: Saturday & Sunday for personal backup sessions.",
        "Students who miss weekday sessions can take personalized on-demand makeup classes on Saturday and Sunday, arranged directly with Mani\u00A0Sir.",
        "Learners under 18 join with the consent of a parent or legal guardian.",
      ],
    },
    {
      id: "results",
      title: "5. Outcome disclaimer",
      paragraphs: [
        "LIFE Spoken English provides practical spoken communication and soft skills mentorship. We do not offer or guarantee job placements, employment contracts, or academic degrees. Individual fluency outcomes depend entirely on learner practice, attendance, and commitment.",
      ],
    },
    {
      id: "content",
      title: "6. Our content",
      paragraphs: [
        "The LIFE name and logo, the printed workbook, class material and videos belong to LIFE. Please do not copy or reuse them commercially without permission. Sharing links to our pages and videos is always welcome.",
      ],
    },
    {
      id: "links",
      title: "7. Other websites",
      paragraphs: [
        "Links to WhatsApp, YouTube, Instagram and Google Maps take you to services run by other companies under their own terms and privacy policies.",
      ],
    },
    {
      id: "law",
      title: "8. Governing law and contact",
      paragraphs: [
        "These terms are governed by the laws of India. For any question, concern or grievance, contact Mani\u00A0Sir at lifebymanisir@gmail.com or on +91 73374 12999. See our Privacy Policy for how we handle personal data.",
      ],
    },
  ],
});

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
      promises: [
        "10 Days Free Demo Classes: Attend 10 full sessions before you decide.",
        "Monthly Fee Payment Option: Pay small monthly instalments like school tuition. No heavy upfront burden.",
        "100% Face-to-Face Live Teaching: Interactive two-way speaking practice. Never boring recorded videos.",
        "Real-Life Situational Learning: Practical examples from your daily life, job and career, not dry bookish grammar rules.",
        "Free Repeat Batch Guarantee: Finished the course and want more polish? Repeat the next batch for ₹0.",
        "Flexible Weekend Backup: Students who miss weekday sessions receive personalized on-demand makeup classes on Saturday and Sunday directly with Mani\u00A0Sir.",
        "Complete Soft Skills & Drafting: Master professional email writing, formal drafting and corporate etiquette.",
        "Equal Teaching & Speaking Drills: 50% concept explanation + 50% active speaking practice, every session.",
        "Vernacular-Friendly (Telugu -> English): Designed to remove the fear of English for Telugu-medium learners.",
        "Open Learning Environment: Basic track students can freely ask questions from advanced modules too.",
      ],
      workingHours: "Monday to Friday: 6:00 AM to 10:00 PM, weekends for personal backup sessions",
      batchTimings:
        "Morning: 6:00 AM - 7:00 AM, 7:00 AM - 8:00 AM, 8:00 AM - 9:00 AM\nEvening: 5:00 PM - 6:00 PM, 6:00 PM - 7:00 PM, 7:00 PM - 8:00 PM, 8:00 PM - 9:00 PM\nOnline Live: Throughout the day\nWeekend: Saturday & Sunday on-demand personal backup sessions",
      logoStory:
        "Like an eagle renewing its wings on the mountaintop, every learner at LIFE sheds their old hesitation and rises into fluent, confident expression. L.I.F.E. stands for Live It For Eternity: English not as an academic subject, but as a living life skill you will carry forever.",
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

  // 6. Seed legalDocument
  console.log("\nSeeding legalDocuments...");
  await upsertEntry(
    "life-legal-privacy-policy",
    "legalDocument",
    {
      slug: "privacy-policy",
      title: "Privacy Policy & Data Notice",
      lastUpdated: "11 October 2026",
      content: PRIVACY_POLICY_CONTENT,
    },
    locale,
  );

  await upsertEntry(
    "life-legal-terms-of-use",
    "legalDocument",
    {
      slug: "terms-of-use",
      title: "Terms of Use & Class Policies",
      lastUpdated: "11 October 2026",
      content: TERMS_OF_USE_CONTENT,
    },
    locale,
  );

  console.log("\nAll content types provisioned and records successfully seeded to Contentful!");
}

main().catch((err) => {
  console.error("Contentful seeding failed:", err);
  process.exit(1);
});
