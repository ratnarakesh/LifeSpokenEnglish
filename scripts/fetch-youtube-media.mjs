// Downloads official thumbnails from Mani Sir's YouTube channel (@ENGLISHBYMANISIR) and saves
// optimised WebP images to public/media/yt/:
//   <id>.webp       4:5 portrait card (story + reel)
//   <id>-wide.webp  16:9 tile (gallery)
// Usage: npm run media:youtube
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// "portrait": the thumbnail holds a 9:16 vertical poster centred on a 16:9 canvas.
const VIDEOS = {
  "4LtuKMa_cIQ": "landscape",
  "5WTLd30TzjE": "landscape",
  "7eD_4PgSrYs": "landscape",
  XMvkLBuzCac: "landscape",
  Er5SNUeJwmk: "landscape",
  "3u8uwIFMfBU": "landscape",
  "r9-7-YFfs4Q": "landscape",
  YcMCJvgCnmA: "landscape",
  ZoxX1KZDUVw: "landscape",
  "jKc3s6B-4gc": "landscape",
  XLq_cRbhnKA: "landscape",
  SwTh5KpmYJo: "portrait",
  VlGL4PvH4QI: "portrait",
  Z1EMnIaNG5E: "portrait",
  "-ITXb2VtlSM": "portrait",
  wTCG6LFzdHs: "portrait",
};

const OUT = "public/media/yt";
const CARD = { width: 480, height: 600 }; // 4:5
const WIDE = { width: 640, height: 360 }; // 16:9
await mkdir(OUT, { recursive: true });

for (const [id, layout] of Object.entries(VIDEOS)) {
  let res = await fetch(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  if (!res.ok) res = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
  if (!res.ok) throw new Error(`Thumbnail not found for ${id}`);
  const input = Buffer.from(await res.arrayBuffer());
  const { width, height } = await sharp(input).metadata();

  let card;
  if (layout === "portrait") {
    const posterW = Math.round(height * (9 / 16));
    const poster = await sharp(input)
      .extract({ left: Math.round((width - posterW) / 2), top: 0, width: posterW, height })
      .toBuffer();
    const backdrop = await sharp(poster)
      .resize(CARD.width, CARD.height, { fit: "cover" })
      .blur(28)
      .modulate({ brightness: 0.55 })
      .toBuffer();
    const front = await sharp(poster).resize({ height: CARD.height }).toBuffer();
    card = sharp(backdrop).composite([{ input: front, gravity: "center" }]);
  } else {
    const cropW = Math.round(height * 0.8);
    card = sharp(input)
      .extract({ left: Math.round((width - cropW) / 2), top: 0, width: cropW, height })
      .resize(CARD.width, CARD.height);
  }
  await card.webp({ quality: 78 }).toFile(`${OUT}/${id}.webp`);
  await sharp(input).resize(WIDE.width, WIDE.height, { fit: "cover" }).webp({ quality: 78 }).toFile(`${OUT}/${id}-wide.webp`);
  console.log(`saved ${OUT}/${id}.webp + -wide.webp (${layout})`);
}
