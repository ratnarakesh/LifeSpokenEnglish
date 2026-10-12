// Generates optimised web photos from the originals in assets/people/.
// Usage: npm run media:photos
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/media/people";
await mkdir(OUT, { recursive: true });

const SOURCE = "assets/people/mani-sir-classroom-source.jpg";
const { width, height } = await sharp(SOURCE).metadata();

// Portrait 4:5, centred on Mani Sir (face sits at ~50% of the frame width).
const cropW = Math.round(height * 0.8);
const left = Math.max(0, Math.min(width - cropW, Math.round(width * 0.5 - cropW / 2)));
await sharp(SOURCE)
  .extract({ left, top: 0, width: cropW, height })
  .webp({ quality: 82 })
  .toFile(`${OUT}/mani-sir-portrait.webp`);

// Full classroom frame (shows the LIFE board and bookshelves).
await sharp(SOURCE).webp({ quality: 82 }).toFile(`${OUT}/mani-sir-classroom.webp`);

// Small round-friendly avatar.
await sharp(SOURCE)
  .extract({ left: Math.round(width * 0.33), top: 0, width: Math.round(height * 0.62), height: Math.round(height * 0.62) })
  .resize(256, 256)
  .webp({ quality: 82 })
  .toFile(`${OUT}/mani-sir-avatar.webp`);

console.log("Photos generated in", OUT);
