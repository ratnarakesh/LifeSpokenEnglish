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
| Node version | from `.node-version` (22) |
| Environment variable | `NEXT_PUBLIC_SITE_URL=https://<your-domain>` |

`public/_headers` is copied into `out/` and gives Cloudflare long-lived caching for hashed assets, no-cache for the service worker and manifest, and basic security headers.

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) in the hosting environment once the domain is known, to enable canonical URLs, absolute schema IDs and the social share image.

When changing caching behaviour in `public/sw.js`, bump its `VERSION` constant so old caches are cleared.
