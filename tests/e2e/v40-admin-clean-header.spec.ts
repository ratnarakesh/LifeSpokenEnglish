import { expect, test } from "@playwright/test";

test.describe("Version 40: Admin Clean Interface without Public Top Bar (/admin)", () => {
  test("locked state: public navbar, announcement bar and footer are excluded", async ({ page }) => {
    await page.goto("/admin");

    // Public header/navbar must NOT exist on /admin
    await expect(page.locator("header")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "About LIFE", exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "The 10 Promises", exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Fees & Trial", exact: true })).toHaveCount(0);

    // Public footer must NOT exist on /admin
    await expect(page.locator("footer")).toHaveCount(0);

    // Locked passcode card and return link must be visible
    await expect(page.getByRole("heading", { name: /LIFE Spoken English/i })).toBeVisible();
    await expect(page.getByText(/Mani\s+Sir Control Panel/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Return to Public Website/i })).toBeVisible();
  });

  test("authenticated state: public top bar excluded, executive controls and theme toggle active", async ({ page }) => {
    await page.goto("/admin");

    // Unlock using passcode keypad (7337)
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // Verify authenticated dashboard header
    await expect(page.getByRole("heading", { name: /LIFE Spoken English - Mani\s+Sir Control Panel/i })).toBeVisible();
    await expect(page.getByText("Live Connected")).toBeVisible();

    // Public navbar links must NOT be visible or confusing as admin access points
    await expect(page.locator("header")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "About LIFE", exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "The 10 Promises", exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Fees & Trial", exact: true })).toHaveCount(0);

    // Dedicated executive controls are visible
    await expect(page.getByRole("link", { name: /Live Site/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    // Theme toggle works inside admin
    const themeBtn = page.getByRole("button", { name: /Switch to (light|dark) theme/i });
    await expect(themeBtn).toBeVisible();

    // Horizontal admin section tabs are the only primary access points
    await expect(page.getByRole("button", { name: /Announcements & Hero/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Videos & Gallery/i })).toBeVisible();
  });

  test("public website pages preserve the public navbar and footer", async ({ page, isMobile }) => {
    await page.goto("/");

    // Public header exists with full navigation
    await expect(page.locator("header")).toBeVisible();
    if (!isMobile) {
      await expect(page.getByRole("link", { name: "About LIFE", exact: true })).toBeVisible();
      await expect(page.getByRole("link", { name: "The 10 Promises", exact: true })).toBeVisible();
    } else {
      await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    }

    // Public footer exists
    await expect(page.locator("footer")).toBeVisible();
  });
});
