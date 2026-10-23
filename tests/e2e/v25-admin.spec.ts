import { expect, test } from "@playwright/test";

test.describe("Version 25: Full Website Admin Coverage (/admin)", () => {
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

  test("tab navigation: switches between all 5 administrative sections", async ({ page }) => {
    // 1. Announcements & Hero
    await expect(page.getByRole("heading", { name: "Batch Announcement Bar" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hero & Trial Details" })).toBeVisible();

    // 2. Videos & Gallery tab
    await page.getByRole("button", { name: /Videos & Gallery/i }).click();
    await expect(page.getByRole("heading", { name: "Add New Video Lesson" })).toBeVisible();
    await expect(page.getByText(/Existing Gallery Items/i)).toBeVisible();

    // 3. Courses & Syllabus tab
    await page.getByRole("button", { name: /Courses & Syllabus/i }).click();
    await expect(page.getByRole("heading", { name: "Course Tracks & Syllabus" })).toBeVisible();
    await expect(page.locator('input[value="Everyday Spoken English & Confidence"]')).toBeVisible();

    // 4. FAQs tab
    await page.getByRole("button", { name: /FAQs/i }).click();
    await expect(page.getByRole("heading", { name: "Add New FAQ Question" })).toBeVisible();
    await expect(page.getByText("Is the 10-day trial completely free?")).toBeVisible();

    // 5. Reviews & Founder tab
    await page.getByRole("button", { name: /Reviews & Founder/i }).click();
    await expect(page.getByRole("heading", { name: "Founder Profile & Bio" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Add Student Testimonial" })).toBeVisible();
  });

  test("content mutation: adds a new video and edits an FAQ question", async ({ page }) => {
    // Navigate to Videos & Gallery
    await page.getByRole("button", { name: /Videos & Gallery/i }).click();

    // Fill in new video form
    await page.getByPlaceholder(/youtube\.com.*or 11-char ID/i).fill("https://www.youtube.com/watch?v=XMvkLBuzCac");
    await page.getByPlaceholder(/e\.g\. Everyday Situational Dialogue/i).fill("Advanced Pronunciation Masterclass");
    await page.getByRole("button", { name: "Add Video to Gallery" }).click();

    // Verify new video appears in existing items
    await expect(page.locator('input[value="Advanced Pronunciation Masterclass"]')).toBeVisible();

    // Navigate to FAQs
    await page.getByRole("button", { name: /FAQs/i }).click();

    // Fill in new FAQ
    await page.getByPlaceholder(/What if I miss a weekend session/i).fill("Do you provide certificates upon course completion?");
    await page.getByPlaceholder(/Detailed answer for students/i).fill("Yes, all students receive a signed completion certificate.");
    await page.getByRole("button", { name: "Add FAQ Item" }).click();

    // Verify new FAQ is rendered
    await expect(page.getByText("Do you provide certificates upon course completion?")).toBeVisible();

    // Save and verify CMS save trigger message
    const saveBtn = page.getByRole("button", { name: /Save (?:Changes to CMS|& Update Website)/i });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    await expect(page.getByRole("status").first()).toHaveText(
      /(?:Draft saved to CMS instantly|Changes saved! Your website is rebuilding)/i,
    );
  });
});
