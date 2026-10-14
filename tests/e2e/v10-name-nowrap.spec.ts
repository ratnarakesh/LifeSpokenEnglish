import { expect, test } from "@playwright/test";

const PAGES = ["/", "/about", "/gallery", "/privacy", "/terms"];

for (const path of PAGES) {
  test(`name: "Mani Sir" never has a breakable space in visible text on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    if (path === "/") await page.getByRole("button", { name: /Watch Mani Sir's Video Intro/ }).click();

    const breakable = await page.evaluate(() => {
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
    expect(breakable).toEqual([]);
  });
}

test('name: hero "Mani Sir" stays on one line at every common screen width', async ({ page }) => {
  for (const width of [320, 360, 375, 390, 412, 430, 600, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const name = page.locator("#top p strong", { hasText: /Mani\s+Sir/ });
    const lines = await name.evaluate((el) => el.getClientRects().length);
    expect(lines, `width ${width}`).toBe(1);
  }
});
