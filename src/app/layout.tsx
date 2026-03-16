import "./globals.css";
import { ReactNode } from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fstraders.com";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "FS TRADERS | Quality Trading & Supply Solutions",
    template: "%s | FS TRADERS",
  },

  description:
    "FS TRADERS is a trusted trading company providing quality products, wholesale supply, and reliable business solutions for customers and partners.",

  keywords: [
    "FS Traders",
    "trading company",
    "wholesale supplier",
    "business trading services",
    "product supply",
    "import export trading",
    "FS Traders company",
    "industrial trading",
  ],

  authors: [{ name: "FS TRADERS" }],
  creator: "FS TRADERS",

  openGraph: {
    title: "FS TRADERS",
    description:
      "FS TRADERS provides reliable trading, wholesale supply, and business solutions with quality and trust.",
    url: siteUrl,
    siteName: "FS TRADERS",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "FS Traders Company Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "business",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

  return (
    <html lang="en">
      <body>
        {children}

        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      </body>
    </html>
  );
}