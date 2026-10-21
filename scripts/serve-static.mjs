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
            address:
              "First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh 530041",
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
              ],
              order: 1,
            },
            {
              id: "life-course-business",
              trackId: "business",
              title: "Corporate English & Professional Drafting",
              description: "Command meetings, write clear emails and present with authority.",
              highlights: ["Formal corporate email writing and reporting"],
              order: 2,
            },
          ],
          faqItems: [
            {
              id: "life-faq-1",
              question: "Is the 10-day trial completely free?",
              answer:
                "Yes, 100% free with zero registration fee, advance payment or credit card requirement.",
              category: "Trial & Fees",
              order: 1,
            },
            {
              id: "life-faq-2",
              question: "What are the fees after the 10-day trial?",
              answer:
                "After your trial, the fee is ₹3,000 for the first month and ₹2,000 per month thereafter.",
              category: "Trial & Fees",
              order: 2,
            },
          ],
          testimonials: [
            {
              id: "life-testimonial-1",
              name: "Rajesh Kumar",
              role: "Software Engineer, Visakhapatnam",
              quote:
                "Before joining LIFE, I couldn't speak two sentences in team standups without sweating.",
              rating: 5,
              order: 1,
            },
          ],
          legalDocuments: [
            {
              id: "life-legal-privacy-policy",
              slug: "privacy-policy",
              title: "Privacy Policy & Data Notice",
              lastUpdated: "11 October 2026",
              content:
                "We keep this simple: this website uses no cookies, no analytics and no tracking. We only receive your details when you choose to message or call us.",
            },
            {
              id: "life-legal-terms-of-use",
              slug: "terms-of-use",
              title: "Terms of Use & Class Policies",
              lastUpdated: "11 October 2026",
              content:
                "By using this website you agree to these terms. They also summarise how classes at LIFE Spoken English work, so there are no surprises.",
            },
          ],
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
