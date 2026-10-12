# Task List - Version 3

Add your tasks below, one per line. I will pick them up when you say "go".

## Tasks

# TASK: Version 2 - Brand Story, Typography Polish, PWA Integration & End-to-End Testing

Please implement the following changes in order, verify that the application compiles without errors, and push the commit as "Version 2".

---

## 1. Typography & Punctuation Guardrails (Strict Rule)
- Scan all components, text files, and copy across the entire repository.
- Remove all em dashes (U+2014) and en dashes (U+2013).
- Replace them with clean hyphens (" - ") or restructure sentences with clean punctuation (colons, periods, or commas).
- Ensure no accidental Unicode dash characters slip into headers, badges, or paragraph text.

---

## 2. The Official "Origin of LIFE" Narrative (Brand Story Component / Page)
Add an immersive "About LIFE & Mani Sir" story section (or dedicated modal/view) with the following verified narrative:

### The Genesis Story:
- **Title:** Why We Are Called "LIFE"
- **The Philosophy:** English is not just an academic subject or a grammar puzzle; it is a life enabler. In everyday reality, lack of spoken English creates invisible barriers in classrooms, family circles, job interviews, and corporate boardrooms. The institute was named LIFE because language training should transform the quality of one's everyday life, career, and self-respect.
- **Where It Started:** Madhurawada, Visakhapatnam. Starting in a humble classroom setting at Vasu Brothers Nilayam, Midhilapuri VUDA Colony, Mani Sir set out to solve a deep rooted issue: students spend 15 years studying English in schools and colleges, yet hesitate to speak a single spontaneous sentence.
- **Why It Started (The Breaking Point):** Mani Sir observed that traditional institutes exploit student insecurity by demanding heavy upfront fees, forcing memorization of textbook grammar, and delivering one-way lectures. He rebuilt the learning model around two core beliefs:
  1. If a student fears English, the teacher must remove the financial and psychological risk first (leading to the 10-Class Free Trial and low-stress monthly fee model).
  2. Language is acquired through vocal practice and life scenarios, not silent note taking.
- **The Milestones:** From local classroom sessions to over 1,800+ five-star verified reviews, touching homemakers who now speak with confidence, job seekers clearing MNC interviews, and professionals commanding corporate meetings.

---

## 3. Progressive Web App (PWA) Implementation
Turn the application into an installable, high performance Progressive Web App:
- **Dependencies:** Install `next-pwa` (or configure native App Router service worker handling with `@ducanh2912/next-pwa` compatible with Next.js 14/15/App Router). Remember: pull exclusively from `https://registry.npmjs.org/`.
- **Manifest:** Create a production ready `public/manifest.json` (or `app/manifest.ts`):
  - Name: "LIFE Spoken English & Soft Skills"
  - Short Name: "LIFE English"
  - Theme Color: `#07090E`
  - Background Color: `#07090E`
  - Display: `standalone`
  - Icons: Generate standard 192x192 and 512x512 app icon entries.
- **Metadata:** Add mobile web app capable meta tags, apple touch icons, and status bar styling in `app/layout.tsx`.
- **Offline Fallback / Caching:** Configure basic service worker caching for static assets, fonts, and core layouts so the site loads instantly.

---

## 4. End-to-End (E2E) Test Suite Setup
Configure an automated Playwright testing suite to guarantee stability on every release:
- **Setup:** Install `@playwright/test` from public npm registry.
- **Config:** Create `playwright.config.ts` targeting local test server (`http://localhost:8000` or `http://localhost:3000`).
- **Test Scenarios (`tests/e2e/home.spec.ts`):**
  1. **Page Load & Critical Elements:** Verify Hero headline, 5.0 Star badge, and the 10 Promises grid render correctly.
  2. **No Em-Dash Assertion:** Write an automated regex test across DOM text content asserting zero occurrences of `\u2014` (em dash) and `\u2013` (en dash).
  3. **Course Tabs Interaction:** Test clicking between "Basic", "Professional", and "Advanced" tracks, confirming tab content swaps smoothly.
  4. **WhatsApp Funnel Test:** Verify the registration form validation and verify the constructed `wa.me/917337412999` link contains the user's name and selected course.
  5. **Video Modal Test:** Click the video trigger and verify the video container mounts properly without console errors.
  6. **PWA Manifest Check:** Ensure `/manifest.json` responds with `200 OK` and valid JSON data.
- **Package Scripts:** Add `"test:e2e": "playwright test"` to `package.json`.

---

## 5. Verification & Git Commit
1. Run `npm run build` and ensure 0 compilation or TypeScript errors.
2. Run `npm run test:e2e` to confirm all tests pass.
3. Commit with message: `Version 2: feat: add brand story, PWA support, no em-dash typography, and E2E test suite`.
4. Push to `origin main` on the connected personal GitHub repository.

## Notes

