// Minimal zero-dependency static server for the exported site (./out).
// Usage: node scripts/serve-static.mjs [dir=out] [port=8000]
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { constants as zlib, createBrotliCompress, createGzip } from "node:zlib";

const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? process.env.PORT ?? 8000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const candidates = [clean, path.join(clean, "index.html"), `${clean}.html`];
  for (const candidate of candidates) {
    const full = path.join(root, candidate);
    if (full !== root && !full.startsWith(root + path.sep)) continue;
    try {
      if ((await stat(full)).isFile()) return full;
    } catch {}
  }
  return null;
}

const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".webmanifest", ".txt", ".svg"]);

// Mirrors production hosting (Cloudflare): Brotli/gzip for text assets, immutable caching for hashed files.
createServer(async (req, res) => {
  const urlPath = req.url?.split("?")[0] ?? "/";

  // Local / preview mock API handler for Cloudflare Pages Functions
  if (urlPath === "/api/admin/auth") {
    if (req.method === "POST") {
      let bodyStr = "";
      req.on("data", (chunk) => (bodyStr += chunk));
      req.on("end", () => {
        try {
          const body = JSON.parse(bodyStr || "{}");
          if (body.action === "logout") {
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Set-Cookie": "admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
            });
            return res.end(JSON.stringify({ ok: true }));
          }
          const expected = process.env.ADMIN_PASSCODE || "7337";
          if (body.passcode === expected) {
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Set-Cookie": "admin_session=mock_token_preview; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400",
            });
            return res.end(JSON.stringify({ ok: true }));
          }
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Invalid passcode" }));
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Malformed JSON" }));
        }
      });
      return;
    }
    const hasCookie = (req.headers.cookie ?? "").includes("admin_session=mock_token_preview");
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ authenticated: hasCookie }));
  }

  if (urlPath === "/api/admin/content") {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
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
        }),
      );
    }
    if (req.method === "POST") {
      let bodyStr = "";
      req.on("data", (chunk) => (bodyStr += chunk));
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            success: true,
            message: "Changes saved! Your website is rebuilding and will update in ~60 seconds.",
          }),
        );
      });
      return;
    }
  }

  const file = await resolveFile(req.url ?? "/");
  const target = file ?? path.join(root, "404.html");
  const ext = path.extname(target);
  const accept = String(req.headers["accept-encoding"] ?? "");
  const encoding = !COMPRESSIBLE.has(ext) ? null : accept.includes("br") ? "br" : accept.includes("gzip") ? "gzip" : null;
  res.writeHead(file ? 200 : 404, {
    "Content-Type": TYPES[ext] ?? "application/octet-stream",
    "Cache-Control": target.includes(`${path.sep}_next${path.sep}static${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "no-cache",
    Vary: "Accept-Encoding",
    ...(encoding && { "Content-Encoding": encoding }),
  });
  const stream = createReadStream(target).on("error", () => res.end());
  if (encoding === "br") stream.pipe(createBrotliCompress({ params: { [zlib.BROTLI_PARAM_QUALITY]: 5 } })).pipe(res);
  else if (encoding === "gzip") stream.pipe(createGzip()).pipe(res);
  else stream.pipe(res);
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
