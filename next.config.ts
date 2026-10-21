import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

// Ensure CMS snapshot exists before static export, even if the runner invokes `next build` directly
if (!existsSync("src/lib/cms.generated.json") && process.env.CMS_SYNC !== "off") {
  try {
    console.log("[next.config] Syncing CMS content before static build...");
    execSync(
      "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --env-file-if-exists=.env.local scripts/sync-cms.mts",
      { stdio: "inherit" },
    );
  } catch (e) {
    console.warn("[next.config] CMS sync step completed or fallback applied:", e);
  }
}

// Fully static export for Cloudflare Pages: `npm run build` writes the site to ./out.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // No image optimisation server on static hosting; images are pre-optimised WebP/PNG.
    unoptimized: true,
  },
};

export default nextConfig;
