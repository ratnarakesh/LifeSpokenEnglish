import {
  ADMIN_COOKIE_NAME,
  DEFAULT_SESSION_SECRET,
  jsonResponse,
  parseCookies,
  verifySession,
  type Env,
} from "./_shared";

interface EventContext {
  request: Request;
  env: Env;
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  // Always return JSON — never let the function throw uncaught
  try {
    const cookies = parseCookies(context.request.headers.get("Cookie"));
    const sessionToken = cookies[ADMIN_COOKIE_NAME];
    const secret = context.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET;
    const isValid = await verifySession(sessionToken, secret);
    if (!isValid) {
      return jsonResponse({ success: false, error: "Unauthorized — session expired. Please log in again." }, { status: 401 });
    }

    const deployHook = context.env.CLOUDFLARE_DEPLOY_HOOK_URL?.trim();
    if (!deployHook || !deployHook.startsWith("http")) {
      return jsonResponse(
        {
          success: false,
          error:
            "CLOUDFLARE_DEPLOY_HOOK_URL is not set in Cloudflare Pages environment variables. " +
            "Go to Cloudflare Dashboard → Pages → lifespokenenglish → Settings → Environment Variables and add it.",
        },
        { status: 400 },
      );
    }

    let hookRes: Response;
    try {
      hookRes = await fetch(deployHook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (fetchErr: unknown) {
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      return jsonResponse(
        { success: false, error: `Could not reach Cloudflare deploy hook: ${msg}` },
        { status: 502 },
      );
    }

    if (!hookRes.ok) {
      const body = await hookRes.text().catch(() => "");
      return jsonResponse(
        {
          success: false,
          error: `Deploy hook returned HTTP ${hookRes.status}. Response: ${body.slice(0, 200)}`,
        },
        { status: 502 },
      );
    }

    return jsonResponse({
      success: true,
      message: "Deployment triggered! Your live website will update in ~60 seconds.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected server error";
    return jsonResponse({ success: false, error: `Server error: ${message}` }, { status: 500 });
  }
}
