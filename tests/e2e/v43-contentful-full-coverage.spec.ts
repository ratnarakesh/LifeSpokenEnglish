import { expect, test } from "@playwright/test";

test.describe("Version 43: Complete 100% Contentful Migration of All Website Text & Admin Coverage", () => {
  test("homepage renders dynamic copy wired to CMS getters", async ({ page }) => {
    await page.goto("/");

    // 1. Hero Rating Badge & Subheadline
    await expect(page.getByText(/5\.0 Star Rated on Google/i).first()).toBeVisible();
    await expect(page.getByText(/Practical, interactive Spoken English/i)).toBeVisible();

    // 2. Courses Section Title & Subtitle
    const coursesSection = page.locator("#courses");
    await expect(coursesSection.getByRole("heading", { level: 2 })).toHaveText(/Every Stage of English Fluency/i);
    await expect(coursesSection.getByText(/From foundational hesitation removal to stage-ready executive communication/i)).toBeVisible();

    // 3. Promises Section Title & Subtitle
    const promisesSection = page.locator("#promises");
    await expect(promisesSection.getByRole("heading", { level: 2 })).toHaveText(/The 10 LIFE Promises/i);
    await expect(promisesSection.getByText(/Ten commitments you won't find anywhere else/i)).toBeVisible();
  });

  test("about page renders dynamic brand lore and founder copy from CMS", async ({ page }) => {
    await page.goto("/about");

    // Founder bio and philosophy
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Meet Mani\s+Sir, the heart of LIFE/i);
    await expect(page.getByText(/Some teachers teach English\. Mani\s+Sir teaches people to believe in their own voice\./i)).toBeVisible();

    // Spirit of LIFE and 4 Pillars
    const meaningSection = page.locator("#meaning");
    await expect(meaningSection.getByRole("heading", { level: 2 })).toHaveText(/The Meaning Behind Our Name:\s+Live It For Eternity/i);
    await expect(meaningSection.getByText(/Live/i).first()).toBeVisible();
    await expect(meaningSection.getByText(/Eternity/i).first()).toBeVisible();

    // Eagle parable & moral
    const logoSection = page.locator("#logo-story");
    await expect(logoSection.getByRole("heading", { level: 2 })).toHaveText(/The Young Eagle Who Was Afraid to Fly/i);
    await expect(logoSection.getByText(/The Story Inside Our Logo/i)).toBeVisible();
    await expect(logoSection.getByText(/High on a cliff above the Vizag coast/i)).toBeVisible();
    await expect(logoSection.getByText(/Every learner who walks into LIFE is that young eagle/i)).toBeVisible();
  });

  test("admin dashboard covers all 7 tabs and allows editing all site copy", async ({ page }) => {
    await page.goto("/admin");

    // Passcode unlock (7337)
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // Tab 1: Announcements & Hero
    await page.getByRole("button", { name: /Announcements & Hero/i }).click();
    await expect(page.getByLabel(/Hero Main Headline/i)).toBeVisible();
    await expect(page.getByLabel(/Hero Subheadline \/ Mission/i)).toBeVisible();
    await expect(page.getByLabel(/Hero Trial Badge Text/i)).toBeVisible();

    // Tab 2: Videos & Gallery
    await page.getByRole("button", { name: /Videos & Gallery/i }).click();
    await expect(page.getByRole("button", { name: /Add Video Lesson/i })).toBeVisible();

    // Tab 3: Courses & Syllabus
    await page.getByRole("button", { name: /Courses & Syllabus/i }).click();
    await expect(page.getByLabel(/Courses Section Title/i)).toBeVisible();
    await expect(page.getByLabel(/Courses Section Subtitle/i)).toBeVisible();

    // Tab 4: FAQs & Contacts
    await page.getByRole("button", { name: /^FAQs/i }).click();
    await expect(page.getByLabel(/Primary Contact Phone/i)).toBeVisible();
    await expect(page.getByLabel(/Official Contact Email/i)).toBeVisible();
    await expect(page.getByLabel(/Default WhatsApp Message/i)).toBeVisible();
    await expect(page.getByLabel(/Branch Full Address/i)).toBeVisible();

    // Tab 5: Reviews & Founder
    await page.getByRole("button", { name: /Reviews & Founder/i }).click();
    await expect(page.getByLabel(/Founder Bio Headline/i)).toBeVisible();
    await expect(page.getByLabel(/Full Narrative Bio Paragraphs/i)).toBeVisible();
    await expect(page.getByLabel(/Mission Statement/i)).toBeVisible();
    await expect(page.getByLabel(/Stats: Experience/i)).toBeVisible();
    await expect(page.getByLabel(/Stats: Students Trained/i)).toBeVisible();
    await expect(page.getByLabel(/Stats: Batches Completed/i)).toBeVisible();

    // Tab 6: Brand Story, Logo & Spirit of LIFE
    await page.getByRole("button", { name: /Story & Promises/i }).click();
    await expect(page.getByLabel(/Promises Section Title/i)).toBeVisible();
    await expect(page.getByLabel(/Promises Section Subtitle/i)).toBeVisible();
    await expect(page.getByLabel(/Eagle Story Title/i)).toBeVisible();
    await expect(page.getByLabel(/Eagle Story Subtitle/i)).toBeVisible();
    await expect(page.getByLabel(/Full Eagle Parable Narrative/i)).toBeVisible();
    await expect(page.getByLabel(/Eagle Story Moral \/ Core Lesson/i)).toBeVisible();
    await expect(page.getByLabel(/Spirit of LIFE Title/i)).toBeVisible();
    await expect(page.getByLabel(/Spirit of LIFE Subtitle \/ Intro/i)).toBeVisible();
    await expect(page.getByText(/The 4 Pillars: L\.I\.F\.E\. Acronym Definitions/i)).toBeVisible();

    // Tab 7: Legal & Policies
    await page.getByRole("button", { name: /Legal & Policies/i }).click();
    await expect(page.getByText(/Legal Policies & DPDP Compliance/i)).toBeVisible();

    // Save Changes button (enabled after making an edit)
    await page.getByLabel(/Last Updated Notice/i).first().fill("23 October 2026");
    const saveCmsBtn = page.getByRole("button", { name: "Save Changes to CMS" });
    await expect(saveCmsBtn).toBeVisible();
    await expect(saveCmsBtn).toBeEnabled();
    await saveCmsBtn.click();
    await expect(
      page.getByText(/Draft saved to CMS instantly\. Click 'Publish to Live Site' when ready to deploy\./i),
    ).toBeVisible();
  });
});
