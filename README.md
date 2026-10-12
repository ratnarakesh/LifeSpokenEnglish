# LIFE Spoken English & Soft Skills Institute

Official single-page website for LIFE: Spoken English & Soft Skills Training Institute (Mani Sir), Madhurawada, Visakhapatnam.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Radix UI (Dialog, Tabs) · Lucide icons · Installable PWA (native service worker) · Playwright E2E

## Commands

```bash
npm install          # uses public npm registry via project .npmrc
npm run dev          # http://localhost:3000
npm run lint         # ESLint (must be 0 warnings)
npm run build        # static export to ./out
npm run preview      # serve ./out at http://localhost:8000 (zero-dependency Node server)
npm run test:e2e     # builds, then runs Playwright on desktop + mobile (uses installed Google Chrome)
npm run brand:assets # regenerate logo, favicon and app icons from assets/brand/
```

E2E tests run against the locally installed **Google Chrome** (`channel: "chrome"`), so no browser download is needed. On CI, install Chrome first.

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

## Deployment

The site is a fully static export (`out/`).

- **Vercel**: import the repo; framework preset "Next.js" works as-is.
- **Cloudflare Pages**: build command `npm run build`, output directory `out`.

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) in the hosting environment once the domain is known, to enable canonical URLs, absolute schema IDs and the social share image.

When changing caching behaviour in `public/sw.js`, bump its `VERSION` constant so old caches are cleared.
