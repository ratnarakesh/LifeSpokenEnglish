// Generates all logo / icon assets from the official LIFE logo source.
// Usage: node scripts/build-brand-assets.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "assets/brand/life-logo-dark-source.png";
const BG = { r: 11, g: 8, b: 6, alpha: 1 }; // matches --color-obsidian-950
const BLACK_THRESHOLD = 48;

async function removeBlackBackground(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const isBg = (i) => Math.max(data[i], data[i + 1], data[i + 2]) < BLACK_THRESHOLD;
  const seen = new Uint8Array(width * height);
  const stack = [];
  for (let x = 0; x < width; x++) stack.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y++) stack.push(y * width, y * width + width - 1);

  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    const i = p * 4;
    if (!isBg(i)) continue;
    data[i + 3] = 0;
    const x = p % width;
    const y = (p - x) / width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - width);
    if (y < height - 1) stack.push(p + width);
  }
  return sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

const trim = (buf) => sharp(buf).trim({ threshold: 1 }).png().toBuffer();

async function squarePad(buf, size, padRatio, background) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(buf)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: resized, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await mkdir("public/brand", { recursive: true });

const transparent = await trim(await removeBlackBackground(SOURCE));
const { width, height } = await sharp(transparent).metadata();

// Full logo (eagle + sun + LIFE wordmark + tagline)
// PNG kept for structured data / social; the site itself uses the much lighter WebP.
await sharp(transparent).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile("public/brand/life-logo.png");
await sharp(transparent).webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile("public/brand/life-logo.webp");

// Emblem only (eagle + sun), cropped just above the wordmark
const emblemHeight = Math.round(height * 0.722);
const emblem = await trim(
  await sharp(transparent).extract({ left: 0, top: 0, width, height: emblemHeight }).png().toBuffer(),
);
const emblem256 = await squarePad(emblem, 256, 0, { r: 0, g: 0, b: 0, alpha: 0 });
await sharp(emblem256).png({ compressionLevel: 9, palette: true }).toFile("public/brand/life-emblem.png");
await sharp(emblem256).webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile("public/brand/life-emblem.webp");
// Header emblem: displayed at 44-48 CSS px, 160px covers 3x screens.
await sharp(emblem256).resize(160, 160).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile("public/brand/life-emblem-160.webp");

// Favicon + home-screen icons
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
// Browser tab favicon is shown at 16-32px: 96px is plenty and keeps the first visit light.
const png = (buf) => sharp(buf).png({ compressionLevel: 9, palette: true });
await png(await squarePad(emblem, 96, 0.02, clear)).toFile("src/app/icon.png");
await png(await squarePad(emblem, 180, 0.08, BG)).toFile("src/app/apple-icon.png");
await png(await squarePad(emblem, 192, 0.06, BG)).toFile("public/brand/icon-192.png");
await png(await squarePad(emblem, 512, 0.06, BG)).toFile("public/brand/icon-512.png");
await png(await squarePad(emblem, 512, 0.16, BG)).toFile("public/brand/icon-maskable-512.png");

// Social share image (1200x630)
const ogLogo = await sharp(transparent).resize({ height: 500 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: BG } })
  .composite([{ input: ogLogo, gravity: "center" }])
  .png({ compressionLevel: 9, palette: true })
  .toFile("public/brand/og-image.png");

console.log(`Brand assets generated (source trimmed to ${width}x${height}).`);
