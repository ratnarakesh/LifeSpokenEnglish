import { expect, test } from "@playwright/test";

test.describe("Admin Control Panel (/admin)", () => {
  test("metadata and locked state: renders noindex meta and numeric keypad", async ({ page }) => {
    await page.goto("/admin");

    // Must never be indexed by search engines
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", "noindex, nofollow");

    // Locked passcode card
    await expect(page.getByRole("heading", { name: /LIFE Spoken English/i })).toBeVisible();
    await expect(page.getByText(/Mani\s+Sir Control Panel/i)).toBeVisible();

    const input = page.getByPlaceholder("Enter passcode");
    await expect(input).toBeVisible();

    // Verify touch-friendly keypad buttons 0-9, Clear, Delete
    for (let i = 0; i <= 9; i++) {
      await expect(page.getByRole("button", { name: String(i), exact: true })).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Clear", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Unlock Control Panel" })).toBeVisible();
  });

  test("passcode validation: rejects incorrect passcode and displays error", async ({ page }) => {
    await page.goto("/admin");

    const input = page.getByPlaceholder("Enter passcode");
    await input.fill("9999");
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    await expect(page.locator("p[role='alert']")).toHaveText("Incorrect passcode. Please try again.");
  });

  test("authentication flow: keypad unlocks dashboard and renders all controls", async ({ page }) => {
    await page.goto("/admin");

    // Use on-screen touch keypad to enter 7337
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();

    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // Dashboard header
    await expect(page.getByRole("heading", { name: /LIFE Spoken English - Mani\s+Sir Control Panel/i })).toBeVisible();
    await expect(page.getByText("Live Connected")).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    // Section 1: Batch Announcement Bar
    await expect(page.getByRole("heading", { name: "Batch Announcement Bar" })).toBeVisible();
    await expect(page.getByText("Banner Active")).toBeVisible();
    await expect(page.getByLabel("Announcement Message")).toBeVisible();
    await expect(page.getByLabel("Badge / Button Label")).toBeVisible();
    await expect(page.getByLabel("Destination Link URL")).toBeVisible();

    // Section 2: Contact & Phone Numbers
    await expect(page.getByRole("heading", { name: "Contact & Phone Numbers" })).toBeVisible();
    await expect(page.getByLabel("Primary Call Phone")).toBeVisible();
    await expect(page.getByLabel("WhatsApp Inquiry Number")).toBeVisible();

    // Section 3: Hero & Trial Details
    await expect(page.getByRole("heading", { name: "Hero & Trial Details" })).toBeVisible();
    await expect(page.getByLabel("Hero Main Headline")).toBeVisible();
    await expect(page.getByLabel("Hero Subheadline / Mission")).toBeVisible();
    await expect(page.getByLabel("Trial Policy Summary Note")).toBeVisible();

    // Sticky Action Bar
    const saveButton = page.getByRole("button", { name: /Save (?:Changes to CMS|& Update Website)/i });
    await expect(saveButton).toBeVisible();

    // Edit a field to make form dirty and enable Save button
    await page.getByLabel("Announcement Message").fill("Special New Batches Starting This Monday!");
    await expect(saveButton).toBeEnabled();

    // Save action updates status
    await saveButton.click();
    await expect(page.getByRole("status").first()).toHaveText(
      /(?:Saved to CMS!|Draft saved to CMS instantly|Changes saved! Your website is rebuilding)/i,
    );

    // Logout action returns to passcode screen
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByPlaceholder("Enter passcode")).toBeVisible();
  });
});
