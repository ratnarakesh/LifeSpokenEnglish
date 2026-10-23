import { expect, test } from "@playwright/test";

test.describe("Version 46: Consolidated 2-Step Action Gating & Header Streamlining", () => {
  test("header has NO publish button and bottom bar enforces strict 2-step progression through all 4 states", async ({
    page,
  }) => {
    await page.goto("/admin");

    // Passcode unlock (7337)
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // 1. Verify Top Executive Header has NO publish button (only ThemeToggle, View Live Site, Logout)
    const header = page.locator("div.mb-6.flex.flex-wrap.items-center.justify-between");
    await expect(header).toBeVisible();
    await expect(header.getByRole("button", { name: /Publish/i })).toHaveCount(0);
    await expect(header.getByRole("link", { name: /(?:View )?Live Site/i })).toBeVisible();
    await expect(header.getByRole("button", { name: /Logout/i })).toBeVisible();

    // 2. STATE 1: Clean / No Changes (Default on login & load)
    const saveBtn = page.getByRole("button", { name: /Save Changes to CMS/i });
    const publishBtn = page.getByRole("button", { name: /Publish (?:Changes )?to Live Site/i });

    // Save to CMS: Disabled with text "No Changes to Save"
    await expect(saveBtn).toBeDisabled();
    await expect(saveBtn).toHaveText(/No Changes to Save/i);

    // Publish to Live Site: Disabled with text "Site Up to Date"
    await expect(publishBtn).toBeDisabled();
    await expect(publishBtn).toHaveText(/Site Up to Date/i);

    // Banners/Messages: Completely hidden (no ghost text)
    await expect(page.getByText(/Saved to CMS!/i)).toHaveCount(0);
    await expect(page.getByText(/Deployment started!/i)).toHaveCount(0);

    // 3. STATE 2: Editing in Progress (User changes any text)
    const trialBadgeInput = page.getByLabel(/Hero Trial Badge Text/i);
    await trialBadgeInput.fill("10 Days 100% Free Trial - Zero Advance Fee");

    // Save to CMS: Enabled with amber accent and text "Save Changes to CMS"
    await expect(saveBtn).toBeEnabled();
    await expect(saveBtn).toHaveText(/Save Changes to CMS/i);

    // Publish to Live Site: Disabled with text "Save to CMS First"
    await expect(publishBtn).toBeDisabled();
    await expect(publishBtn).toHaveText(/Save to CMS First/i);

    // 4. STATE 3: Saved to CMS (Pending Live Deployment)
    await saveBtn.click();

    // Green toast banner displays for saved state
    const saveToast = page.getByText(
      /Saved to CMS! Click 'Publish Changes to Live Site' when you are ready to update the public site\./i,
    );
    await expect(saveToast).toBeVisible();

    // Save to CMS: Disabled with text "All Changes Saved to CMS"
    await expect(saveBtn).toBeDisabled();
    await expect(saveBtn).toHaveText(/All Changes Saved to CMS/i);

    // Publish to Live Site: Enabled with glowing emerald accent
    await expect(publishBtn).toBeEnabled();
    await expect(publishBtn).toHaveText(/🚀 Publish Changes to Live Site/i);

    // 5. STATE 4: Deploying / Deployed
    await publishBtn.click();

    // Toast banner displays deployment message
    const deployToast = page.getByText(
      /Deployment started! Your live website will update in ~60 seconds\./i,
    );
    await expect(deployToast).toBeVisible();

    // Once deployment finishes, resets to State 1: "Site Up to Date"
    await expect(publishBtn).toBeDisabled();
    await expect(publishBtn).toHaveText(/Site Up to Date/i);

    // Dismiss deployment banner
    const dismissDeployBtn = page.getByRole("button", { name: "Dismiss deployment status" });
    await expect(dismissDeployBtn).toBeVisible();
    await dismissDeployBtn.click();
    await expect(deployToast).toHaveCount(0);
  });
});
