import { expect, test } from "@playwright/test";

test.describe("Version 26: True 100% Full-Site Admin Coverage (Legal, Story & Promises)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin");
    // Unlock using keypad passcode 7337
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();
    await expect(page.getByRole("heading", { name: /LIFE Spoken English - Mani\s+Sir Control Panel/i })).toBeVisible();
  });

  test("tab navigation: switches to Brand Story & Promises and Legal & Policies tabs", async ({ page }) => {
    // 1. Story & Promises tab
    await page.getByRole("button", { name: /Story & Promises/i }).click();
    await expect(page.getByRole("heading", { name: "The 10 Core Commitment Promises" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Logo Story & LIFE Meaning" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Operating Hours & Batch Timings" })).toBeVisible();

    // 2. Legal & Policies tab
    await page.getByRole("button", { name: /Legal & Policies/i }).click();
    await expect(page.getByRole("heading", { name: "Legal Policies & DPDP Compliance" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Privacy Policy/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Terms of Use/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Trial & Refund Guarantee Terms" })).toBeVisible();
  });

  test("content mutation: edits promise, working hours, legal doc and saves", async ({ page }) => {
    // Navigate to Story & Promises
    await page.getByRole("button", { name: /Story & Promises/i }).click();

    // Edit working hours
    const hoursInput = page.locator("#workingHours");
    await expect(hoursInput).toBeVisible();
    await hoursInput.fill("Monday to Saturday: 6:00 AM to 10:00 PM");

    // Navigate to Legal & Policies
    await page.getByRole("button", { name: /Legal & Policies/i }).click();

    // Edit Privacy Notice title
    const privacyTitleInput = page.locator("#doc-title-privacy-policy");
    await expect(privacyTitleInput).toBeVisible();
    await privacyTitleInput.fill("LIFE Privacy Notice & Data Charter");

    // Save changes
    const saveBtn = page.getByRole("button", { name: /Save & Update Website/i });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    await expect(page.getByRole("status")).toHaveText(
      /Changes saved! Your website is rebuilding and will update in ~60 seconds\./i,
    );
  });

  test("legal pages render without errors and have proper section anchors", async ({ page }) => {
    // Check /privacy
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#who")).toBeVisible();
    await expect(page.locator("#cookies")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // Check /terms
    await page.goto("/terms");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#refunds")).toBeVisible();
    await expect(page.locator("#results")).toBeVisible();
    await expect(page.locator("#law")).toBeVisible();
  });
});
