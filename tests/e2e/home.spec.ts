import { expect, test, type Page } from "@playwright/test";

const DASHES = /[\u2013\u2014]/;

function trackConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const source = msg.location().url;
    // Only fail on errors raised by our own origin, not third-party embeds (YouTube, Maps).
    if (!source || source.startsWith("http://localhost")) errors.push(`console: ${msg.text()}`);
  });
  return errors;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("page load: hero headline, 5.0 star badge and the 10 promises render", async ({ page }) => {
  await expect(page).toHaveTitle(/LIFE Spoken English/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Speak English with Fluency and Unstoppable Confidence\./,
  );
  await expect(page.getByText(/5\.0 Star Rated on Google by 1,800\+ Students & Professionals/)).toBeVisible();
  await expect(page.getByRole("img", { name: /LIFE: Live It For Eternity logo/ }).first()).toBeVisible();

  const promises = page.locator("#promises ol > li");
  await expect(promises).toHaveCount(10);
  await promises.last().scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "10 Days Free Demo Classes" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Open Learning Environment" })).toBeVisible();

  await expect(page.getByRole("heading", { name: /Why We Are Called .LIFE./ })).toBeAttached();
});

test("typography: no em dash or en dash anywhere in rendered text, attributes or metadata", async ({ page }) => {
  const found = await page.evaluate((pattern) => {
    const re = new RegExp(pattern);
    const hits: string[] = [];
    if (re.test(document.title)) hits.push(`title: ${document.title}`);
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (re.test(node.textContent ?? "")) hits.push(`text: ${node.textContent?.trim().slice(0, 80)}`);
    }
    for (const el of document.querySelectorAll("*")) {
      for (const attr of ["alt", "title", "aria-label", "placeholder", "content", "value"]) {
        const value = el.getAttribute(attr);
        if (value && re.test(value)) hits.push(`${el.tagName.toLowerCase()}[${attr}]: ${value.slice(0, 80)}`);
      }
    }
    return hits;
  }, DASHES.source);
  expect(found).toEqual([]);
});

test("course tabs: switching Basic, Professional and Advanced swaps the panel content", async ({ page }) => {
  const section = page.locator("#courses");
  await section.scrollIntoViewIfNeeded();
  const panel = section.getByRole("tabpanel");

  const tracks = [
    { tab: "Professional", heading: "Professional Course", duration: "4-5 Months", focus: "Group discussions (GDs)" },
    { tab: "Advanced", heading: "Advanced Course", duration: "6-7 Months", focus: "Accent neutralisation" },
    { tab: "Basic", heading: "Basic Course", duration: "3 Months", focus: "Daily table conversation" },
  ];

  for (const track of tracks) {
    const tab = section.getByRole("tab", { name: track.tab });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveCount(1);
    await expect(panel.getByRole("heading", { name: track.heading })).toBeVisible();
    await expect(panel.getByText(track.duration, { exact: true })).toBeVisible();
    await expect(panel.getByText(track.focus)).toBeVisible();
  }
});

test("whatsapp funnel: validates input and builds a wa.me link with name and selected course", async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __waUrls: string[] };
    w.__waUrls = [];
    window.open = ((url?: string | URL) => {
      w.__waUrls.push(String(url));
      return { opener: null } as Window;
    }) as typeof window.open;
  });
  await page.reload();

  const form = page.locator("#enroll form");
  await form.scrollIntoViewIfNeeded();
  const submit = form.getByRole("button", { name: /Register for 10 Free Classes via WhatsApp/ });

  await submit.click();
  await expect(form.getByText("Please enter your full name.")).toBeVisible();
  await expect(form.getByText("Please enter a valid 10-digit Indian mobile number.")).toBeVisible();

  await form.getByLabel("Full Name").fill("Lakshmi Prasanna");
  await form.getByLabel("Phone Number").fill("12345");
  await submit.click();
  await expect(form.getByText("Please enter your full name.")).toBeHidden();
  await expect(form.getByText("Please enter a valid 10-digit Indian mobile number.")).toBeVisible();

  await form.getByLabel("Phone Number").fill("+91 98765 43210");
  await form.getByText("Working Professional", { exact: true }).click();
  await form.getByLabel("Course of Interest").selectOption("professional");
  await form.getByText("Live Online", { exact: true }).click();
  await submit.click();

  await expect(form.getByText(/Opening WhatsApp/)).toBeVisible();
  const urls = await page.evaluate(() => (window as unknown as { __waUrls: string[] }).__waUrls);
  expect(urls).toHaveLength(1);

  const url = new URL(urls[0]);
  expect(`${url.origin}${url.pathname}`).toBe("https://wa.me/917337412999");
  const message = url.searchParams.get("text") ?? "";
  expect(message).toContain("Name: Lakshmi Prasanna");
  expect(message).toContain("Phone: +91 98765 43210");
  expect(message).toContain("Course of Interest: Professional Course (4-5 Months)");
  expect(message).toContain("I am a: Working Professional");
  expect(message).toContain("Preferred Mode: Live Online");
  expect(message).not.toMatch(DASHES);
});

test("course tab CTA pre-selects that course in the trial modal", async ({ page }) => {
  const section = page.locator("#courses");
  await section.scrollIntoViewIfNeeded();
  await section.getByRole("tab", { name: "Advanced" }).click();
  await section.getByRole("tabpanel").getByRole("button", { name: /Start with 10 Free Classes/ }).click();

  const dialog = page.getByRole("dialog", { name: "Claim Your 10 Free Trial Classes" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel("Course of Interest")).toHaveValue("advanced");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("video modal: opens and mounts the YouTube player without console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page);
  await page.getByRole("button", { name: /Watch Mani Sir's Video Intro/ }).click();

  const dialog = page.getByRole("dialog", { name: /Video Introduction/ });
  await expect(dialog).toBeVisible();
  const iframe = dialog.locator('iframe[src*="youtube-nocookie.com/embed/Er5SNUeJwmk"]');
  await expect(iframe).toBeAttached();
  await expect(iframe).toBeVisible();
  const box = await iframe.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(200);

  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
  expect(errors).toEqual([]);
});

test("pwa: manifest.json is served with valid install data and the service worker is reachable", async ({ page, request }) => {
  const res = await request.get("/manifest.json");
  expect(res.status()).toBe(200);
  const manifest = await res.json();
  expect(manifest).toMatchObject({
    name: "LIFE Spoken English & Soft Skills",
    short_name: "LIFE English",
    theme_color: "#07090E",
    background_color: "#07090E",
    display: "standalone",
    start_url: "/",
  });
  const sizes = (manifest.icons as { sizes: string }[]).map((i) => i.sizes);
  expect(sizes).toEqual(expect.arrayContaining(["192x192", "512x512"]));
  for (const icon of manifest.icons as { src: string }[]) {
    expect((await request.get(icon.src)).status(), icon.src).toBe(200);
  }

  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.json");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#07090E");
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  expect((await request.get("/sw.js")).status()).toBe(200);
  expect((await request.get("/offline.html")).status()).toBe(200);

  const swReady = await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return false;
    const reg = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise<null>((r) => setTimeout(() => r(null), 8000)),
    ]);
    return !!reg?.active;
  });
  expect(swReady).toBe(true);
});

test("pwa: site still loads from the service worker cache when offline", async ({ page, context }) => {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Unstoppable Confidence/);
  await expect(page.getByRole("img", { name: /LIFE: Live It For Eternity logo/ }).first()).toBeVisible();
  await context.setOffline(false);
});
