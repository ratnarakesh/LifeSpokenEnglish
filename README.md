# LIFE Spoken English & Soft Skills Institute

Official website for LIFE: Spoken English & Soft Skills Training Institute (Mani Sir), Madhurawada, Visakhapatnam.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 (CSS-only animations) · Radix UI (Dialog, Tabs) · Lucide icons · Installable PWA (native service worker) · Playwright E2E

## Commands

```bash
npm install          # uses public npm registry via project .npmrc
npm run dev          # http://localhost:3000
npm run lint         # ESLint (must be 0 warnings)
npm run build        # static export to ./out
npm run preview      # serve ./out at http://localhost:8000 with Brotli/gzip, like Cloudflare
npm run test:e2e     # builds, then runs Playwright on desktop + mobile (uses installed Google Chrome)
npm run brand:assets # regenerate logo, favicon and app icons from assets/brand/
npm run media:youtube # refresh story/reel/gallery images from Mani Sir's official YouTube thumbnails
npm run media:photos  # regenerate web photos from originals in assets/people/
```

E2E tests run against the locally installed **Google Chrome** (`channel: "chrome"`), so no browser download is needed. On CI, install Chrome first.

## Pages

- `/` Home: hero, Meet Mani Sir teaser, courses, 10 promises, fees, video, WhatsApp booking, contact
- `/about` About LIFE & Mani Sir: his story, meaning of LIFE, the story inside our logo, journey since 2018
- `/gallery` Gallery: classroom photos and real lesson videos with filters
- `/privacy` Privacy Policy & Data Notice (DPDP Act 2023), `/terms` Terms of Use & Class Policies

## Structure

```
public/
├── manifest.json        # PWA manifest (name, colours, icons)
├── sw.js                # service worker: cache-first static assets, network-first pages, offline fallback
├── offline.html         # branded offline page
└── brand/               # generated logo + app icons
src/
├── app/                 # layout (SEO + PWA metadata), page, globals.css, icon.png, apple-icon.png
├── lib/
│   ├── site.ts          # phones, address, links, WhatsApp/tel helpers  ← edit contact info here
│   ├── content.ts       # brand story, 10 promises, courses, audiences, form options ← edit copy here
│   └── cn.ts            # class + button style helpers
└── components/
    ├── layout/          # AnnouncementBar, Navbar, Brand, Footer, MobileActionBar
    ├── sections/        # Hero, BrandStory, WhyLife, Courses, Promises, Pricing, VideoShowcase, Enrollment, Contact
    ├── modals/          # Radix dialogs (lazy-loaded): trial form, video
    ├── ui/              # Reveal, GlowCard, SectionHeading, BrandIcons
    ├── EnrollmentForm.tsx        # WhatsApp booking form
    ├── ServiceWorkerRegister.tsx # registers /sw.js in production
    └── JsonLd.tsx                # EducationalOrganization schema
tests/e2e/home.spec.ts   # Playwright suite
scripts/                 # brand asset generator, static preview server
```

## Deployment (Cloudflare Pages)

The site is a fully static export: `next.config.ts` sets `output: "export"` and `images.unoptimized: true`, so `npm run build` writes everything to `./out` (`index.html`, `about.html`, `gallery.html`, assets, `_headers`).

Cloudflare Pages project settings:

| Setting | Value |
| --- | --- |
| Framework preset | None (or Next.js Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | from `.node-version` (24) |
| Environment variables | `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` (Delivery token only); optional `NEXT_PUBLIC_SITE_URL=https://<your-domain>` |

## Content management (Contentful)

Mani Sir manages gallery photos (`galleryItem`) and the homepage banner (`announcement`) in Contentful. The site stays a static export:

1. `npm run build` first runs `scripts/sync-cms.mts`, which fetches published content through the Delivery API (`src/lib/contentful.ts`), downloads every photo as WebP into `public/media/cms/` and writes `src/lib/cms.generated.json` (both git-ignored). Visitors never contact Contentful.
2. If the keys are missing, Contentful errors or times out (15 s), or `CMS_SYNC=off`, the build uses the local fallback in `src/lib/content.ts` (`PHOTOS`, `ANNOUNCEMENT`) and never fails.
3. Publishing in Contentful updates the live site after the next build. `npm run cms:setup` registers a webhook that triggers it automatically when `CLOUDFLARE_DEPLOY_HOOK_URL` is set.

One-time setup: copy `.env.example` to `.env.local`, fill in the values, then run `npm run cms:setup`. It creates and publishes both content types, uploads the classroom photo and creates the initial entries. It can be re-run safely and never overwrites existing entries. E2E tests always build with `CMS_SYNC=off` so the results are deterministic.

`public/_headers` is copied into `out/` and gives Cloudflare long-lived caching for hashed assets, no-cache for the service worker and manifest, and basic security headers.

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) in the hosting environment once the domain is known, to enable canonical URLs, absolute schema IDs and the social share image.

When changing caching behaviour in `public/sw.js`, bump its `VERSION` constant so old caches are cleared.
