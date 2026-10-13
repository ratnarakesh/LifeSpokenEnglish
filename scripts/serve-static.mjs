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
