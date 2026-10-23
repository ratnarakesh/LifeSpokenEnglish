import { expect, test } from "@playwright/test";

test.describe("Version 41: End-to-End CMS Coverage for /about, Logo Lore, Spirit of LIFE & Portrait Sync", () => {
  test("/about page renders dynamic founder profile, spirit of LIFE, 4 pillars, and eagle lore", async ({ page }) => {
    await page.goto("/about");

    // Founder portrait and heading
    const founderImg = page.locator("#mani-sir img").first();
    await expect(founderImg).toBeVisible();
    await expect(founderImg).toHaveAttribute("src", /\/media\/(cms|people)\/mani-sir-portrait/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Meet Mani\s+Sir, the heart of LIFE/i);

    // Teaching philosophy and lede
    await expect(page.getByText(/Some teachers teach English\. Mani\s+Sir teaches people to believe in their own voice\./i)).toBeVisible();

    // The Spirit of LIFE Narrative and Acronym
    const meaningSection = page.locator("#meaning");
    await expect(meaningSection.getByRole("heading", { level: 2 })).toHaveText(/The Meaning Behind Our Name:\s+Live It For Eternity/i);
    await expect(meaningSection.getByText(/Most people approach English like a temporary subject/i)).toBeVisible();

    // The 4 Pillars (L - Live, I - It, F - For, E - Eternity)
    for (const pillar of ["Live", "It", "For", "Eternity"]) {
      await expect(meaningSection.getByText(pillar, { exact: true }).first()).toBeVisible();
    }

    // Logo story and eagle parable
    const logoSection = page.locator("#logo-story");
    await expect(logoSection.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(logoSection.getByText(/High on a cliff above the Vizag coast/i)).toBeVisible();
    await expect(logoSection.getByText(/Every learner who walks into LIFE is that young eagle/i)).toBeVisible();

    // Journey milestones
    const journeySection = page.locator("#journey");
    for (const year of ["2018", "2024", "2025", "Today"]) {
      await expect(journeySection.getByText(year, { exact: true }).first()).toBeVisible();
    }
  });

  test("global portrait synchronization across home and about", async ({ page }) => {
    // Home page story teaser
    await page.goto("/");
    const teaserImg = page.locator("#story img").first();
    await expect(teaserImg).toBeVisible();
    await expect(teaserImg).toHaveAttribute("src", /\/media\/(cms|people)\/mani-sir-portrait/);

    // About page main hero figure
    await page.goto("/about");
    const aboutImg = page.locator("#mani-sir img").first();
    await expect(aboutImg).toBeVisible();
    await expect(aboutImg).toHaveAttribute("src", /\/media\/(cms|people)\/mani-sir-portrait/);
  });

  test("admin dashboard tab 5 and tab 6 expose extended CMS fields", async ({ page }) => {
    await page.goto("/admin");

    // Unlock using passcode keypad (7337)
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // 1. Verify Tab 5 (Reviews & Founder Profile)
    await page.getByRole("button", { name: /Reviews & Founder/i }).click();
    await expect(page.getByLabel(/About Page Story Headline/i)).toBeVisible();
    await expect(page.getByLabel(/Teaching Philosophy/i)).toBeVisible();
    await expect(page.getByLabel(/The Spirit of LIFE Narrative/i)).toBeVisible();
    await expect(page.getByLabel(/Journey Milestones/i)).toBeVisible();
    await expect(page.getByText(/Official Founder Portrait Photo/i)).toBeVisible();

    // 2. Verify Tab 6 (Brand Story & Promises)
    await page.getByRole("button", { name: /Story & Promises/i }).click();
    await expect(page.getByLabel(/Full Eagle Parable Narrative/i)).toBeVisible();
    await expect(page.getByText(/The 4 Pillars: L\.I\.F\.E\. Acronym Definitions/i)).toBeVisible();
  });
});
