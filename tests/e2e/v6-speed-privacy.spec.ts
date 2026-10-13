import { expect, test, type Page } from "@playwright/test";

const PAGES = ["/", "/about", "/gallery", "/privacy", "/terms"];

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
}

for (const path of PAGES) {
  test(`privacy: ${path} sets no cookies and contacts no third party until the visitor acts`, async ({ page, context, baseURL }) => {
    const external: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (!url.startsWith(baseURL ?? "http://localhost") && !url.startsWith("data:") && !url.startsWith("blob:")) external.push(url);
    });
    await page.goto(path);
    await scrollThrough(page);
    await page.waitForTimeout(500);
    expect(external).toEqual([]);
    expect(await context.cookies()).toEqual([]);
    expect(await page.evaluate(() => document.cookie)).toBe("");
  });
}

test("privacy: Google Maps loads only after tapping Load interactive map", async ({ page }) => {
  const google: string[] = [];
  page.on("request", (req) => req.url().includes("google.com") && google.push(req.url()));
  await page.goto("/#contact");
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByRole("button", { name: "Load interactive map" })).toBeVisible();
  await expect(contact.locator("iframe")).toHaveCount(0);
  expect(google).toEqual([]);

  await contact.getByRole("button", { name: "Load interactive map" }).click();
  await expect(contact.locator('iframe[src^="https://www.google.com/maps"]')).toBeAttached();
});

test("legal: privacy policy and terms are linked from the footer and form, with DPDP rights and child consent", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByText("No cookies. No tracking.")).toBeAttached();
  await expect(footer.getByRole("link", { name: "Terms of Use" })).toHaveAttribute("href", "/terms");
  await expect(page.locator("#enroll").getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
  await expect(page.locator("#enroll").getByText("Learner under 18? Please ask a parent or guardian to fill this form.")).toBeAttached();

  await footer.getByRole("link", { name: "Privacy Policy" }).click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy Policy & Data Notice");
  await expect(page.getByText(/Digital Personal Data Protection Act, 2023/).first()).toBeVisible();
  for (const heading of ["Cookies and tracking", "Learners under 18", "Your rights", "Contact and grievances"]) {
    await expect(page.getByRole("heading", { name: new RegExp(heading) })).toBeAttached();
  }
  await expect(page.getByText("This website sets no cookies")).toBeAttached();

  await page.goto("/terms");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Terms of Use & Class Policies");
  await expect(page.getByText(/₹3,000 for the first month, then ₹2,000 per month/)).toBeAttached();
});

test("speed: first visit stays within the page weight budget and uses light images", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("load");
  const stats = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const bytes = resources.reduce((sum, r) => sum + (r.encodedBodySize || 0), 0) + (nav.encodedBodySize || 0);
    const images = resources.filter((r) => r.initiatorType === "img");
    return {
      kb: Math.round(bytes / 1024),
      largestImageKb: Math.round(Math.max(0, ...images.map((r) => r.encodedBodySize)) / 1024),
      pngImages: images.filter((r) => r.name.endsWith(".png")).map((r) => r.name),
    };
  });
  expect(stats.kb, `home page first load ${stats.kb} KB`).toBeLessThan(450);
  expect(stats.largestImageKb).toBeLessThan(80);
  expect(stats.pngImages).toEqual([]);
});

test("speed: repeat visit is served instantly from the on-device cache", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForLoadState("load");

  let fromServiceWorker = false;
  page.on("response", (res) => {
    if (res.request().isNavigationRequest()) fromServiceWorker = res.fromServiceWorker();
  });
  const start = Date.now();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const elapsed = Date.now() - start;
  expect(fromServiceWorker).toBe(true);
  expect(elapsed).toBeLessThan(3000);
});
