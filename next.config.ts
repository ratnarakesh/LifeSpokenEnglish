import type { NextConfig } from "next";

// Fully static export for Cloudflare Pages: `npm run build` writes the site to ./out.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // No image optimisation server on static hosting; images are pre-optimised WebP/PNG.
    unoptimized: true,
  },
};

export default nextConfig;
