import { expect, test, type Locator } from "@playwright/test";

const PAGES = ["/", "/about", "/gallery", "/privacy", "/terms"];
const OFFICIAL_TEL = "tel:+917337412999";

async function expectDialable(link: Locator) {
  await expect(link).toHaveAttribute("href", OFFICIAL_TEL);
  expect(await link.evaluate((a: HTMLAnchorElement) => `${a.protocol}${a.pathname}`)).toBe(OFFICIAL_TEL);
}

for (const path of PAGES) {
  test(`tel: ${path} phone links keep the tel: protocol after hydration`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const unsafe = await page.locator('a[href*="about:invalid"], a[href^="unsafe:"], a[href^="javascript:"]').count();
    expect(unsafe).toBe(0);

    const tel = page.locator('a[href^="tel:"]');
    expect(await tel.count()).toBeGreaterThan(0);
    for (const link of await tel.all()) await expectDialable(link);
  });
}

test("tel: navbar, contact section, footer and mobile bar all dial +91 73374 12999", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expectDialable(page.locator("header").getByRole("link", { name: "Call +91 73374 12999", includeHidden: true }));
  await expectDialable(page.locator("#contact a", { hasText: "+91 73374 12999" }));
  await expectDialable(page.locator("footer a", { hasText: "+91 73374 12999" }));

  const mobileBar = page.getByRole("link", { name: "Call Mani Sir", includeHidden: true });
  await expectDialable(mobileBar);

  if (isMobile) {
    await expect(mobileBar).toBeVisible();
    await page.getByRole("button", { name: "Open menu" }).click();
    await expectDialable(page.locator("#mobile-menu").getByRole("link", { name: /Call: \+91 73374 12999/ }));
  }
});

test("terms: refund policy and outcome disclaimer are published", async ({ page }) => {
  await page.goto("/terms");
  const refunds = page.locator("#refunds");
  await expect(refunds.getByRole("heading", { name: "Refund policy" })).toBeVisible();
  await expect(
    refunds.getByText(
      "10-Class Free Trial allows 100% risk-free evaluation. Once a monthly batch fee is paid, fees are non-refundable for that active calendar month due to the strict 15 - 20 student seat limit. Batch pauses or transfers for genuine emergencies may be granted at Mani Sir's sole discretion.",
    ),
  ).toBeVisible();

  const outcomes = page.locator("#results");
  await expect(outcomes.getByRole("heading", { name: "Outcome disclaimer" })).toBeVisible();
  await expect(
    outcomes.getByText(
      "LIFE Spoken English provides practical spoken communication and soft skills mentorship. We do not offer or guarantee job placements, employment contracts, or academic degrees. Individual fluency outcomes depend entirely on learner practice, attendance, and commitment.",
    ),
  ).toBeVisible();
});
