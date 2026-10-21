import { expect, test, type Page } from "@playwright/test";

const SITE_URL = "https://lifespokenenglish.com";
const DASHES = /[\u2013\u2014]/;
const SUFFIX = " | LIFE Spoken English by Mani Sir - Madhurawada, Vizag";
const HOME_TITLE = "LIFE Spoken English & Soft Skills | Mani Sir - Madhurawada, Visakhapatnam";
const HOME_DESCRIPTION =
  "Join LIFE Spoken English in Madhurawada, Vizag. Attend 10 full classes 100% free with zero upfront fees. Practical, live speaking practice led personally by Mani Sir for Telugu-medium students, job seekers, and homemakers.";

async function schemas(page: Page) {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.map((s) => JSON.parse(s) as Record<string, unknown>);
}

const meta = (page: Page, attr: "name" | "property", key: string) =>
  page.locator(`meta[${attr}="${key}"]`).first().getAttribute("content");

test("schema: LocalBusiness / EducationalOrganization JSON-LD has the full local profile", async ({ page }) => {
  await page.goto("/");
  const org = (await schemas(page)).find((s) => Array.isArray(s["@type"]));
  expect(org).toMatchObject({
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "LIFE Spoken English & Soft Skills Training Institute",
    alternateName: "LIFE by Mani Sir",
    founder: { "@type": "Person", name: "K. Maneendra Kumar", jobTitle: "Founder & Lead Trainer" },
    foundingDate: "2018",
    telephone: "+917337412999",
    email: "lifebymanisir@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Vasu Brothers Nilayam, D.No. 2-158/2, Midhilapuri VUDA Colony, Near Kushi Junction / Naira Petrol Bunk",
      addressLocality: "Madhurawada, Visakhapatnam",
      addressRegion: "Andhra Pradesh",
      postalCode: "530041",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: "17.8185", longitude: "83.3532" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "06:00",
        closes: "22:00",
      },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "1800", bestRating: "5" },
    priceRange: "₹2,000 - ₹10,000",
    url: SITE_URL,
  });
});

test("schema: FAQPage JSON-LD mirrors the visible FAQ section", async ({ page }) => {
  await page.goto("/");
  const faq = (await schemas(page)).find((s) => s["@type"] === "FAQPage");
  const entries = (faq?.mainEntity ?? []) as { "@type": string; name: string; acceptedAnswer: { text: string } }[];
  expect(entries.map((e) => e.name)).toEqual([
    "How do the 10 free trial classes work at LIFE?",
    "Is this suitable for Telugu-medium learners and homemakers?",
    "What are the class timings and batch sizes?",
    "What happens if I miss a weekday class?",
  ]);
  expect(entries[3].acceptedAnswer.text).toMatch(/Saturday and Sunday, arranged directly with Mani Sir/);

  const section = page.locator("#faq");
  for (const { name, acceptedAnswer } of entries) {
    const item = section.locator("details", { has: page.getByRole("heading", { name }) });
    await item.locator("summary").scrollIntoViewIfNeeded();
    if (!(await item.evaluate((d: HTMLDetailsElement) => d.open))) await item.locator("summary").click();
    await expect(item.getByText(acceptedAnswer.text)).toBeVisible();
  }
  expect(JSON.stringify(faq)).not.toMatch(DASHES);
});

test("metadata: home title, description, keywords, canonical, Open Graph and Twitter card", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(HOME_TITLE);
  expect(await meta(page, "name", "description")).toBe(HOME_DESCRIPTION);
  expect(await meta(page, "name", "keywords")).toBe(
    "spoken english vizag,spoken english madhurawada,mani sir spoken english,life spoken english,english classes pm palem,spoken english for homemakers vizag,soft skills training visakhapatnam",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", SITE_URL);
  expect(await meta(page, "property", "og:type")).toBe("website");
  expect(await meta(page, "property", "og:locale")).toBe("en_IN");
  expect(await meta(page, "property", "og:title")).toBe(HOME_TITLE);

  const ogImages = await page.locator('meta[property="og:image"]').evaluateAll((m) => m.map((e) => e.getAttribute("content")));
  expect(ogImages).toEqual(
    expect.arrayContaining([`${SITE_URL}/brand/life-logo.webp`, `${SITE_URL}/media/people/mani-sir-portrait-v2.webp`]),
  );
  expect(await meta(page, "name", "twitter:card")).toBe("summary_large_image");
  const twImages = await page.locator('meta[name="twitter:image"]').evaluateAll((m) => m.map((e) => e.getAttribute("content")));
  expect(twImages).toEqual(expect.arrayContaining([`${SITE_URL}/brand/life-logo.webp`]));
});

for (const [path, title] of [
  ["/about", "About LIFE & Mani Sir: Our Story Since 2018"],
  ["/gallery", "Gallery: Real Classes & Lessons with Mani Sir"],
  ["/privacy", "Privacy Policy & Data Notice"],
  ["/terms", "Terms of Use & Class Policies"],
]) {
  test(`metadata: ${path} uses the title template, canonical and share images`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(`${title}${SUFFIX}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}${path}`);
    expect(await meta(page, "property", "og:locale")).toBe("en_IN");
    expect(await meta(page, "property", "og:url")).toBe(`${SITE_URL}${path}`);
    await expect(page.locator(`meta[property="og:image"][content="${SITE_URL}/brand/life-logo.webp"]`)).toHaveCount(1);
  });
}

test("sitemap.xml lists every page with the agreed priorities", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<priority>([^<]+)<\/priority>/g)].map((m) => [m[1], m[2]]);
  expect(entries).toEqual([
    [SITE_URL, "1"],
    [`${SITE_URL}/about`, "0.8"],
    [`${SITE_URL}/gallery`, "0.8"],
    [`${SITE_URL}/privacy`, "0.3"],
    [`${SITE_URL}/terms`, "0.3"],
  ]);
});

test("robots.txt allows all crawlers and references the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const txt = await res.text();
  expect(txt).toMatch(/User-Agent: \*/i);
  expect(txt).toMatch(/^Allow: \/$/m);
  expect(txt).not.toMatch(/Disallow: \/\S/);
  expect(txt).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
});
