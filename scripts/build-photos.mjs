// Generates optimised web photos from the originals in assets/people/.
// Usage: npm run media:photos
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

const OUT = "public/media/people";
await mkdir(OUT, { recursive: true });

const SOURCE = existsSync("assets/people/mani-sir-natural-source.jpg")
  ? "assets/people/mani-sir-natural-source.jpg"
  : "assets/people/mani-sir-classroom-source.jpg";
const { width, height } = await sharp(SOURCE).metadata();

// Portrait 4:5, centred on Mani Sir
const targetH = Math.min(height, Math.round(width / 0.8));
const top = Math.max(0, Math.round((height - targetH) / 3)); // slightly higher than center to preserve head
const portrait = await sharp(SOURCE)
  .extract({ left: 0, top, width, height: targetH })
  .webp({ quality: 85 })
  .toBuffer();
await sharp(portrait).toFile(`${OUT}/mani-sir-portrait-v2.webp`);
await sharp(portrait).toFile(`${OUT}/mani-sir-portrait.webp`);

// Full frame as standard fallback
const classroom = await sharp(SOURCE).webp({ quality: 85 }).toBuffer();
await sharp(classroom).toFile(`${OUT}/mani-sir-classroom-v2.webp`);
await sharp(classroom).toFile(`${OUT}/mani-sir-classroom.webp`);

// Small round-friendly avatar centered on his face
const faceSize = Math.round(width * 0.58);
const avatarLeft = Math.round((width - faceSize) / 2);
const avatarTop = Math.round(height * 0.06);
const avatar = await sharp(SOURCE)
  .extract({ left: avatarLeft, top: avatarTop, width: faceSize, height: faceSize })
  .resize(256, 256)
  .webp({ quality: 85 })
  .toBuffer();
await sharp(avatar).toFile(`${OUT}/mani-sir-avatar-v2.webp`);
await sharp(avatar).toFile(`${OUT}/mani-sir-avatar.webp`);

console.log("Photos generated in", OUT);
