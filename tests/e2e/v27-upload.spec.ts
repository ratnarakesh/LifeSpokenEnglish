import { expect, test } from "@playwright/test";

test.describe("Version 27: Direct Media & Photo Uploads in Admin Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin");
    // Unlock using keypad passcode 7337
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "7", exact: true }).click();
    await page.getByRole("button", { name: "Unlock Control Panel" }).click();
    await expect(
      page.getByRole("heading", { name: /LIFE Spoken English - Mani\s+Sir Control Panel/i }),
    ).toBeVisible();
  });

  test("Tab 5: Founder Profile displays portrait preview and uploads new official portrait", async ({
    page,
  }) => {
    // Navigate to Reviews & Founder tab
    await page.getByRole("button", { name: /Reviews & Founder/i }).click();

    // Verify Founder Profile card and active portrait image
    await expect(page.getByRole("heading", { name: "Founder Profile & Bio" })).toBeVisible();
    await expect(page.getByText("Official Founder Portrait Photo")).toBeVisible();
    await expect(page.locator("img[alt='Mani\u00A0Sir']")).toBeVisible();

    // Select a test image for founder portrait
    const fileInput = page.locator("#founder-portrait-input");
    await expect(fileInput).toBeAttached();

    await fileInput.setInputFiles({
      name: "new-portrait.webp",
      mimeType: "image/webp",
      buffer: Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64"),
    });

    // Verify preview and selected file info appear
    await expect(page.getByText(/Selected: new-portrait\.webp/i)).toBeVisible();
    await expect(page.getByText("Preview", { exact: true })).toBeVisible();

    // Click upload button
    const uploadBtn = page.getByRole("button", { name: /Upload New Portrait Photo/i });
    await expect(uploadBtn).toBeVisible();
    await uploadBtn.click();

    // Verify success confirmation
    await expect(
      page.getByText(/Official portrait updated successfully! Website is rebuilding\.|Photo uploaded and published successfully/i),
    ).toBeVisible();
  });

  test("Tab 2: Videos & Gallery provides segmented toggle and uploads classroom photo", async ({
    page,
  }) => {
    // Navigate to Videos & Gallery tab
    await page.getByRole("button", { name: /Videos & Gallery/i }).click();

    // Verify segmented toggle exists
    const videoToggleBtn = page.getByRole("button", { name: "Add Video Lesson" });
    const photoToggleBtn = page.getByRole("button", { name: "Upload Photo" });
    await expect(videoToggleBtn).toBeVisible();
    await expect(photoToggleBtn).toBeVisible();

    // Switch to Upload Photo mode
    await photoToggleBtn.click();
    await expect(
      page.getByRole("heading", { name: "Upload Classroom & Event Photo" }),
    ).toBeVisible();

    // Verify file input and caption fields
    const photoInput = page.locator("#gallery-photo-input");
    await expect(photoInput).toBeAttached();

    await photoInput.setInputFiles({
      name: "classroom-session.webp",
      mimeType: "image/webp",
      buffer: Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64"),
    });

    await expect(page.getByText(/Selected: classroom-session\.webp/i)).toBeVisible();

    // Fill caption / title and select category
    const titleInput = page.getByPlaceholder(/e\.g\. Mani Sir mentoring students/i);
    await titleInput.fill("Mani\u00A0Sir Weekend Group Discussion Drill");

    // Display order
    const orderInput = page.locator("input[type='number']");
    await orderInput.fill("10");

    // Click Upload & Add to Gallery button
    const submitBtn = page.getByRole("button", { name: /Upload & Add to Gallery/i });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Verify success confirmation
    await expect(
      page.getByText(/Photo uploaded and published successfully|Classroom photo uploaded/i),
    ).toBeVisible();

    // Verify new item appears in the existing gallery items list
    await expect(
      page.locator("input[value='Mani\u00A0Sir Weekend Group Discussion Drill']"),
    ).toBeVisible();
  });
});
