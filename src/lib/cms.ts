import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ANNOUNCEMENT, MANI_SIR, PHOTOS, type Announcement, type GalleryPhoto } from "./content";
import {
  brandCopy,
  courseCopy,
  faqCopy,
  founderCopy,
  heroCopy,
  storyCopy,
  testimonialsCopy,
} from "./site-copy";

export type FounderProfile = {
  name: string;
  title: string;
  bio: string | null;
  portraitSrc: string;
  altText: string;
  width: number;
  height: number;
  storyHeadline?: string | null;
  spiritOfLifeTitle?: string | null;
  spiritOfLifeContent?: string | null;
  journeyMilestones?: string | null;
  teachingPhilosophy?: string | null;
  bioHeadline?: string | null;
  bioParagraphs?: string | null;
  missionStatement?: string | null;
  statsExperience?: string | null;
  statsStudents?: string | null;
  statsBatches?: string | null;
};

export type SiteSettings = {
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
  trialBadgeText?: string;
  heroSubheadline?: string;
  coursesSectionTitle?: string;
  coursesSectionSubtitle?: string;
  promisesSectionTitle?: string;
  promisesSectionSubtitle?: string;
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  whatsappMessage?: string;
};

export type StoryLore = {
  eagleStoryTitle: string;
  eagleStorySubtitle: string;
  eagleStoryParagraphs: string;
  eagleStoryMoral: string;
  spiritOfLifeTitle: string;
  spiritOfLifeIntro: string;
  spiritOfLifePoints: string;
  pillarLTitle: string;
  pillarLText: string;
  pillarITitle: string;
  pillarIText: string;
  pillarFTitle: string;
  pillarFText: string;
  pillarETitle: string;
  pillarEText: string;
};

export type CourseTrack = {
  id: string;
  title: string;
  trackId: string;
  description: string;
  highlights: string[];
  order: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
};

export type LegalSectionData = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocumentContent = {
  intro: string;
  sections: LegalSectionData[];
};

export type LegalDocument = {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  content: string;
  parsed?: LegalDocumentContent;
};

export type DynamicPromise = {
  title: string;
  description: string;
};

// Snapshot written by scripts/sync-cms.mts before `next build`. Git-ignored; absent means "use local content".
type Snapshot = {
  syncedAt: string;
  photos: GalleryPhoto[];
  announcement: Announcement | null;
  founderProfile: FounderProfile | null;
  siteSettings: SiteSettings | null;
  storyLore: StoryLore | null;
  courseTracks: CourseTrack[] | null;
  faqItems: FaqItem[] | null;
  testimonials: TestimonialItem[] | null;
  legalDocuments: LegalDocument[] | null;
};

const DEFAULT_FOUNDER_PROFILE: FounderProfile = {
  name: MANI_SIR.name,
  title: MANI_SIR.role,
  bio: MANI_SIR.lede,
  portraitSrc: "/media/people/mani-sir-portrait-v2.webp",
  altText: `${MANI_SIR.alias} (${MANI_SIR.name}) in the LIFE classroom`,
  width: 610,
  height: 763,
  storyHeadline: "Meet Mani\u00A0Sir, the heart of LIFE",
  spiritOfLifeTitle: storyCopy.meaningTitle,
  spiritOfLifeContent: storyCopy.meaningParagraphs.join("\n\n"),
  journeyMilestones: JSON.stringify(storyCopy.milestones),
  teachingPhilosophy: `${founderCopy.lede}\n\n${founderCopy.paragraphs.join("\n\n")}`,
  bioHeadline: "Teaching with Empathy & Conviction",
  bioParagraphs: founderCopy.paragraphs.join("\n\n"),
  missionStatement: brandCopy.mission,
  statsExperience: "20+ Years",
  statsStudents: "25,000+ Students",
  statsBatches: "1,200+ Batches",
};

const DEFAULT_STORY_LORE: StoryLore = {
  eagleStoryTitle: storyCopy.logoStory.title,
  eagleStorySubtitle: storyCopy.logoStory.eyebrow,
  eagleStoryParagraphs: storyCopy.logoStory.parable.join("\n\n"),
  eagleStoryMoral: storyCopy.logoStory.moral,
  spiritOfLifeTitle: storyCopy.meaningTitle,
  spiritOfLifeIntro: storyCopy.meaningLead,
  spiritOfLifePoints: JSON.stringify(storyCopy.meaningParagraphs),
  pillarLTitle: "Live",
  pillarLText: "English is not a temporary subject for exams or interviews. It is a daily living tool.",
  pillarITitle: "It",
  pillarIText: "Embrace the language on your tongue with practical drills and zero hesitation.",
  pillarFTitle: "For",
  pillarFText: "Build habits, professional skills, and confidence for every stage of your life.",
  pillarETitle: "Eternity",
  pillarEText: "Fluency that stays with you forever - at work, with family, and across the globe.",
};

const DEFAULT_PROMISES_RAW: string[] = [
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
];

const DEFAULT_WORKING_HOURS =
  "Monday to Friday: 6:00 AM to 10:00 PM, weekends for personal backup sessions";

const DEFAULT_BATCH_TIMINGS =
  "Morning: 6:00 AM - 7:00 AM, 7:00 AM - 8:00 AM, 8:00 AM - 9:00 AM\nEvening: 5:00 PM - 6:00 PM, 6:00 PM - 7:00 PM, 7:00 PM - 8:00 PM, 8:00 PM - 9:00 PM\nOnline Live: Throughout the day\nWeekend: Saturday & Sunday on-demand personal backup sessions";

const DEFAULT_LOGO_STORY =
  "Like an eagle renewing its wings on the mountaintop, every learner at LIFE sheds their old hesitation and rises into fluent, confident expression. L.I.F.E. stands for Live It For Eternity: English not as an academic subject, but as a living life skill you will carry forever.";

const DEFAULT_EAGLE_PARABLE =
  storyCopy.logoStory.parable.join("\n\n") + "\n\n" + storyCopy.logoStory.moral;

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroTitle: heroCopy.headlineFull,
  heroSubtitle: heroCopy.subheadline,
  primaryPhone: brandCopy.phones.primary.display,
  whatsappNumber: brandCopy.phones.primary.display,
  address: brandCopy.address.full,
  trialTerms:
    "10 full live classes completely free with zero advance payment. Stop at any time during the trial. ₹3,000 for the first month, then ₹2,000 per month.",
  promises: DEFAULT_PROMISES_RAW,
  workingHours: DEFAULT_WORKING_HOURS,
  batchTimings: DEFAULT_BATCH_TIMINGS,
  logoStory: DEFAULT_LOGO_STORY,
  logoStoryEagle: DEFAULT_EAGLE_PARABLE,
  lifeAcronymL: "Live",
  lifeAcronymI: "It",
  lifeAcronymF: "For",
  lifeAcronymE: "Eternity",
  trialBadgeText: heroCopy.badgeText,
  heroSubheadline: heroCopy.subheadline,
  coursesSectionTitle: "Every Stage of English Fluency",
  coursesSectionSubtitle: "From foundational hesitation removal to stage-ready executive communication.",
  promisesSectionTitle: "The 10 LIFE Promises",
  promisesSectionSubtitle: "Ten commitments you won't find anywhere else, straight from Mani\u00A0Sir.",
  contactAddress: brandCopy.address.full,
  contactPhone: brandCopy.phones.primary.display,
  contactEmail: brandCopy.email,
  whatsappMessage: brandCopy.whatsappCta.defaultMessage,
};

const DEFAULT_PRIVACY_POLICY: LegalDocument = {
  id: "life-legal-privacy-policy",
  slug: "privacy-policy",
  title: "Privacy Policy & Data Notice",
  lastUpdated: "April 2026",
  content: JSON.stringify({
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
  }),
};

const DEFAULT_TERMS_OF_USE: LegalDocument = {
  id: "life-legal-terms-of-use",
  slug: "terms-of-use",
  title: "Terms of Use & Class Policies",
  lastUpdated: "April 2026",
  content: JSON.stringify({
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
  }),
};

const DEFAULT_COURSE_TRACKS: CourseTrack[] = courseCopy.tracks.map((t, idx) => ({
  id: `life-course-${t.id}`,
  title: t.name,
  trackId: t.id,
  description: t.tagline,
  highlights: t.focus,
  order: idx + 1,
}));

const DEFAULT_FAQ_ITEMS: FaqItem[] = faqCopy.items.map((f, idx) => ({
  id: `life-faq-${idx + 1}`,
  question: f.question,
  answer: f.answer,
  category: f.category,
  order: idx + 1,
}));

const DEFAULT_TESTIMONIALS: TestimonialItem[] = testimonialsCopy.items.map((t, idx) => ({
  id: `life-testimonial-${idx + 1}`,
  name: t.name,
  role: t.role,
  quote: t.quote,
  rating: 5,
  order: idx + 1,
}));

function readSnapshot(): Snapshot | null {
  const file = path.join(process.cwd(), "src/lib/cms.generated.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Snapshot;
  } catch {
    return null;
  }
}

export function parseLegalDocument(doc: LegalDocument): LegalDocument {
  if (doc.parsed) return doc;
  try {
    const parsed = JSON.parse(doc.content) as LegalDocumentContent;
    return { ...doc, parsed };
  } catch {
    return {
      ...doc,
      parsed: {
        intro: doc.content,
        sections: [],
      },
    };
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

/** Global site settings from Contentful, or the local fallback when CMS is unavailable. */
export function getSiteSettings(): SiteSettings {
  return readSnapshot()?.siteSettings ?? DEFAULT_SITE_SETTINGS;
}

/** Course tracks from Contentful, or the local fallback when CMS is unavailable. */
export function getCourseTracks(): CourseTrack[] {
  const tracks = readSnapshot()?.courseTracks;
  return tracks?.length ? tracks : DEFAULT_COURSE_TRACKS;
}

/** FAQ items from Contentful, or the local fallback when CMS is unavailable. */
export function getFaqItems(): FaqItem[] {
  const items = readSnapshot()?.faqItems;
  return items?.length ? items : DEFAULT_FAQ_ITEMS;
}

/** Testimonials from Contentful, or the local fallback when CMS is unavailable. */
export function getTestimonials(): TestimonialItem[] {
  const items = readSnapshot()?.testimonials;
  return items?.length ? items : DEFAULT_TESTIMONIALS;
}

/** Legal documents (Privacy, Terms) from Contentful, or local fallback. */
export function getLegalDocuments(): LegalDocument[] {
  const docs = readSnapshot()?.legalDocuments;
  if (docs && docs.length > 0) return docs.map(parseLegalDocument);
  return [parseLegalDocument(DEFAULT_PRIVACY_POLICY), parseLegalDocument(DEFAULT_TERMS_OF_USE)];
}

/** Get a specific legal document by slug ('privacy-policy' | 'terms-of-use'). */
export function getLegalDocument(slug: string): LegalDocument {
  const docs = readSnapshot()?.legalDocuments;
  const match = docs?.find((d) => d.slug === slug);
  if (match) return parseLegalDocument(match);
  if (slug === "privacy-policy") return parseLegalDocument(DEFAULT_PRIVACY_POLICY);
  if (slug === "terms-of-use") return parseLegalDocument(DEFAULT_TERMS_OF_USE);
  return {
    id: `local-${slug}`,
    slug,
    title: slug,
    lastUpdated: "April 2026",
    content: "",
    parsed: { intro: "", sections: [] },
  };
}

/** The 10 Core Promises dynamically loaded from CMS. */
export function getPromises(): DynamicPromise[] {
  const settings = getSiteSettings();
  const rawList =
    settings.promises && settings.promises.length > 0 ? settings.promises : DEFAULT_PROMISES_RAW;
  return rawList.map((p) => {
    const colonIndex = p.indexOf(":");
    if (colonIndex > 0) {
      return {
        title: p.slice(0, colonIndex).trim(),
        description: p.slice(colonIndex + 1).trim(),
      };
    }
    return { title: p, description: "" };
  });
}

/** Working hours from CMS or default. */
export function getWorkingHours(): string {
  return getSiteSettings().workingHours || DEFAULT_WORKING_HOURS;
}

/** Batch timings breakdown from CMS or default. */
export function getBatchTimings(): string {
  return getSiteSettings().batchTimings || DEFAULT_BATCH_TIMINGS;
}

/** Logo Eagle story & LIFE acronym meaning from CMS or default. */
export function getLogoStory(): string {
  const settings = getSiteSettings();
  return settings.logoStoryEagle || settings.logoStory || DEFAULT_LOGO_STORY;
}

/** Story lore (eagle parable, Spirit of LIFE, and the 4 pillars) from Contentful, or default. */
export function getStoryLore(): StoryLore {
  const lore = readSnapshot()?.storyLore;
  if (!lore) return DEFAULT_STORY_LORE;
  return {
    eagleStoryTitle: lore.eagleStoryTitle || DEFAULT_STORY_LORE.eagleStoryTitle,
    eagleStorySubtitle: lore.eagleStorySubtitle || DEFAULT_STORY_LORE.eagleStorySubtitle,
    eagleStoryParagraphs: lore.eagleStoryParagraphs || DEFAULT_STORY_LORE.eagleStoryParagraphs,
    eagleStoryMoral: lore.eagleStoryMoral || DEFAULT_STORY_LORE.eagleStoryMoral,
    spiritOfLifeTitle: lore.spiritOfLifeTitle || DEFAULT_STORY_LORE.spiritOfLifeTitle,
    spiritOfLifeIntro: lore.spiritOfLifeIntro || DEFAULT_STORY_LORE.spiritOfLifeIntro,
    spiritOfLifePoints: lore.spiritOfLifePoints || DEFAULT_STORY_LORE.spiritOfLifePoints,
    pillarLTitle: lore.pillarLTitle || DEFAULT_STORY_LORE.pillarLTitle,
    pillarLText: lore.pillarLText || DEFAULT_STORY_LORE.pillarLText,
    pillarITitle: lore.pillarITitle || DEFAULT_STORY_LORE.pillarITitle,
    pillarIText: lore.pillarIText || DEFAULT_STORY_LORE.pillarIText,
    pillarFTitle: lore.pillarFTitle || DEFAULT_STORY_LORE.pillarFTitle,
    pillarFText: lore.pillarFText || DEFAULT_STORY_LORE.pillarFText,
    pillarETitle: lore.pillarETitle || DEFAULT_STORY_LORE.pillarETitle,
    pillarEText: lore.pillarEText || DEFAULT_STORY_LORE.pillarEText,
  };
}

/** Complete Eagle parable and moral dynamically fetched from CMS. */
export function getEagleParable(): {
  title: string;
  eyebrow: string;
  parable: string[];
  moral: string;
  symbolsHeading: string;
} {
  const lore = getStoryLore();
  const rawEagle = lore.eagleStoryParagraphs || DEFAULT_STORY_LORE.eagleStoryParagraphs;
  const parts = rawEagle.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return {
    title: lore.eagleStoryTitle || storyCopy.logoStory.title,
    eyebrow: lore.eagleStorySubtitle || storyCopy.logoStory.eyebrow,
    parable: parts.length > 0 ? parts : storyCopy.logoStory.parable,
    moral: lore.eagleStoryMoral || storyCopy.logoStory.moral,
    symbolsHeading: storyCopy.logoStory.symbolsHeading,
  };
}

/** The Spirit of LIFE narrative and the 4 L.I.F.E. pillars from CMS. */
export function getSpiritOfLife(): {
  title: string;
  lead: string;
  eyebrow: string;
  paragraphs: string[];
  namedLine: string;
  promise: string;
  acronym: Array<{ letter: string; word: string; description?: string }>;
} {
  const lore = getStoryLore();
  const profile = getFounderProfile();

  const title = lore.spiritOfLifeTitle || profile.spiritOfLifeTitle || storyCopy.meaningTitle;
  const lead = lore.spiritOfLifeIntro || storyCopy.meaningLead;

  let paragraphs = storyCopy.meaningParagraphs;
  if (lore.spiritOfLifePoints) {
    try {
      const parsed = JSON.parse(lore.spiritOfLifePoints);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (typeof parsed[0] === "string") {
          paragraphs = parsed;
        } else if (parsed[0]?.title && parsed[0]?.body) {
          paragraphs = parsed.map((item: { title: string; body: string }) => `${item.title}: ${item.body}`);
        }
      }
    } catch {
      paragraphs = lore.spiritOfLifePoints.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    }
  } else if (profile.spiritOfLifeContent) {
    paragraphs = profile.spiritOfLifeContent.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  }

  const acronym = [
    { letter: "L", word: lore.pillarLTitle || "Live", description: lore.pillarLText },
    { letter: "I", word: lore.pillarITitle || "It", description: lore.pillarIText },
    { letter: "F", word: lore.pillarFTitle || "For", description: lore.pillarFText },
    { letter: "E", word: lore.pillarETitle || "Eternity", description: lore.pillarEText },
  ];

  return {
    title,
    lead,
    eyebrow: storyCopy.eyebrow,
    paragraphs: paragraphs.length > 0 ? paragraphs : storyCopy.meaningParagraphs,
    namedLine: storyCopy.namedLine,
    promise: storyCopy.promise,
    acronym,
  };
}

/** Key milestones dynamically fetched from founder profile in CMS. */
export function getJourneyMilestones(): Array<{ year: string; title: string; body: string }> {
  const profile = getFounderProfile();
  if (profile.journeyMilestones) {
    try {
      const parsed = JSON.parse(profile.journeyMilestones);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Fallback if not valid JSON
    }
  }
  return storyCopy.milestones;
}
