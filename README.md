# LIFE Spoken English & Soft Skills Institute

Official single-page website for LIFE – Spoken English & Soft Skills Training Institute (Mani Sir), Madhurawada, Visakhapatnam.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Radix UI (Dialog, Tabs) · Lucide icons

## Commands

```bash
npm install        # uses public npm registry via project .npmrc
npm run dev        # http://localhost:3000
npm run lint       # ESLint (must be 0 warnings)
npm run build      # static export to ./out
python3 -m http.server 8000 --directory out   # preview the production build
```

## Structure

```
src/
├── app/                 # layout (SEO metadata), page, globals.css, icon.svg
├── lib/
│   ├── site.ts          # phones, address, links, WhatsApp/tel helpers  ← edit contact info here
│   ├── content.ts       # 10 promises, courses, audiences, form options ← edit copy here
│   └── cn.ts            # class + button style helpers
└── components/
    ├── layout/          # AnnouncementBar, Navbar, Footer, MobileActionBar
    ├── sections/        # Hero, WhyLife, Courses, Promises, Pricing, VideoShowcase, Enrollment, Contact
    ├── modals/          # Radix dialogs (lazy-loaded): trial form, video
    ├── ui/              # Reveal, GlowCard, SectionHeading, BrandIcons
    ├── EnrollmentForm.tsx  # WhatsApp booking form
    └── JsonLd.tsx       # EducationalOrganization schema
```

## Deployment

The site is a fully static export (`out/`).

- **Vercel**: import the repo; framework preset "Next.js" works as-is.
- **Cloudflare Pages**: build command `npm run build`, output directory `out`.

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) in the hosting environment once the domain is known, to enable canonical URLs and absolute schema IDs.
