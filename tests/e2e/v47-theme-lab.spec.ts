import { expect, test } from "@playwright/test";

test.describe("Version 47: Interactive 14-Theme Showcase Lab for Mani Sir", () => {
  test("theme lab loads in isolation without production navbar/footer and renders all presets", async ({
    page,
  }) => {
    await page.goto("/theme-lab");

    // 1. Verify robots noindex metadata
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", "noindex, nofollow");

    // 2. Production layout isolation: AnnouncementBar, Navbar, Footer, MobileActionBar are excluded
    await expect(page.locator("header.sticky.top-0.transition-all")).toHaveCount(0); // Production Navbar
    await expect(page.locator("footer")).toHaveCount(0); // Production Footer

    // 3. Verify Theme Lab Top Control Bar
    await expect(page.getByText(/Mani\s+Sir Theme Showcase Lab/i)).toBeVisible();

    // 4. Verify preset buttons are rendered
    const presetPills = page.locator("button:has-text('Sunrise Saffron')");
    await expect(presetPills).toBeVisible();

    // Verify numbered badges [1] through [14]
    for (let i = 1; i <= 14; i++) {
      await expect(page.locator(`button:has(span:text-is('${i}'))`)).toBeVisible();
    }

    // 5. Default selection is Preset #1: "Sunrise Saffron"
    await expect(page.locator("header").getByText(/Preset #1: Sunrise Saffron/i)).toBeVisible();
    await expect(page.getByText(/Radiates enthusiasm and approachable warmth/i)).toBeVisible();

    // 6. Test Quick-Switch to Preset #3 ("Royal Navy & Solar Amber")
    const preset3Btn = page.getByRole("button", { name: /Royal Navy & Solar Amber/i });
    await preset3Btn.click();

    await expect(page.locator("header").getByText(/Preset #3: Royal Navy & Solar Amber/i)).toBeVisible();
    await expect(page.getByText(/Fortune 500 corporate polish/i)).toBeVisible();
    await expect(page.getByText(/Theme #3 Live/i)).toBeVisible();

    // 7. Verify WhatsApp Vote Link contains Preset #3 details
    const whatsappBtn = page.getByRole("link", { name: /Send Mani Sir's Choice to WhatsApp/i });
    await expect(whatsappBtn).toBeVisible();
    const href = await whatsappBtn.getAttribute("href");
    expect(href).toContain("Preset%20%233");
    expect(href).toContain("Royal%20Navy");

    // 8. Test Previous / Next Navigation Arrows
    const nextBtn = page.getByRole("button", { name: "Next theme preset" });
    await nextBtn.click(); // Moves to Preset #4

    await expect(page.locator("header").getByText(/Preset #4: Emerald Growth/i)).toBeVisible();
    await expect(page.getByText(/Theme #4 Live/i)).toBeVisible();

    const prevBtn = page.getByRole("button", { name: "Previous theme preset" });
    await prevBtn.click(); // Back to Preset #3
    await expect(page.locator("header").getByText(/Preset #3: Royal Navy & Solar Amber/i)).toBeVisible();

    // 9. Verify Mock Slice Content: Hero, Mani Sir Portrait, Eagle Parable, Contact
    await expect(page.getByRole("heading", { name: /Interview/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /Mani Sir/i }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Why the Eagle\? The Parable Behind Our Logo/i })).toBeVisible();
    await expect(page.getByText(/LIFE Spoken English Classroom/i)).toBeVisible();

    // 10. Verify Mani Sir nowrap non-breaking space on visible text
    const breakableHits = await page.evaluate(() => {
      const hits: string[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const parent = node.parentElement?.tagName;
        if (parent === "SCRIPT" || parent === "STYLE") continue;
        const text = node.textContent ?? "";
        if (/Mani[ \t\n]+Sir/.test(text)) hits.push(text.trim().slice(0, 80));
      }
      return hits;
    });
    expect(breakableHits).toEqual([]);
  });

  test("interactive 3D presets: carousel, vocal soundwave, transformation duel, and device switcher", async ({
    page,
  }) => {
    await page.goto("/theme-lab");

    // 1. Test Preset #11: Interactive 3D Stage Carousel
    const preset11Btn = page.getByRole("button", { name: /Interactive 3D Stage Carousel/i });
    await preset11Btn.scrollIntoViewIfNeeded();
    await preset11Btn.click();

    await expect(page.locator("header").getByText(/Preset #11: Interactive 3D Stage Carousel/i)).toBeVisible();
    await expect(page.getByText(/The 4-Stage Fluency Acceleration Journey/i)).toBeVisible();
    await expect(page.getByText(/Microphone Drills/i)).toBeVisible();

    // 2. Test Preset #12: Microphone Stage Vocal Glow with Audio Visualizer
    const preset12Btn = page.getByRole("button", { name: /Microphone Stage Vocal Glow/i });
    await preset12Btn.scrollIntoViewIfNeeded();
    await preset12Btn.click();

    await expect(page.locator("header").getByText(/Preset #12: Microphone Stage Vocal Glow/i)).toBeVisible();
    await expect(page.getByText(/Classroom Stage Audio Frequency Visualizer/i)).toBeVisible();

    // Toggle soundwave animation
    const waveToggle = page.getByRole("button", { name: /Pause Wave/i });
    await expect(waveToggle).toBeVisible();
    await waveToggle.scrollIntoViewIfNeeded();
    await waveToggle.click({ force: true });
    await expect(page.getByRole("button", { name: /Play Wave/i })).toBeVisible();

    // 3. Test Preset #13: Telugu-to-English Transformation Duel
    const preset13Btn = page.getByRole("button", { name: /Telugu-to-English Transformation Duel/i });
    await preset13Btn.scrollIntoViewIfNeeded();
    await preset13Btn.click();

    await expect(page.locator("header").getByText(/Preset #13: Telugu-to-English Transformation Duel/i)).toBeVisible();
    await expect(page.getByText(/The Telugu-Medium Transformation Duel/i)).toBeVisible();

    // Switch between before/after tabs
    await page.getByRole("button", { name: /Day 0: Before LIFE/i }).click();
    await expect(page.getByText(/Silent Hesitation/i)).toBeVisible();
    await expect(page.getByText(/Natural Stage Command/i)).toHaveCount(0);

    await page.getByRole("button", { name: /Day 30: After LIFE/i }).click();
    await expect(page.getByText(/Natural Stage Command/i)).toBeVisible();
    await expect(page.getByText(/Silent Hesitation/i)).toHaveCount(0);

    // 4. Test Preset #10: Midnight Obsidian (Production Live Dark Mode)
    const preset10Btn = page.getByRole("button", { name: /Midnight Obsidian/i });
    await preset10Btn.scrollIntoViewIfNeeded();
    await preset10Btn.click();

    await expect(page.locator("header").getByText(/Preset #10: Midnight Obsidian/i)).toBeVisible();

    // 5. Test Device Viewport Switcher: Dual Comparator Mode
    const compareBtn = page.getByRole("button", { name: /Compare 2 Themes/i });
    await compareBtn.click();
    await expect(page.getByText(/Dual Theme Comparator/i)).toBeVisible();
    await expect(page.getByText("Theme A:", { exact: true })).toBeVisible();
    await expect(page.getByText("Theme B:", { exact: true })).toBeVisible();

    // 6. Test Mobile Frame View
    const mobileFrameBtn = page.getByRole("button", { name: /Mobile Frame/i });
    await mobileFrameBtn.click();
    await expect(page.getByText(/Mobile Phone Simulation \(iPhone 16 Pro Viewport\)/i)).toBeVisible();
  });

  test("theme lab is responsive and navigable on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
    await page.goto("/theme-lab");

    // All elements fit comfortably on mobile screen
    await expect(page.getByText(/Mani\s+Sir Theme Showcase Lab/i)).toBeVisible();
    const preset8Btn = page.getByRole("button", { name: /VIP Platinum/i });
    await preset8Btn.scrollIntoViewIfNeeded();
    await preset8Btn.click();

    await expect(page.locator("header").getByText(/Preset #8: VIP Platinum/i)).toBeVisible();
    await expect(page.getByText(/Theme #8 Live/i)).toBeVisible();

    // WhatsApp Vote button is easily clickable on mobile
    const voteBtn = page.getByRole("link", { name: /Send Mani Sir's Choice to WhatsApp/i });
    await voteBtn.scrollIntoViewIfNeeded();
    await expect(voteBtn).toBeVisible();
  });
});
