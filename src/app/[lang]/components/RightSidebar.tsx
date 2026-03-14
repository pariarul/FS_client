"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import footerContent from "../../../data/footer/contents.json";

import { supportedLangs, Lang } from "@/utils/language";

export default function RightSidebar({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [showLanguages, setShowLanguages] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get social links from JSON
  const side4 = footerContent?.links?.side4;

  // Sync language with URL
  useEffect(() => {
    const currentLang = pathname.split("/")[1] as Lang;
    if (supportedLangs.includes(currentLang) && currentLang !== lang) {
      setLang(currentLang);
    }
  }, [pathname, lang]);

  // Change language
  const changeLanguage = (newLang: Lang) => {
    const parts = pathname.split("/");
    parts[1] = newLang;
    router.push(parts.join("/"));
    setLang(newLang);
    setShowLanguages(false);
  };

  // Flag icons (small, circular)
  const langFlags: Record<Lang, string> = {
    en: "https://img.icons8.com/color/48/great-britain-circular.png",
    zh: "https://img.icons8.com/color/48/china-circular.png",
    si: "https://img.icons8.com/color/48/sri-lanka-circular.png",
  };

  return (
<div className="fixed right-2 sm:right-4 top-1/3 sm:top-1/3 flex flex-col items-center gap-3 sm:gap-3 z-50">  
      {/* === Language Switcher Button === */}
      <button
        onClick={() => setShowLanguages(!showLanguages)}
        className="focus:outline-none"
        title="Change Language"
      >
        <img
          src="/assets/images/lang-icon.png"
          alt="Language Selector"
          title="Change Language"
          className="w-14 h-14 sm:w-14 sm:h-14 hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </button>

      {/* === Icons (Language Flags OR Socials) === */}
      <div className="flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 ease-in-out">
        {showLanguages ? (
          // --- Show Language Flags ---
          supportedLangs.map((l) => (
            <button
              key={l}
              onClick={() => changeLanguage(l)}
              className="focus:outline-none"
              title={
                l === "en"
                  ? "Switch to English"
                  : l === "zh"
                  ? "切换到中文"
                  : "සිංහලට මාරු වන්න"
              }
            >
              <img
                src={langFlags[l]}
                alt={`${l.toUpperCase()} Flag`}
                title={
                  l === "en"
                    ? "English"
                    : l === "zh"
                    ? "Mandarin"
                    : "Sinhala"
                }
                className="w-10 h-10 sm:w-10 sm:h-10 gap-5 rounded-full border border-white/70  hover:scale-110 transition-transform duration-300 ease-in-out object-cover"
              />
            </button>
          ))
        ) : (
          // --- Show Social Media Icons (FROM JSON) ---
          <>
            {/* Gmail */}
            <a
              href={side4?.emailHref || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title="Contact via Email"
            >
              <img
                src="https://img.icons8.com/bubbles/100/gmail-new.png"
                alt="Email"
                className="w-12 h-12 sm:w-12 sm:h-12 hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </a>

            {/* WeChat */}
            <a
              href={side4?.wechatHref || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title="Contact via WeChat"
            >
              <img
                src="https://img.icons8.com/bubbles/100/weixing--v1.png"
                alt="WeChat"
                className="w-12 h-12 sm:w-12 sm:h-12 hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </a>

            {/* WhatsApp */}
            <a
              href={side4?.whatsappHref || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title="Contact via WhatsApp"
            >
              <img
                src="https://img.icons8.com/bubbles/100/whatsapp.png"
                alt="WhatsApp"
                className="w-12 h-12 sm:w-12 sm:h-12 hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </a>
          </>
        )}
      </div>
    </div>
  );
}