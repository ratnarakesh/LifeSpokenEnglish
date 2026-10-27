import {
  ADMIN_COOKIE_NAME,
  jsonResponse,
  parseCookies,
  signSession,
  verifySession,
  type Env,
} from "./_shared";

interface EventContext {
  request: Request;
  env: Env;
}

export async function onRequestGet(context: EventContext): Promise<Response> {
  const cookies = parseCookies(context.request.headers.get("Cookie"));
  const secret = context.env.ADMIN_SESSION_SECRET || "life-spoken-english-admin-secret-2026";
  const authenticated = await verifySession(cookies[ADMIN_COOKIE_NAME], secret);
  return jsonResponse({ authenticated });
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  try {
    const body = (await context.request.json()) as { passcode?: string; action?: string };

    if (body.action === "logout") {
      return jsonResponse(
        { ok: true },
        {
          headers: {
            "Set-Cookie": `${ADMIN_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
          },
        },
      );
    }

    const expected = (context.env.ADMIN_PASSCODE || "7337").trim();
    const provided = (body.passcode || "").trim();
    if (!provided || provided !== expected) {
      return jsonResponse({ error: "Invalid passcode" }, { status: 401 });
    }

    const secret = context.env.ADMIN_SESSION_SECRET || "life-spoken-english-admin-secret-2026";
    const token = await signSession(secret);

    return jsonResponse(
      { ok: true },
      {
        headers: {
          "Set-Cookie": `${ADMIN_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
        },
      },
    );
  } catch {
    return jsonResponse({ error: "Malformed request" }, { status: 400 });
  }
}
