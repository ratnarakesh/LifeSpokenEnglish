import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/about", "/gallery"];
const OFFICIAL_WA = "https://wa.me/917337412999";
const OFFICIAL_TEL = "tel:+917337412999";

test("static export: ./out contains every page and Cloudflare Pages files", () => {
  const out = path.resolve("out");
  for (const file of ["index.html", "about.html", "gallery.html", "404.html", "_headers", "manifest.json", "sw.js"]) {
    expect(existsSync(path.join(out, file)), file).toBe(true);
  }
  expect(readFileSync(path.join(out, "_headers"), "utf8")).toContain("/_next/static/*");
});

for (const pagePath of PAGES) {
  test(`contact: ${pagePath} uses only the official line +91 73374 12999`, async ({ page }) => {
    await page.goto(pagePath);
    const html = await page.content();
    expect(html).not.toMatch(/90590|9059056833|56833/);

    const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? ""));
    const whatsapp = hrefs.filter((h) => h.includes("wa.me"));
    const tel = hrefs.filter((h) => h.startsWith("tel:"));
    expect(whatsapp.length).toBeGreaterThan(0);
    expect(tel.length).toBeGreaterThan(0);
    for (const href of whatsapp) expect(href.startsWith(`${OFFICIAL_WA}?text=`), href).toBe(true);
    for (const href of tel) expect(href).toBe(OFFICIAL_TEL);
  });
}

test("hours: Monday to Friday 6:00 AM to 10:00 PM, weekends for personal backup sessions", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByText("6:00 AM to 10:00 PM")).toBeVisible();
  await expect(contact.getByText(/Saturday and Sunday/)).toBeVisible();
  await expect(contact.getByText(/Reserved for on-demand personal backup sessions/)).toBeVisible();
  await expect(page.locator("footer").getByText("6:00 AM to 10:00 PM")).toBeAttached();

  const promises = page.locator("#promises");
  await expect(promises.getByRole("heading", { name: "Flexible Weekend Backup" })).toBeAttached();
  await expect(
    promises.getByText(
      "Students who miss weekday sessions receive personalized on-demand makeup classes on Saturday and Sunday directly with Mani Sir.",
    ),
  ).toBeAttached();

  const html = await page.content();
  expect(html).not.toMatch(/8:00 (PM )?to 9:30 PM/);
});

test("structured data: one official contact point and weekday opening hours", async ({ page }) => {
  await page.goto("/");
  const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(json.telephone).toBe("+917337412999");
  expect(json.contactPoint).toHaveLength(1);
  expect(json.contactPoint[0].telephone).toBe("+917337412999");
  expect(json.openingHoursSpecification[0]).toMatchObject({ opens: "06:00", closes: "22:00" });
});

const CAPACITY = "Strictly limited to 15 - 20 learners per batch to guarantee individual vocal attention and live correction.";
const BOOKLET =
  "Every enrolled learner receives a custom printed reference handbook designed to support classroom speaking drills and serve as a permanent lifetime communication asset.";
const ELIGIBILITY =
  "Open to all age groups: from upper primary school through college graduates, working professionals, and homemakers.";

test("batch policy: capacity and printed booklet appear in every course track and the booking areas", async ({ page }) => {
  await page.goto("/");
  const courses = page.locator("#courses");
  await courses.scrollIntoViewIfNeeded();
  for (const tab of ["Basic", "Professional", "Advanced"]) {
    await courses.getByRole("tab", { name: tab }).click();
    const panel = courses.getByRole("tabpanel");
    await expect(panel.getByText(CAPACITY)).toBeVisible();
    await expect(panel.getByText("Exclusive LIFE Physical Booklet", { exact: true })).toBeVisible();
    await expect(panel.getByText(BOOKLET)).toBeVisible();
  }

  const enroll = page.locator("#enroll");
  await enroll.scrollIntoViewIfNeeded();
  await expect(enroll.getByText(CAPACITY)).toBeVisible();
  await expect(enroll.getByText("Exclusive LIFE Physical Booklet for every enrolled learner")).toBeVisible();
  await expect(enroll.getByText("School Student", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: /Claim Your 10 Free Trial Classes/ }).first().click();
  const dialog = page.getByRole("dialog", { name: "Claim Your 10 Free Trial Classes" });
  await expect(dialog.getByText(CAPACITY)).toBeVisible();
});

test("audience and fees: eligibility note, retained fees and custom request via official WhatsApp", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#for-you").getByText(ELIGIBILITY)).toBeVisible();

  const fees = page.locator("#fees");
  await fees.scrollIntoViewIfNeeded();
  await expect(fees.getByText("₹3,000", { exact: true })).toBeVisible();
  await expect(fees.getByText("1st month → ₹2,000 / month thereafter")).toBeVisible();
  await expect(fees.getByText("Custom batch timing or special requirements available on request via WhatsApp.")).toBeVisible();
  const ask = fees.getByRole("link", { name: "Ask on WhatsApp" });
  await expect(ask).toHaveAttribute("href", /^https:\/\/wa\.me\/917337412999\?text=/);
});

test("punctuation: no em or en dash in any source, content or doc file in the repo", () => {
  const files = execSync("git ls-files -co --exclude-standard", { encoding: "utf8" })
    .split("\n")
    .filter((f) => f && /\.(tsx?|mjs|js|json|md|css|html|txt)$/.test(f) && f !== "package-lock.json");
  const offenders = files.filter((f) => existsSync(f) && /[\u2013\u2014]/.test(readFileSync(f, "utf8")));
  expect(offenders).toEqual([]);
});
