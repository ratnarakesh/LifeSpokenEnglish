import { expect, test } from "@playwright/test";
import { cleanText, fetchCmsContent } from "../../src/lib/contentful";

// E2E builds run with CMS_SYNC=off, so these assert the local fallback that keeps the site working
// whenever Contentful keys are missing or the API is down.

test("cms fallback: homepage shows the default announcement banner linking to the booking form", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("complementary", { name: "Announcement" });
  await expect(banner).toBeVisible();
  await expect(banner.getByText("New Batch", { exact: true })).toBeVisible();
  await expect(banner.getByText(/New batches are starting soon\. Book your 10 free trial classes with Mani\s+Sir today\./)).toBeVisible();
  await expect(banner.getByRole("link")).toHaveAttribute("href", "/#enroll");
});

test("cms fallback: gallery shows the local classroom photo and hides empty photo categories", async ({ page }) => {
  await page.goto("/gallery");
  const filters = page.getByRole("group", { name: "Filter gallery" });
  await expect(filters.getByRole("button", { name: /^Classroom \(1\)/ })).toBeVisible();
  await expect(filters.getByRole("button", { name: /^Student Success/ })).toHaveCount(0);
  await expect(filters.getByRole("button", { name: /^Events/ })).toHaveCount(0);
  const photo = page.getByRole("button", { name: /Open photo: Mani\s+Sir in the LIFE classroom/ });
  await expect(photo.locator("img")).toHaveAttribute("src", "/media/people/mani-sir-classroom.webp");
});

test("cms client: editor text follows house style and missing keys fall back without network calls", async () => {
  expect(cleanText("New batch \u2014 starts Monday \u2013 call Mani   Sir")).toBe("New batch - starts Monday - call Mani\u00A0Sir");
  const saved = { space: process.env.CONTENTFUL_SPACE_ID, token: process.env.CONTENTFUL_ACCESS_TOKEN };
  delete process.env.CONTENTFUL_SPACE_ID;
  delete process.env.CONTENTFUL_ACCESS_TOKEN;
  try {
    expect(await fetchCmsContent()).toBeNull();
  } finally {
    if (saved.space) process.env.CONTENTFUL_SPACE_ID = saved.space;
    if (saved.token) process.env.CONTENTFUL_ACCESS_TOKEN = saved.token;
  }
});
