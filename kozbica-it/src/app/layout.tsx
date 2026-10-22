import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

// next/font host de lettertypen zelf mee met de site: geen verzoeken naar Google
// tijdens een bezoek (privacyvriendelijk).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Veilige IT, zonder gedoe | Kozbica IT Rotterdam",
    template: "%s | Kozbica IT",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#122636",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[4.25rem] sm:pb-0">
        <a
          href="#inhoud"
          className="sr-only z-[60] rounded-full bg-navy-900 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Direct naar de inhoud
        </a>
        <Header />
        <main id="inhoud" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileContactBar />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
