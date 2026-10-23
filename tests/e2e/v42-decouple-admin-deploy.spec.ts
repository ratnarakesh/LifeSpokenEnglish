import { expect, test } from "@playwright/test";

test.describe("Version 42: Decoupled CMS Saves & On-Demand Site Deployment", () => {
  test("admin displays prominent 'Publish to Live Site' buttons and decouples saving from deployment", async ({
    page,
  }) => {
    await page.goto("/admin");

    // Unlock using passcode keypad (7337)
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // 1. Verify sticky bottom bar action buttons exist
    const publishBtn = page.getByRole("button", { name: "Publish to Live Site" });
    await expect(publishBtn).toBeVisible();

    const saveCmsBtn = page.getByRole("button", { name: "Save Changes to CMS" });
    await expect(saveCmsBtn).toBeVisible();

    // 2. Edit a field to make state dirty -> enables "Save Changes to CMS"
    await page.getByLabel(/Hero Main Headline/i).fill("Speak English with Unshakeable Confidence");
    await expect(saveCmsBtn).toBeEnabled();

    // Click "Save Changes to CMS" -> saves directly and displays instant CMS message
    await saveCmsBtn.click();
    await expect(
      page.getByText(/(?:Saved to CMS! Click 'Publish Changes to Live Site'|Draft saved to CMS)/i),
    ).toBeVisible();

    // 3. Click "Publish to Live Site" -> triggers on-demand deployment and renders confirmation banner
    await publishBtn.click();
    await expect(
      page.getByText(/Deployment started! (?:Your live website|The live site) will (?:update|refresh) in ~60 seconds\./i),
    ).toBeVisible();

    // 4. Verify banner can be dismissed
    const dismissBtn = page.getByRole("button", { name: "Dismiss deployment status" });
    await expect(dismissBtn).toBeVisible();
    await dismissBtn.click();
    await expect(
      page.getByText(/Deployment started! (?:Your live website|The live site) will (?:update|refresh) in ~60 seconds\./i),
    ).toHaveCount(0);
  });
});
