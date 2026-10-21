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

export async function onRequestPost(context: EventContext): Promise<Response> {
  const cookies = parseCookies(context.request.headers.get("Cookie"));
  const secret = context.env.ADMIN_SESSION_SECRET || "life-spoken-english-admin-secret-2026";
  const authenticated = await verifySession(cookies[ADMIN_COOKIE_NAME], secret);

  if (!authenticated) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await context.request.formData();
    const file = formData.get("file");
    const titleRaw = formData.get("title");
    const target = formData.get("target"); // "founderPortrait" | "galleryPhoto"
    const categoryRaw = formData.get("category");
    const orderRaw = formData.get("order");

    if (!file || typeof file === "string") {
      return jsonResponse({ error: "No image file provided" }, { status: 400 });
    }

    if (target !== "founderPortrait" && target !== "galleryPhoto") {
      return jsonResponse(
        { error: "Invalid upload target. Must be founderPortrait or galleryPhoto." },
        { status: 400 },
      );
    }

    const title = cleanText(titleRaw) || (target === "founderPortrait" ? "Mani\u00A0Sir Official Portrait" : "Classroom Photo");
    const category = cleanText(categoryRaw) || "Classroom";
    const order = Number(orderRaw) || 1;

    const space = context.env.CONTENTFUL_SPACE_ID;
    const token = context.env.CONTENTFUL_MANAGEMENT_TOKEN;
    const env = context.env.CONTENTFUL_ENVIRONMENT || "master";

    // If Contentful is not configured (e.g. preview mode or local testing), return success mock
    if (!space || !token) {
      return jsonResponse({
        success: true,
        assetUrl: target === "founderPortrait" ? "/media/people/mani-sir-portrait-v2.webp" : "/media/people/classroom-v2.webp",
        mock: true,
        message: "Image received in preview mode. Contentful credentials not configured.",
      });
    }

    const fileBuffer = await file.arrayBuffer();
    const contentType = file.type || "image/jpeg";
    const fileName = file.name || "upload.jpg";

    // 1. Upload binary file to Contentful Uploads API
    const uploadRes = await fetch(
      `https://upload.contentful.com/spaces/${space}/uploads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
        },
        body: fileBuffer,
      },
    );

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      return jsonResponse(
        { error: `Contentful upload failed (${uploadRes.status}): ${errText}` },
        { status: 500 },
      );
    }

    const uploadJson = (await uploadRes.json()) as { sys: { id: string } };
    const uploadId = uploadJson.sys.id;

    // 2. Create or Update Contentful Asset
    const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;
    const assetId = target === "founderPortrait" ? "life-mani-sir-portrait" : `life-gallery-asset-${Date.now()}`;

    const assetPayload = {
      fields: {
        title: { "en-US": title },
        file: {
          "en-US": {
            contentType,
            fileName,
            uploadFrom: {
              sys: {
                type: "Link",
                linkType: "Upload",
                id: uploadId,
              },
            },
          },
        },
      },
    };

    let assetVersion = 1;
    const existingAssetRes = await cmaFetch(base, token, `/assets/${assetId}`);
    if (existingAssetRes.ok) {
      const existing = (await existingAssetRes.json()) as { sys: { version: number } };
      assetVersion = existing.sys.version;
      const updateRes = await cmaFetch(base, token, `/assets/${assetId}`, {
        method: "PUT",
        headers: { "X-Contentful-Version": assetVersion.toString() },
        body: JSON.stringify(assetPayload),
      });
      if (!updateRes.ok) {
        return jsonResponse({ error: "Failed to update Contentful asset" }, { status: 500 });
      }
      const updated = (await updateRes.json()) as { sys: { version: number } };
      assetVersion = updated.sys.version;
    } else {
      const createRes = await cmaFetch(base, token, `/assets/${assetId}`, {
        method: "PUT",
        body: JSON.stringify(assetPayload),
      });
      if (!createRes.ok) {
        return jsonResponse({ error: "Failed to create Contentful asset" }, { status: 500 });
      }
      const created = (await createRes.json()) as { sys: { version: number } };
      assetVersion = created.sys.version;
    }

    // 3. Process Asset
    await cmaFetch(base, token, `/assets/${assetId}/files/en-US/process`, {
      method: "PUT",
      headers: { "X-Contentful-Version": assetVersion.toString() },
    });

    // 4. Poll until processed (up to 5 attempts with 1.5s delay)
    let processedUrl: string | null = null;
    for (let i = 0; i < 5; i++) {
      await new Promise((r) => setTimeout(r, 1500));
      const pollRes = await cmaFetch(base, token, `/assets/${assetId}`);
      if (pollRes.ok) {
        const pollJson = (await pollRes.json()) as {
          sys: { version: number };
          fields?: { file?: { "en-US"?: { url?: string } } };
        };
        assetVersion = pollJson.sys.version;
        if (pollJson.fields?.file?.["en-US"]?.url) {
          processedUrl = pollJson.fields.file["en-US"].url;
          if (processedUrl.startsWith("//")) {
            processedUrl = `https:${processedUrl}`;
          }
          break;
        }
      }
    }

    // 5. Publish Asset
    const publishRes = await cmaFetch(base, token, `/assets/${assetId}/published`, {
      method: "PUT",
      headers: { "X-Contentful-Version": assetVersion.toString() },
    });
    if (!publishRes.ok) {
      console.warn("Asset publish warning:", await publishRes.text());
    }

    // 6. Link to Founder Profile or Gallery Item
    if (target === "founderPortrait") {
      const founderRes = await cmaFetch(base, token, "/entries/life-founder-mani-sir");
      if (founderRes.ok) {
        const founder = (await founderRes.json()) as {
          sys: { version: number };
          fields?: Record<string, unknown>;
        };
        const fields = founder.fields ?? {};
        fields.portraitImage = {
          "en-US": {
            sys: { type: "Link", linkType: "Asset", id: assetId },
          },
        };
        const updateFounder = await cmaFetch(base, token, "/entries/life-founder-mani-sir", {
          method: "PUT",
          headers: { "X-Contentful-Version": founder.sys.version.toString() },
          body: JSON.stringify({ fields }),
        });
        if (updateFounder.ok) {
          const upJson = (await updateFounder.json()) as { sys: { version: number } };
          await cmaFetch(base, token, "/entries/life-founder-mani-sir/published", {
            method: "PUT",
            headers: { "X-Contentful-Version": upJson.sys.version.toString() },
          });
        }
      }
    } else if (target === "galleryPhoto") {
      const entryId = `life-gallery-photo-${Date.now()}`;
      const galleryPayload = {
        fields: {
          title: { "en-US": title },
          category: { "en-US": category },
          mediaType: { "en-US": "Photo" },
          order: { "en-US": order },
          image: {
            "en-US": {
              sys: { type: "Link", linkType: "Asset", id: assetId },
            },
          },
        },
      };
      const createItemRes = await cmaFetch(base, token, `/entries/${entryId}`, {
        method: "PUT",
        headers: { "X-Contentful-Content-Type": "galleryItem" },
        body: JSON.stringify(galleryPayload),
      });
      if (createItemRes.ok) {
        const createdItem = (await createItemRes.json()) as { sys: { version: number } };
        await cmaFetch(base, token, `/entries/${entryId}/published`, {
          method: "PUT",
          headers: { "X-Contentful-Version": createdItem.sys.version.toString() },
        });
      }
    }

    // 7. Trigger Cloudflare Deploy Hook if configured
    if (context.env.CLOUDFLARE_DEPLOY_HOOK_URL) {
      try {
        await fetch(context.env.CLOUDFLARE_DEPLOY_HOOK_URL, { method: "POST" });
      } catch (e) {
        console.warn("Deploy hook error:", e);
      }
    }

    return jsonResponse({
      success: true,
      assetUrl: processedUrl || "/media/people/mani-sir-portrait-v2.webp",
      message: "Photo uploaded and published successfully! Rebuilding site...",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error during upload";
    return jsonResponse({ error: message }, { status: 500 });
  }
}
