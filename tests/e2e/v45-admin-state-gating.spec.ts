import { expect, test } from "@playwright/test";

test.describe("Version 45: Strict State Gating for Admin Actions & Deployment Session Hygiene", () => {
  test("enforces strict button gating, dirty tracking, banner hygiene and deployment lifecycle", async ({
    page,
  }) => {
    await page.goto("/admin");

    // Passcode unlock (7337)
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // Verify authenticated admin loads
    await expect(page.getByText(/Full-Site Live Management/i)).toBeVisible();

    // 1. FRESH STATE: Both Save and Deploy must be strictly disabled
    const saveBtn = page.getByRole("button", { name: /Save Changes to CMS/i });
    const publishBtn = page.getByRole("button", { name: /Publish (?:Changes )?to Live Site/i });

    await expect(saveBtn).toBeDisabled();
    await expect(saveBtn).toHaveText(/No Changes to Save/i);

    await expect(publishBtn).toBeDisabled();
    await expect(publishBtn).toHaveText(/Site Up to Date/i);

    // Breadcrumb status indicator shows "Saved"
    await expect(page.getByText(/Saved/i).first()).toBeVisible();

    // 2. MAKING AN EDIT: State becomes dirty
    const headlineInput = page.getByLabel(/Hero Main Headline/i);
    await headlineInput.fill("Learn Spoken English with Mani Sir - Vizag's Best");

    // Save button becomes enabled with active label
    await expect(saveBtn).toBeEnabled();
    await expect(saveBtn).toHaveText(/Save Changes to CMS/i);

    // Breadcrumb status switches to "Unsaved changes"
    await expect(page.getByText(/Unsaved changes/i)).toBeVisible();

    // Publish button remains disabled with "Save to CMS First"
    await expect(publishBtn).toBeDisabled();
    await expect(publishBtn).toHaveText(/Save to CMS First/i);
    await expect(publishBtn).toHaveAttribute(
      "title",
      "Save changes to CMS first before deploying",
    );

    // 3. SAVE CHANGES TO CMS: Saves without deploying, enables Publish to Live Site
    await saveBtn.click();

    // Save confirmation banner appears
    const saveBanner = page.getByText(/Saved to CMS! Click 'Publish Changes to Live Site'/i);
    await expect(saveBanner).toBeVisible();

    // Dirty state resets: Save button is disabled with "All Changes Saved to CMS"
    await expect(saveBtn).toBeDisabled();
    await expect(saveBtn).toHaveText(/All Changes Saved to CMS/i);
    await expect(page.getByText(/Saved/i).first()).toBeVisible();

    // Pending deployment is now active: Publish button enables with emerald glow
    await expect(publishBtn).toBeEnabled();
    await expect(publishBtn).toHaveText(/🚀 Publish Changes to Live Site/i);

    // 4. BANNER HYGIENE: Switching tab clears active notification banners
    await page.getByRole("button", { name: /Videos & Gallery/i }).click();
    await expect(saveBanner).toHaveCount(0);

    // Return to Announcements tab
    await page.getByRole("button", { name: /Announcements & Hero/i }).click();

    // 5. PUBLISH TO LIVE SITE: Executes deployment and resets pending deployment state
    await publishBtn.click();

    const deployBanner = page.getByText(/Deployment started! Your live website will update in ~60 seconds\./i);
    await expect(deployBanner).toBeVisible();

    // After deploy, publish button resets to disabled ("Site Up to Date")
    await expect(publishBtn).toBeDisabled();
    await expect(publishBtn).toHaveText(/Site Up to Date/i);

    // Dismiss deploy banner
    const dismissDeployBtn = page.getByRole("button", { name: "Dismiss deployment status" });
    await expect(dismissDeployBtn).toBeVisible();
    await dismissDeployBtn.click();
    await expect(deployBanner).toHaveCount(0);
  });
});
