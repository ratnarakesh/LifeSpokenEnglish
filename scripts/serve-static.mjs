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
          isConfigured: true,
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
            logoStoryEagle:
              "High on a cliff above the Vizag coast, a young eagle sat at the edge of its nest every morning, watching the others soar.\n\nIt knew everything about flying. It had watched a thousand flights and could explain every feather. But each time the wind called, its wings stayed folded. What if I fall? What if they laugh?\n\nOne morning, an old eagle landed beside it. He did not lecture. He did not push. He simply said, \"Fly with me. Just a little today.\"\n\nThey stepped into the warm wind together. The young eagle wobbled, dipped, and then, for the very first time, it rose. Below them, over the sea, the sun was rising too.\n\nThat morning the young eagle learned something no book had taught it: it never needed more knowledge. It needed someone to fly beside it, and the courage to open its wings.\n\nEvery learner who walks into LIFE is that young eagle: full of knowledge, held back by fear. Our job is to fly beside you until your own wings take over.",
            lifeAcronymL: "Live",
            lifeAcronymI: "It",
            lifeAcronymF: "For",
            lifeAcronymE: "Eternity",
            trialBadgeText: "5.0 Star Rated on Google by 1,800+ Students & Professionals",
            heroSubheadline:
              "Practical, interactive Spoken English & Soft Skills training led personally by Mani\u00A0Sir. Learn without fear or grammar intimidation in Visakhapatnam or via Live Online classes.",
            coursesSectionTitle: "Every Stage of English Fluency",
            coursesSectionSubtitle: "From foundational hesitation removal to stage-ready executive communication.",
            promisesSectionTitle: "The 10 LIFE Promises",
            promisesSectionSubtitle: "Ten commitments you won't find anywhere else, straight from Mani\u00A0Sir.",
            contactAddress:
              "First Floor, Beside HP Petrol Bunk, Car Shed Junction, PM Palem, Madhurawada, Visakhapatnam, Andhra Pradesh 530041",
            contactPhone: "+91 73374 12999",
            contactEmail: "lifebymanisir@gmail.com",
            whatsappMessage:
              "Hello Mani Sir, I am interested in the 10 Free Trial Classes at LIFE Spoken English. Please share the next batch details.",
          },
          storyLore: {
            eagleStoryTitle: "The Young Eagle Who Was Afraid to Fly",
            eagleStorySubtitle: "The Story Inside Our Logo",
            eagleStoryParagraphs:
              "High on a cliff above the Vizag coast, a young eagle sat at the edge of its nest every morning, watching the others soar.\n\nIt knew everything about flying. It had watched a thousand flights and could explain every feather. But each time the wind called, its wings stayed folded. What if I fall? What if they laugh?\n\nOne morning, an old eagle landed beside it. He did not lecture. He did not push. He simply said, \"Fly with me. Just a little today.\"\n\nThey stepped into the warm wind together. The young eagle wobbled, dipped, and then, for the very first time, it rose. Below them, over the sea, the sun was rising too.\n\nThat morning the young eagle learned something no book had taught it: it never needed more knowledge. It needed someone to fly beside it, and the courage to open its wings.",
            eagleStoryMoral:
              "Every learner who walks into LIFE is that young eagle: full of knowledge, held back by fear. Our job is to fly beside you until your own wings take over.",
            spiritOfLifeTitle: "The Meaning Behind Our Name",
            spiritOfLifeIntro:
              "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.\n\nWhen you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
            spiritOfLifePoints: JSON.stringify(
              [
                "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.",
                "When you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
              ],
              null,
              2,
            ),
            pillarLTitle: "Live",
            pillarLText: "English not as an academic subject, but as a living life skill you will carry forever.",
            pillarITitle: "It",
            pillarIText: "Language lives on your tongue, not in a notebook. Active speaking drills from day one.",
            pillarFTitle: "For",
            pillarFText: "Purpose-driven communication for campus placements, corporate growth, and life.",
            pillarETitle: "Eternity",
            pillarEText: "Unshakeable confidence that stays with you forever and transforms how you carry yourself.",
          },
          founderProfile: {
            name: "Mani\u00A0Sir",
            title: "Founder, Director & Lead Trainer",
            bio: "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
            altText: "Mani\u00A0Sir in the LIFE Spoken English classroom, Madhurawada",
            portraitUrl: "/media/people/mani-sir-portrait-v2.webp",
            storyHeadline: "Meet Mani\u00A0Sir, the heart of LIFE",
            spiritOfLifeTitle: "The Meaning Behind Our Name",
            spiritOfLifeContent:
              "Most people approach English like a temporary subject: something you study just to pass an exam, clear an interview, or memorize for a few weeks. But language is not a school textbook. Language is life itself.\n\nWhen you acquire true confidence in speaking, it does not disappear after an interview. It stays with you when you talk to your children, when you present in boardrooms, when you travel the world, and when you stand on any public stage. It transforms how you carry yourself forever.",
            journeyMilestones: JSON.stringify([
              {
                year: "2018",
                title: "The first classroom",
                body: "A single room at Vasu Brothers Nilayam, Midhilapuri VUDA Colony, Madhurawada.",
              },
              {
                year: "2024",
                title: "LIFE goes digital",
                body: "Mani\u00A0Sir's YouTube channel begins sharing everyday English lessons, Telugu to English.",
              },
              {
                year: "2025",
                title: "Live online batches",
                body: "Interactive live online batches welcome learners far beyond Vizag.",
              },
              {
                year: "Today",
                title: "1,800+ five-star reviews",
                body: "A perfect 5.0 on Google, earned one confident speaker at a time.",
              },
            ]),
            teachingPhilosophy:
              "Some teachers teach English. Mani\u00A0Sir teaches people to believe in their own voice.\n\nK. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.",
            bioHeadline: "Teaching with Empathy & Conviction",
            bioParagraphs:
              "K. Maneendra Kumar, known to thousands of learners simply as Mani\u00A0Sir, founded LIFE in Madhurawada, Visakhapatnam with one simple belief: nobody is bad at English. Most people have just never been given a safe place to speak it.\n\nIn his classroom, mistakes are not punished; they are welcomed as proof that you are trying. Lessons sound like real life: waking up, travelling, explaining, negotiating, interviewing. A new word is not finished until every student has said it aloud and used it in a sentence of their own.\n\nBy bridging every idea from Telugu to English, he turns the language people feared most into something that feels familiar. Students often say his classes feel more like watching a movie than sitting through a lecture.\n\nToday his lessons travel far beyond one classroom through YouTube and live online batches. But the goal has never changed: the day each student speaks without fear.",
            missionStatement:
              "To eliminate the fear of English and empower learners with unshakeable speaking confidence that lasts for eternity.",
            statsExperience: "20+ Years",
            statsStudents: "25,000+ Students",
            statsBatches: "1,200+ Batches",
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
            message:
              "Saved to CMS! Click 'Publish Changes to Live Site' when you are ready to update the public site.",
          }),
        );
      });
      return;
    }
  }

  if (urlPath === "/api/admin/deploy") {
    if (req.method === "POST") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          success: true,
          message: "Deployment started! Your live website will update in ~60 seconds.",
        }),
      );
    }
  }

  if (urlPath === "/api/admin/upload") {
    if (req.method === "POST") {
      let bodyStr = "";
      req.on("data", (chunk) => (bodyStr += chunk));
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            success: true,
            assetUrl: "/media/people/mani-sir-portrait-v2.webp",
            message: "Photo uploaded to CMS. Remember to publish to push live.",
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
