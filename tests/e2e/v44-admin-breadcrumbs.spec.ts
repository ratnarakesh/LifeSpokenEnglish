import { expect, test } from "@playwright/test";

test.describe("Version 44: Sticky Breadcrumb-Style Navigation for Admin Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin");

    // Passcode unlock (7337)
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();

    // Verify authenticated
    await expect(page.getByText(/Mani\s+Sir Control Panel/i)).toBeVisible();
  });

  test("breadcrumb row renders path, current section, and save status indicator", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Admin Navigation" });
    await expect(nav).toBeVisible();

    // 1. Initial breadcrumb path
    await expect(nav.getByText("LIFE Admin")).toBeVisible();
    await expect(nav.getByRole("button", { name: "Jump to section" })).toBeVisible();

    // 2. Save status indicator
    await expect(nav.getByText("Saved")).toBeVisible();

    // 3. Fast-track pills exist for all 7 sections
    for (const pillText of [
      "1. Hero",
      "2. Gallery",
      "3. Courses",
      "4. FAQs & Contact",
      "5. Mani Sir Profile",
      "6. Logo & Promises",
      "7. Legal",
    ]) {
      await expect(nav.getByText(pillText)).toBeVisible();
    }
  });

  test("clicking fast-track pills switches active view and updates breadcrumb path dynamically", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Admin Navigation" });

    // 1. Switch to Logo & Promises
    await nav.getByText("6. Logo & Promises").click();
    await expect(nav.getByText("Brand Story & Promises")).toBeVisible();
    await expect(page.getByRole("heading", { name: /The 10 Core Commitment Promises/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Logo Story & LIFE Meaning/i })).toBeVisible();

    // 2. Switch to Courses
    await nav.getByText("3. Courses").click();
    await expect(nav.getByText("Courses & Syllabus")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Course Tracks & Syllabus/i })).toBeVisible();

    // 3. Switch to Mani Sir Profile
    await nav.getByText("5. Mani Sir Profile").click();
    await expect(nav.getByText("Founder Profile & Reviews")).toBeVisible();
    await expect(page.getByText(/Founder Profile & Bio/i)).toBeVisible();

    // 4. Switch to Legal
    await nav.getByText("7. Legal").click();
    await expect(nav.getByText("Legal & Policies").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Legal Policies & DPDP Compliance/i })).toBeVisible();
  });

  test("section dropdown popover opens, lists all 7 tabs, and switches section on tap", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Admin Navigation" });

    // Click breadcrumb section button to open popover
    const sectionToggle = nav.getByRole("button", { name: "Jump to section" });
    await sectionToggle.click();

    // Popover menu is visible
    await expect(page.getByText("Switch Admin Section")).toBeVisible();

    // Select "Videos & Gallery" from popover
    const galleryOption = page.getByRole("button", { name: /Switch to Videos & Gallery/i });
    await expect(galleryOption).toBeVisible();
    await galleryOption.click();

    // Popover closes and section changes
    await expect(page.getByText("Switch Admin Section")).toHaveCount(0);
    await expect(nav.getByText("Videos & Gallery").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Add Video Lesson/i })).toBeVisible();
  });

  test("breadcrumb bar remains sticky while scrolling through long sections", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Admin Navigation" });

    // Switch to long story section
    await nav.getByText("6. Logo & Promises").click();
    await expect(page.getByRole("heading", { name: /The 10 Core Commitment Promises/i })).toBeVisible();

    // Scroll down 700px
    await page.evaluate(() => window.scrollBy(0, 700));

    // Nav is still sticky and in viewport
    await expect(nav).toBeInViewport();

    // Can still switch tabs while scrolled
    await nav.getByText("2. Gallery").click();
    await expect(page.getByRole("button", { name: /Add Video Lesson/i })).toBeVisible();
  });
});
