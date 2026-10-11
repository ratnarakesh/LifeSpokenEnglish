import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const title =
  "LIFE Spoken English & Soft Skills Institute | Mani Sir | Madhurawada, Visakhapatnam";
const OG_IMAGE = "/brand/og-image.png";
const description =
  "Best Spoken English & Soft Skills classes in Madhurawada, Visakhapatnam (Vizag) by Mani Sir. 5.0★ Google rating from 1,800+ students. 10 free trial classes, monthly fees, 100% live offline & online batches, Telugu-friendly teaching.";

export const metadata: Metadata = {
  ...(SITE.url && { metadataBase: new URL(SITE.url), alternates: { canonical: "/" } }),
  title: { default: title, template: "%s | LIFE Spoken English" },
  description,
  applicationName: SITE.name,
  authors: [{ name: `${SITE.founder} (${SITE.founderAlias})` }],
  keywords: [
    "spoken English classes Visakhapatnam",
    "spoken English Madhurawada",
    "spoken English Vizag",
    "soft skills training Visakhapatnam",
    "English speaking course Vizag",
    "interview preparation Visakhapatnam",
    "online spoken English classes",
    "Telugu to English speaking course",
    "Mani Sir spoken English",
    "LIFE Spoken English",
  ],
  category: "education",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title,
    description,
    ...(SITE.url && { images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "LIFE – Live It For Eternity" }] }),
  },
  twitter: {
    card: SITE.url ? "summary_large_image" : "summary",
    title,
    description,
    ...(SITE.url && { images: [OG_IMAGE] }),
  },
  appleWebApp: { capable: true, title: SITE.brand, statusBarStyle: "black-translucent" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0806",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
