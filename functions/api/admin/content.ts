import {
  ADMIN_COOKIE_NAME,
  cleanText,
  jsonResponse,
  parseCookies,
  verifySession,
  type Env,
} from "./_shared";

interface EventContext {
  request: Request;
  env: Env;
}

export interface AdminAnnouncement {
  message: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

export interface AdminSiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  primaryPhone: string;
  whatsappNumber: string;
  address: string;
  trialTerms: string;
}

export interface AdminGalleryItem {
  id: string;
  title: string;
  category: "Classroom" | "Lessons" | "Orientation" | "Student Success" | "Event";
  mediaType: "Photo" | "Video";
  youtubeUrl?: string | null;
  youtubeId?: string | null;
  order: number;
}

export interface AdminCourseTrack {
  id: string;
  title: string;
  trackId: string;
  description: string;
  highlights: string[];
  order: number;
}

export interface AdminFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface AdminTestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
}

export interface AdminFounderProfile {
  name: string;
  title: string;
  bio: string;
  altText: string;
}

export interface FullAdminData {
  announcement: AdminAnnouncement;
  siteSettings: AdminSiteSettings;
  galleryItems: AdminGalleryItem[];
  courseTracks: AdminCourseTrack[];
  faqItems: AdminFaqItem[];
  testimonials: AdminTestimonialItem[];
  founderProfile: AdminFounderProfile;
}

export function extractYouTubeId(urlOrId: unknown): string | null {
  if (!urlOrId || typeof urlOrId !== "string") return null;
  const s = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const match = s.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export const DEFAULT_ADMIN_DATA: FullAdminData = {
  announcement: {
    message: "New batches are starting soon. Book your 10 free trial classes with Mani\u00A0Sir today.",
    ctaText: "New Batch",
    ctaUrl: "/#enroll",
    isActive: true,
  },
  siteSettings: {
    heroTitle: "Speak English with Fluency and Unstoppable Confidence.",
    heroSubtitle:
      "Practical, interactive Spoken English & Soft Skills training led personally by Mani\u00A0Sir. Learn without fear or grammar intimidation in Visakhapatnam or via Live Online classes.",
    primaryPhone: "+91 73374 12999",
    whatsappNumber: "+91 73374 12999",
    address:
      "First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh 530041",
    trialTerms:
      "10 full live classes completely free with zero advance payment. Stop at any time during the trial. ₹3,000 for the first month, then ₹2,000 per month.",
  },
  founderProfile: {
    name: "Mani\u00A0Sir",
    title: "Founder, Director & Lead Trainer",
    bio: "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
    altText: "Mani\u00A0Sir in the LIFE Spoken English classroom, Madhurawada",
  },
  galleryItems: [
    {
      id: "mani-sir-classroom",
      title: "Mani\u00A0Sir in the LIFE classroom, Madhurawada",
      category: "Classroom",
      mediaType: "Photo",
      order: 1,
    },
    {
      id: "video-4LtuKMa_cIQ",
      title: "Wake up, Get up or Rise?",
      category: "Lessons",
      mediaType: "Video",
      youtubeId: "4LtuKMa_cIQ",
      youtubeUrl: "https://www.youtube.com/watch?v=4LtuKMa_cIQ",
      order: 2,
    },
    {
      id: "video-5WTLd30TzjE",
      title: "In a fit of anger or rage (కోపంలో)",
      category: "Lessons",
      mediaType: "Video",
      youtubeId: "5WTLd30TzjE",
      youtubeUrl: "https://www.youtube.com/watch?v=5WTLd30TzjE",
      order: 3,
    },
    {
      id: "video-SwTh5KpmYJo",
      title: "Common Errors 14: Can vs Able to",
      category: "Lessons",
      mediaType: "Video",
      youtubeId: "SwTh5KpmYJo",
      youtubeUrl: "https://www.youtube.com/watch?v=SwTh5KpmYJo",
      order: 4,
    },
    {
      id: "video-7eD_4PgSrYs",
      title: "New online batch: 26 May 2025",
      category: "Orientation",
      mediaType: "Video",
      youtubeId: "7eD_4PgSrYs",
      youtubeUrl: "https://www.youtube.com/watch?v=7eD_4PgSrYs",
      order: 5,
    },
    {
      id: "video-Er5SNUeJwmk",
      title: "Official orientation by Mani\u00A0Sir",
      category: "Orientation",
      mediaType: "Video",
      youtubeId: "Er5SNUeJwmk",
      youtubeUrl: "https://www.youtube.com/watch?v=Er5SNUeJwmk",
      order: 6,
    },
  ],
  courseTracks: [
    {
      id: "life-course-everyday",
      trackId: "everyday",
      title: "Everyday Spoken English & Confidence",
      description: "Overcome fear, hesitation and stage fright in daily conversations.",
      highlights: [
        "Interactive situational speaking practice",
        "Overcoming hesitation and Mother Tongue Influence",
        "Everyday vocabulary for home, market and travel",
        "Telugu to English natural bridge technique",
      ],
      order: 1,
    },
    {
      id: "life-course-business",
      trackId: "business",
      title: "Corporate English & Professional Drafting",
      description: "Command meetings, write clear emails and present with authority.",
      highlights: [
        "Formal corporate email writing and reporting",
        "Client presentation and meeting dialogue",
        "Cross-cultural workplace communication",
        "Grammar accuracy without confusing jargon",
      ],
      order: 2,
    },
    {
      id: "life-course-interviews",
      trackId: "interviews",
      title: "Job Interview & Career Placement",
      description: "Crack HR rounds, GDs and technical interviews with ease.",
      highlights: [
        "Mock HR and technical interview drills",
        "Group Discussion techniques and leadership",
        "Resume and LinkedIn profile optimization",
        "Salary negotiation and self-introduction mastery",
      ],
      order: 3,
    },
    {
      id: "life-course-public-speaking",
      trackId: "public-speaking",
      title: "Public Speaking & Soft Skills",
      description: "Stand on stage, hold the microphone and speak without notes.",
      highlights: [
        "Stage presence and microphone handling",
        "Body language and audience eye contact",
        "Impromptu speaking (JAM sessions)",
        "Voice modulation and impactful storytelling",
      ],
      order: 4,
    },
    {
      id: "life-course-telugu-bridge",
      trackId: "telugu-bridge",
      title: "Telugu-Medium Learner Special Foundation",
      description: "Start from zero without shame; bridge your thoughts into English.",
      highlights: [
        "Bilingual explanation (Telugu to English)",
        "Zero grammatical intimidation",
        "Pronunciation corrections and tongue twisters",
        "Safe, compassionate classroom environment",
      ],
      order: 5,
    },
  ],
  faqItems: [
    {
      id: "life-faq-1",
      question: "Is the 10-day trial completely free?",
      answer:
        "Yes, 100% free with zero registration fee, advance payment or credit card requirement. Attend 10 full live classes, experience the methodology, and decide only if you see real progress.",
      category: "Trial & Fees",
      order: 1,
    },
    {
      id: "life-faq-2",
      question: "What are the fees after the 10-day trial?",
      answer:
        "After your trial, the fee is ₹3,000 for the first month (which includes your lifetime printed workbook and materials) and ₹2,000 per month thereafter. You pay month-to-month with no long-term lock-in.",
      category: "Trial & Fees",
      order: 2,
    },
    {
      id: "life-faq-3",
      question: "Can I join if I studied in Telugu medium and have zero English background?",
      answer:
        "Absolutely. More than 70% of our students come from Telugu medium or government school backgrounds. Mani\u00A0Sir explains foundational concepts using Telugu bridges so you understand without fear.",
      category: "Eligibility & Language",
      order: 3,
    },
    {
      id: "life-faq-4",
      question: "What are the daily batch timings?",
      answer:
        "We conduct batches throughout the day from 6:00 AM to 10:00 PM on weekdays. Both offline classroom batches in Madhurawada and live interactive online sessions via Google Meet are available.",
      category: "Schedule & Batches",
      order: 4,
    },
    {
      id: "life-faq-5",
      question: "What if I miss a weekday session?",
      answer:
        "We offer flexible weekend makeup classes on Saturday and Sunday. Mani\u00A0Sir personally reviews missed concepts so you never lag behind.",
      category: "Missed Classes & Support",
      order: 5,
    },
  ],
  testimonials: [
    {
      id: "life-testimonial-1",
      name: "Rajesh Kumar",
      role: "Software Engineer, Visakhapatnam",
      quote:
        "Before joining LIFE, I couldn't speak two sentences in team standups without sweating. Within 3 weeks of Mani\u00A0Sir's live practice, my hesitation completely vanished.",
      rating: 5,
      order: 1,
    },
    {
      id: "life-testimonial-2",
      name: "Sneha Reddy",
      role: "Homemaker, Madhurawada",
      quote:
        "I was terrified of attending my child's school PTMs because the teachers spoke in English. Mani\u00A0Sir gave me the confidence to speak fluently and proudly.",
      rating: 5,
      order: 2,
    },
    {
      id: "life-testimonial-3",
      name: "Venkat Rao",
      role: "Govt Employee, Vizag",
      quote:
        "Studied in Telugu medium all my life. Traditional institutes gave grammar notes that confused me more. LIFE taught me practical speaking without rote rules.",
      rating: 5,
      order: 3,
    },
  ],
};

async function cmaFetch(
  base: string,
  token: string,
  path: string,
  options?: RequestInit,
) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/vnd.contentful.management.v1+json",
    ...(options?.headers ?? {}),
  };
  return fetch(`${base}${path}`, { ...options, headers });
}

export async function onRequestGet(context: EventContext): Promise<Response> {
  const cookies = parseCookies(context.request.headers.get("Cookie"));
  const secret = context.env.ADMIN_SESSION_SECRET || "life-spoken-english-admin-secret-2026";
  const authenticated = await verifySession(cookies[ADMIN_COOKIE_NAME], secret);

  if (!authenticated) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  const space = context.env.CONTENTFUL_SPACE_ID;
  const token = context.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const env = context.env.CONTENTFUL_ENVIRONMENT || "master";

  if (!space || !token) {
    return jsonResponse(DEFAULT_ADMIN_DATA);
  }

  try {
    const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;

    const [
      settingsRes,
      annRes,
      founderRes,
      galleryRes,
      coursesRes,
      faqsRes,
      testimonialsRes,
    ] = await Promise.all([
      cmaFetch(base, token, "/entries/life-site-settings"),
      cmaFetch(base, token, "/entries/life-announcement-default"),
      cmaFetch(base, token, "/entries/life-founder-mani-sir"),
      cmaFetch(base, token, "/entries?content_type=galleryItem&limit=100"),
      cmaFetch(base, token, "/entries?content_type=courseTrack&order=fields.order&limit=20"),
      cmaFetch(base, token, "/entries?content_type=faqItem&order=fields.order&limit=100"),
      cmaFetch(base, token, "/entries?content_type=testimonialItem&order=fields.order&limit=100"),
    ]);

    const result = { ...DEFAULT_ADMIN_DATA };

    // 1. siteSettings
    if (settingsRes.ok) {
      const json = (await settingsRes.json()) as { fields?: Record<string, Record<string, unknown>> };
      const f = json.fields ?? {};
      const locale = Object.keys(f.heroTitle ?? {})[0] ?? "en-US";
      result.siteSettings = {
        heroTitle: cleanText(f.heroTitle?.[locale]) || result.siteSettings.heroTitle,
        heroSubtitle: cleanText(f.heroSubtitle?.[locale]) || result.siteSettings.heroSubtitle,
        primaryPhone: cleanText(f.primaryPhone?.[locale]) || result.siteSettings.primaryPhone,
        whatsappNumber: cleanText(f.whatsappNumber?.[locale]) || result.siteSettings.whatsappNumber,
        address: cleanText(f.address?.[locale]) || result.siteSettings.address,
        trialTerms: cleanText(f.trialTerms?.[locale]) || result.siteSettings.trialTerms,
      };
    }

    // 2. announcement
    if (annRes.ok) {
      const json = (await annRes.json()) as { fields?: Record<string, Record<string, unknown>> };
      const f = json.fields ?? {};
      const locale = Object.keys(f.message ?? {})[0] ?? "en-US";
      result.announcement = {
        message: cleanText(f.message?.[locale]) || result.announcement.message,
        ctaText: cleanText(f.badgeText?.[locale]) || result.announcement.ctaText,
        ctaUrl: "/#enroll",
        isActive: f.isActive?.[locale] !== false,
      };
    }

    // 3. founderProfile
    if (founderRes.ok) {
      const json = (await founderRes.json()) as { fields?: Record<string, Record<string, unknown>> };
      const f = json.fields ?? {};
      const locale = Object.keys(f.name ?? {})[0] ?? "en-US";
      result.founderProfile = {
        name: cleanText(f.name?.[locale]) || result.founderProfile.name,
        title: cleanText(f.title?.[locale]) || result.founderProfile.title,
        bio: cleanText(f.bio?.[locale]) || result.founderProfile.bio,
        altText: cleanText(f.altText?.[locale]) || result.founderProfile.altText,
      };
    }

    // 4. galleryItems
    if (galleryRes.ok) {
      const json = (await galleryRes.json()) as {
        items?: Array<{ sys: { id: string }; fields: Record<string, Record<string, unknown>> }>;
      };
      if (Array.isArray(json.items) && json.items.length > 0) {
        result.galleryItems = json.items.map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.title ?? {})[0] ?? "en-US";
          const yUrl = cleanText(f.youtubeUrl?.[locale]) || null;
          return {
            id: item.sys.id,
            title: cleanText(f.title?.[locale]) || "Gallery Item",
            category: (f.category?.[locale] as AdminGalleryItem["category"]) || "Lessons",
            mediaType: (f.mediaType?.[locale] === "Photo" ? "Photo" : "Video") as "Photo" | "Video",
            youtubeUrl: yUrl,
            youtubeId: extractYouTubeId(yUrl),
            order: typeof f.order?.[locale] === "number" ? f.order[locale] : 99,
          };
        }).sort((a, b) => a.order - b.order);
      }
    }

    // 5. courseTracks
    if (coursesRes.ok) {
      const json = (await coursesRes.json()) as {
        items?: Array<{ sys: { id: string }; fields: Record<string, Record<string, unknown>> }>;
      };
      if (Array.isArray(json.items) && json.items.length > 0) {
        result.courseTracks = json.items.map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.title ?? {})[0] ?? "en-US";
          const rawHighlights = f.highlights?.[locale];
          const highlights = Array.isArray(rawHighlights)
            ? rawHighlights.map((h) => cleanText(h)).filter(Boolean)
            : [];
          return {
            id: item.sys.id,
            title: cleanText(f.title?.[locale]),
            trackId: cleanText(f.trackId?.[locale]) || item.sys.id,
            description: cleanText(f.description?.[locale]),
            highlights,
            order: typeof f.order?.[locale] === "number" ? f.order[locale] : 0,
          };
        }).sort((a, b) => a.order - b.order);
      }
    }

    // 6. faqItems
    if (faqsRes.ok) {
      const json = (await faqsRes.json()) as {
        items?: Array<{ sys: { id: string }; fields: Record<string, Record<string, unknown>> }>;
      };
      if (Array.isArray(json.items) && json.items.length > 0) {
        result.faqItems = json.items.map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.question ?? {})[0] ?? "en-US";
          return {
            id: item.sys.id,
            question: cleanText(f.question?.[locale]),
            answer: cleanText(f.answer?.[locale]),
            category: cleanText(f.category?.[locale]) || "General",
            order: typeof f.order?.[locale] === "number" ? f.order[locale] : 0,
          };
        }).sort((a, b) => a.order - b.order);
      }
    }

    // 7. testimonials
    if (testimonialsRes.ok) {
      const json = (await testimonialsRes.json()) as {
        items?: Array<{ sys: { id: string }; fields: Record<string, Record<string, unknown>> }>;
      };
      if (Array.isArray(json.items) && json.items.length > 0) {
        result.testimonials = json.items.map((item) => {
          const f = item.fields ?? {};
          const locale = Object.keys(f.name ?? {})[0] ?? "en-US";
          return {
            id: item.sys.id,
            name: cleanText(f.name?.[locale]),
            role: cleanText(f.role?.[locale]),
            quote: cleanText(f.quote?.[locale]),
            rating: typeof f.rating?.[locale] === "number" ? f.rating[locale] : 5,
            order: typeof f.order?.[locale] === "number" ? f.order[locale] : 0,
          };
        }).sort((a, b) => a.order - b.order);
      }
    }

    return jsonResponse(result);
  } catch {
    return jsonResponse(DEFAULT_ADMIN_DATA);
  }
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const cookies = parseCookies(context.request.headers.get("Cookie"));
  const secret = context.env.ADMIN_SESSION_SECRET || "life-spoken-english-admin-secret-2026";
  const authenticated = await verifySession(cookies[ADMIN_COOKIE_NAME], secret);

  if (!authenticated) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await context.request.json()) as {
      announcement?: Partial<AdminAnnouncement>;
      siteSettings?: Partial<AdminSiteSettings>;
      founderProfile?: Partial<AdminFounderProfile>;
      galleryItems?: AdminGalleryItem[];
      deletedGalleryIds?: string[];
      courseTracks?: AdminCourseTrack[];
      faqItems?: AdminFaqItem[];
      deletedFaqIds?: string[];
      testimonials?: AdminTestimonialItem[];
      deletedTestimonialIds?: string[];
    };

    const space = context.env.CONTENTFUL_SPACE_ID;
    const token = context.env.CONTENTFUL_MANAGEMENT_TOKEN;
    const env = context.env.CONTENTFUL_ENVIRONMENT || "master";

    if (space && token) {
      const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;

      // Helper to upsert and publish a single CMA entry
      const upsertEntry = async (
        id: string,
        contentTypeId: string,
        fields: Record<string, unknown>,
      ) => {
        const getRes = await cmaFetch(base, token, `/entries/${id}`);
        const locale = "en-US";
        const localizedFields = Object.fromEntries(
          Object.entries(fields).map(([k, v]) => [k, { [locale]: v }]),
        );

        if (getRes.ok) {
          const current = (await getRes.json()) as { sys: { version: number }; fields?: Record<string, unknown> };
          const putRes = await cmaFetch(base, token, `/entries/${id}`, {
            method: "PUT",
            headers: { "X-Contentful-Version": String(current.sys.version) },
            body: JSON.stringify({ fields: { ...current.fields, ...localizedFields } }),
          });
          if (putRes.ok) {
            const putJson = (await putRes.json()) as { sys: { version: number } };
            await cmaFetch(base, token, `/entries/${id}/published`, {
              method: "PUT",
              headers: { "X-Contentful-Version": String(putJson.sys.version) },
            });
          }
        } else if (getRes.status === 404) {
          const putRes = await cmaFetch(base, token, `/entries/${id}`, {
            method: "PUT",
            headers: { "X-Contentful-Content-Type": contentTypeId },
            body: JSON.stringify({ fields: localizedFields }),
          });
          if (putRes.ok) {
            const putJson = (await putRes.json()) as { sys: { version: number } };
            await cmaFetch(base, token, `/entries/${id}/published`, {
              method: "PUT",
              headers: { "X-Contentful-Version": String(putJson.sys.version) },
            });
          }
        }
      };

      // Helper to unpublish and delete a single CMA entry
      const deleteEntry = async (id: string) => {
        const getRes = await cmaFetch(base, token, `/entries/${id}`);
        if (!getRes.ok) return;
        const current = (await getRes.json()) as { sys: { version: number; publishedVersion?: number } };
        if (current.sys.publishedVersion) {
          const unpubRes = await cmaFetch(base, token, `/entries/${id}/published`, {
            method: "DELETE",
            headers: { "X-Contentful-Version": String(current.sys.version) },
          });
          if (unpubRes.ok) {
            const unpubJson = (await unpubRes.json()) as { sys: { version: number } };
            await cmaFetch(base, token, `/entries/${id}`, {
              method: "DELETE",
              headers: { "X-Contentful-Version": String(unpubJson.sys.version) },
            });
          }
        } else {
          await cmaFetch(base, token, `/entries/${id}`, {
            method: "DELETE",
            headers: { "X-Contentful-Version": String(current.sys.version) },
          });
        }
      };

      // 1. Update siteSettings
      if (body.siteSettings) {
        await upsertEntry("life-site-settings", "siteSettings", {
          ...(body.siteSettings.heroTitle && { heroTitle: cleanText(body.siteSettings.heroTitle) }),
          ...(body.siteSettings.heroSubtitle && { heroSubtitle: cleanText(body.siteSettings.heroSubtitle) }),
          ...(body.siteSettings.primaryPhone && { primaryPhone: cleanText(body.siteSettings.primaryPhone) }),
          ...(body.siteSettings.whatsappNumber && { whatsappNumber: cleanText(body.siteSettings.whatsappNumber) }),
          ...(body.siteSettings.address && { address: cleanText(body.siteSettings.address) }),
          ...(body.siteSettings.trialTerms && { trialTerms: cleanText(body.siteSettings.trialTerms) }),
        });
      }

      // 2. Update announcement
      if (body.announcement) {
        await upsertEntry("life-announcement-default", "announcement", {
          ...(body.announcement.message && { message: cleanText(body.announcement.message) }),
          ...(body.announcement.ctaText !== undefined && { badgeText: cleanText(body.announcement.ctaText) }),
          ...(body.announcement.isActive !== undefined && { isActive: Boolean(body.announcement.isActive) }),
        });
      }

      // 3. Update founderProfile
      if (body.founderProfile) {
        await upsertEntry("life-founder-mani-sir", "founderProfile", {
          ...(body.founderProfile.name && { name: cleanText(body.founderProfile.name) }),
          ...(body.founderProfile.title && { title: cleanText(body.founderProfile.title) }),
          ...(body.founderProfile.bio && { bio: cleanText(body.founderProfile.bio) }),
          ...(body.founderProfile.altText && { altText: cleanText(body.founderProfile.altText) }),
        });
      }

      // 4. Update gallery items (adding/editing videos)
      if (Array.isArray(body.galleryItems)) {
        for (const item of body.galleryItems) {
          const yId = item.youtubeId || extractYouTubeId(item.youtubeUrl);
          const fields: Record<string, unknown> = {
            title: cleanText(item.title),
            category: item.category || "Lessons",
            mediaType: item.mediaType || "Video",
            order: Number(item.order) || 1,
            ...(item.youtubeUrl && { youtubeUrl: item.youtubeUrl.trim() }),
          };
          const itemId = item.id.startsWith("new-")
            ? `life-gallery-video-${yId || Date.now()}`
            : item.id;
          await upsertEntry(itemId, "galleryItem", fields);
        }
      }

      // 4b. Deleted gallery items
      if (Array.isArray(body.deletedGalleryIds)) {
        for (const id of body.deletedGalleryIds) {
          await deleteEntry(id);
        }
      }

      // 5. Update courseTracks
      if (Array.isArray(body.courseTracks)) {
        for (const track of body.courseTracks) {
          await upsertEntry(track.id, "courseTrack", {
            title: cleanText(track.title),
            trackId: cleanText(track.trackId) || track.id,
            description: cleanText(track.description),
            highlights: (track.highlights ?? []).map((h) => cleanText(h)).filter(Boolean),
            order: Number(track.order) || 1,
          });
        }
      }

      // 6. Update faqItems
      if (Array.isArray(body.faqItems)) {
        for (const faq of body.faqItems) {
          const faqId = faq.id.startsWith("new-") ? `life-faq-${Date.now()}` : faq.id;
          await upsertEntry(faqId, "faqItem", {
            question: cleanText(faq.question),
            answer: cleanText(faq.answer),
            category: cleanText(faq.category) || "Trial & Fees",
            order: Number(faq.order) || 1,
          });
        }
      }

      // 6b. Deleted FAQ items
      if (Array.isArray(body.deletedFaqIds)) {
        for (const id of body.deletedFaqIds) {
          await deleteEntry(id);
        }
      }

      // 7. Update testimonials
      if (Array.isArray(body.testimonials)) {
        for (const test of body.testimonials) {
          const testId = test.id.startsWith("new-") ? `life-testimonial-${Date.now()}` : test.id;
          await upsertEntry(testId, "testimonialItem", {
            name: cleanText(test.name),
            role: cleanText(test.role),
            quote: cleanText(test.quote),
            rating: Number(test.rating) || 5,
            order: Number(test.order) || 1,
          });
        }
      }

      // 7b. Deleted testimonials
      if (Array.isArray(body.deletedTestimonialIds)) {
        for (const id of body.deletedTestimonialIds) {
          await deleteEntry(id);
        }
      }

      // Trigger Cloudflare Pages static rebuild
      if (context.env.CLOUDFLARE_DEPLOY_HOOK_URL) {
        await fetch(context.env.CLOUDFLARE_DEPLOY_HOOK_URL, { method: "POST" });
      }
    }

    return jsonResponse({
      success: true,
      message: "Changes saved! Your website is rebuilding and will update in ~60 seconds.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update content";
    return jsonResponse({ error: message }, { status: 500 });
  }
}
