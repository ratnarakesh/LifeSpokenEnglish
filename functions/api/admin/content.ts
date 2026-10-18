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

interface AnnouncementData {
  message: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

interface SiteSettingsData {
  heroTitle: string;
  heroSubtitle: string;
  primaryPhone: string;
  whatsappNumber: string;
  trialTerms: string;
}

const DEFAULT_CONTENT = {
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
    trialTerms:
      "10 full live classes completely free with zero advance payment. Stop at any time during the trial. ₹3,000 for the first month, then ₹2,000 per month.",
  },
};

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
    return jsonResponse(DEFAULT_CONTENT);
  }

  try {
    const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;
    const headers = { Authorization: `Bearer ${token}` };

    const [settingsRes, annRes] = await Promise.all([
      fetch(`${base}/entries/life-site-settings`, { headers }),
      fetch(`${base}/entries/life-announcement-default`, { headers }),
    ]);

    let siteSettings = DEFAULT_CONTENT.siteSettings;
    if (settingsRes.ok) {
      const json = (await settingsRes.json()) as { fields?: Record<string, Record<string, unknown>> };
      const f = json.fields ?? {};
      const locale = Object.keys(f.heroTitle ?? {})[0] ?? "en-US";
      siteSettings = {
        heroTitle: cleanText(f.heroTitle?.[locale]) || siteSettings.heroTitle,
        heroSubtitle: cleanText(f.heroSubtitle?.[locale]) || siteSettings.heroSubtitle,
        primaryPhone: cleanText(f.primaryPhone?.[locale]) || siteSettings.primaryPhone,
        whatsappNumber: cleanText(f.whatsappNumber?.[locale]) || siteSettings.whatsappNumber,
        trialTerms: cleanText(f.trialTerms?.[locale]) || siteSettings.trialTerms,
      };
    }

    let announcement = DEFAULT_CONTENT.announcement;
    if (annRes.ok) {
      const json = (await annRes.json()) as { fields?: Record<string, Record<string, unknown>> };
      const f = json.fields ?? {};
      const locale = Object.keys(f.message ?? {})[0] ?? "en-US";
      announcement = {
        message: cleanText(f.message?.[locale]) || announcement.message,
        ctaText: cleanText(f.badgeText?.[locale]) || announcement.ctaText,
        ctaUrl: "/#enroll",
        isActive: f.isActive?.[locale] !== false,
      };
    }

    return jsonResponse({ siteSettings, announcement });
  } catch {
    return jsonResponse(DEFAULT_CONTENT);
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
      announcement?: Partial<AnnouncementData>;
      siteSettings?: Partial<SiteSettingsData>;
    };

    const space = context.env.CONTENTFUL_SPACE_ID;
    const token = context.env.CONTENTFUL_MANAGEMENT_TOKEN;
    const env = context.env.CONTENTFUL_ENVIRONMENT || "master";

    if (space && token) {
      const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
      };

      // 1. Update siteSettings if provided
      if (body.siteSettings) {
        const getRes = await fetch(`${base}/entries/life-site-settings`, { headers });
        if (getRes.ok) {
          const current = (await getRes.json()) as {
            sys: { version: number };
            fields?: Record<string, Record<string, unknown>>;
          };
          const locale = Object.keys(current.fields?.heroTitle ?? {})[0] ?? "en-US";
          const updatedFields = {
            ...current.fields,
            ...(body.siteSettings.heroTitle && {
              heroTitle: { [locale]: cleanText(body.siteSettings.heroTitle) },
            }),
            ...(body.siteSettings.heroSubtitle && {
              heroSubtitle: { [locale]: cleanText(body.siteSettings.heroSubtitle) },
            }),
            ...(body.siteSettings.primaryPhone && {
              primaryPhone: { [locale]: cleanText(body.siteSettings.primaryPhone) },
            }),
            ...(body.siteSettings.whatsappNumber && {
              whatsappNumber: { [locale]: cleanText(body.siteSettings.whatsappNumber) },
            }),
            ...(body.siteSettings.trialTerms && {
              trialTerms: { [locale]: cleanText(body.siteSettings.trialTerms) },
            }),
          };

          const putRes = await fetch(`${base}/entries/life-site-settings`, {
            method: "PUT",
            headers: { ...headers, "X-Contentful-Version": String(current.sys.version) },
            body: JSON.stringify({ fields: updatedFields }),
          });
          if (putRes.ok) {
            const putJson = (await putRes.json()) as { sys: { version: number } };
            await fetch(`${base}/entries/life-site-settings/published`, {
              method: "PUT",
              headers: { ...headers, "X-Contentful-Version": String(putJson.sys.version) },
            });
          }
        }
      }

      // 2. Update announcement if provided
      if (body.announcement) {
        const getRes = await fetch(`${base}/entries/life-announcement-default`, { headers });
        if (getRes.ok) {
          const current = (await getRes.json()) as {
            sys: { version: number };
            fields?: Record<string, Record<string, unknown>>;
          };
          const locale = Object.keys(current.fields?.message ?? {})[0] ?? "en-US";
          const updatedFields = {
            ...current.fields,
            ...(body.announcement.message && {
              message: { [locale]: cleanText(body.announcement.message) },
            }),
            ...(body.announcement.ctaText !== undefined && {
              badgeText: { [locale]: cleanText(body.announcement.ctaText) },
            }),
            ...(body.announcement.isActive !== undefined && {
              isActive: { [locale]: Boolean(body.announcement.isActive) },
            }),
          };

          const putRes = await fetch(`${base}/entries/life-announcement-default`, {
            method: "PUT",
            headers: { ...headers, "X-Contentful-Version": String(current.sys.version) },
            body: JSON.stringify({ fields: updatedFields }),
          });
          if (putRes.ok) {
            const putJson = (await putRes.json()) as { sys: { version: number } };
            await fetch(`${base}/entries/life-announcement-default/published`, {
              method: "PUT",
              headers: { ...headers, "X-Contentful-Version": String(putJson.sys.version) },
            });
          }
        }
      }

      // 3. Trigger rebuild hook if configured
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
