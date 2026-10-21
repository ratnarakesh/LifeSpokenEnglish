import { expect, test } from "@playwright/test";

test.describe("Version 31: Theme Toggle and Scroll to Top", () => {
  test("ScrollToTop: stays hidden at top and appears when scrolled past 350px, clicking returns to top", async ({ page }) => {
    await page.goto("/");
    const scrollBtn = page.getByRole("button", { name: "Scroll to top" });

    // Initially at top (scrollY = 0), the button has opacity-0 / pointer-events-none
    await expect(scrollBtn).toHaveClass(/opacity-0/);

    // Scroll down to 800px
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForFunction(() => window.scrollY > 350);

    // Now button should be visible (opacity-100)
    await expect(scrollBtn).toHaveClass(/opacity-100/);

    // Click the button to return to top
    await scrollBtn.click();
    await page.waitForFunction(() => window.scrollY === 0, undefined, { timeout: 5000 });
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("ScrollToTop: excluded on /admin", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("button", { name: "Scroll to top" })).toHaveCount(0);
  });

  test("ThemeToggle: toggles between dark and light modes and persists in localStorage", async ({ page }) => {
    await page.goto("/");

    // Default mode is dark
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    // Locate desktop theme toggle button
    const toggleBtn = page.getByRole("button", { name: /switch to light theme/i }).first();
    await expect(toggleBtn).toBeVisible();

    // Click to switch to light mode
    await toggleBtn.click();
    await expect(html).toHaveClass(/light/);
    await expect(html).not.toHaveClass(/dark/);

    const storedTheme = await page.evaluate(() => localStorage.getItem("life-theme"));
    expect(storedTheme).toBe("light");

    // Click again to switch back to dark mode
    const darkToggleBtn = page.getByRole("button", { name: /switch to dark theme/i }).first();
    await darkToggleBtn.click();
    await expect(html).toHaveClass(/dark/);
    await expect(html).not.toHaveClass(/light/);

    const updatedTheme = await page.evaluate(() => localStorage.getItem("life-theme"));
    expect(updatedTheme).toBe("dark");
  });

  test("ThemeToggle: persists preference across page reload", async ({ page }) => {
    await page.goto("/");
    const toggleBtn = page.getByRole("button", { name: /switch to light theme/i }).first();
    await toggleBtn.click();
    await expect(page.locator("html")).toHaveClass(/light/);

    // Reload page and confirm light mode remains applied immediately
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/light/);
  });
});
