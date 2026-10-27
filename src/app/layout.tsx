import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { SiteShell } from "@/components/layout/SiteShell";
import { EXTENDED_KEYWORDS, HOME_DESCRIPTION, HOME_TITLE, TITLE_SUFFIX, rootSocial } from "@/lib/seo";
import { SITE, plainText } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: HOME_TITLE, template: `%s | ${TITLE_SUFFIX}` },
  description: HOME_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: `${SITE.founder} (${plainText(SITE.founderAlias)})` }],
  creator: SITE.founder,
  publisher: SITE.name,
  keywords: EXTENDED_KEYWORDS,
  category: "education",
  ...rootSocial,
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "LIFE English", statusBarStyle: "black" },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "geo.region": "IN-AP",
    "geo.placename": "Madhurawada, Visakhapatnam",
    "geo.position": "17.8185;83.3532",
    ICBM: "17.8185, 83.3532",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#07090E",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('life-theme');if(t==='light'){document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');document.documentElement.style.colorScheme='dark';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-dvh font-sans">
        <SiteShell>{children}</SiteShell>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
