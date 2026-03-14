import { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import RightSidebar from "./components/RightSidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";

import { supportedLangs, Lang } from "@/utils/language";

function isSupportedLang(lang: string): lang is Lang {
  return (supportedLangs as readonly string[]).includes(lang);
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  return (
    <>
      {/* ---------- Metadata & Analytics ---------- */}
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','YOUR_GTM_ID_HERE');
        `}
      </Script>

      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID_HERE"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR_GA_ID_HERE');
        `}
      </Script>

      {/* ---------- Page Content ---------- */}
      <div
        className="flex flex-col min-h-screen w-full overflow-x-hidden text-text"
        style={{ backgroundColor: "#F7EDE2" }}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=YOUR_GTM_ID_HERE"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar lang={lang} />
        <div className="flex flex-1 relative w-full">
          <RightSidebar initialLang={lang} />
          <main className="flex-1 w-full overflow-x-hidden">
            <div className="w-full">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

// ——————————————————————————————————————
// Perfect hreflang + canonical (Next.js official way)
// ——————————————————————————————————————
export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { lang } = await params;

  return {
    title: "FS Traders",
    description: "A Next.js app with i18n support",
    alternates: {
      canonical: `https://fstraders.ltd/${lang}`,           // change domain
      languages: {
        "en": "https://fstraders.ltd/en",
        "zh": "https://fstraders.ltd/zh",
        "si": "https://fstraders.ltd/si",
        "x-default": "https://fstraders.ltd/en",
      },
    },
  };
}