import {
  ADMIN_COOKIE_NAME,
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
  const cookies = parseCookies(context.request.headers.get("Cookie"));
  const sessionToken = cookies[ADMIN_COOKIE_NAME];
  const secret = context.env.ADMIN_SESSION_SECRET ?? "life-spoken-english-local-secret-2026";
  const isValid = await verifySession(sessionToken, secret);
  if (!isValid) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }

  const deployHook = context.env.CLOUDFLARE_DEPLOY_HOOK_URL;
  if (!deployHook || !deployHook.startsWith("http")) {
    return jsonResponse(
      { success: false, error: "Deploy hook URL not configured." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(deployHook, { method: "POST" });
    if (!res.ok) {
      return jsonResponse(
        { success: false, error: `Deploy hook returned HTTP ${res.status}` },
        { status: 502 },
      );
    }
    return jsonResponse({
      success: true,
      message: "Deployment started! The live site will refresh in ~60 seconds.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to trigger deploy hook";
    return jsonResponse({ success: false, error: message }, { status: 500 });
  }
}
