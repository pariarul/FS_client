"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchFromAPI } from "@/utils/api";
import {
  Facebook,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

import { Lang, LocalizedText } from "@/utils/language";

interface LinkSection {
  heading: LocalizedText;
  [key: string]: string | LocalizedText;
}

interface FooterContent {
  companyName: LocalizedText;
  companyAddress: LocalizedText;
  logoPath: string;
  links: {
    side1: LinkSection;
    side2: LinkSection;
    side3: LinkSection;
    side4: LinkSection & {
      phone?: string;
      email?: string;
      facebookHref?: string;
      wechatHref?: string;
      whatsappHref?: string;
      emailHref?: string;
    };
  };
}

const normalizePath = (path: string) => {
  return path.startsWith("/") ? path : `/${path}`;
};

export default function Footer() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<FooterContent | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const loadFooter = async () => {
      const result = await fetchFromAPI<FooterContent>("/footer/get-footer");
      if (result) setData(result);
    };
    loadFooter();
  }, []);

  if (!data) return null;

  const companyName = data.companyName?.[lang] || data.companyName?.en;
  const companyAddress = data.companyAddress?.[lang] || data.companyAddress?.en;
  const links = data.links;
  const side4 = links?.side4;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderLinkSection = (
    sectionKey: "side1" | "side2" | "side3" | "side4",
    heading: string,
    isMobile: boolean
  ) => {
    const sectionData = links?.[sectionKey] || {};
    const isExpanded = expandedSection === sectionKey;
    const hasLinks = Object.keys(sectionData).length > 0;

    return (
      <div
        key={sectionKey}
        className={isMobile ? "border-b border-(--color-background) last:border-b-0" : ""}
      >
        <button
          onClick={() => isMobile && toggleSection(sectionKey)}
          className={`w-full flex items-center justify-between ${isMobile ? "py-4 px-0" : ""}`}
          aria-expanded={isMobile ? isExpanded : undefined}
        >
          <h3 className="text-lg font-semibold opacity-90 md:mb-5">{heading}</h3>
          {isMobile && hasLinks && (
            <ChevronDown
              className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          )}
        </button>

        <ul
          className={`space-y-3 ${isMobile
            ? `overflow-hidden transition-all duration-300 ${isExpanded ? "pb-4 max-h-96" : "max-h-0"}`
            : ""
            }`}
        >
          {Object.entries(sectionData)
            .filter(([key]) => key !== "heading")
            .map(([key, value]) => (
              <li key={key}>
                {sectionKey === "side4" && key === "phone" ? (
                  <a href={`tel:${value}`} className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-(--color-background) shrink-0" />
                    <p className="text-sm">{value as string}</p>
                  </a>
                ) : sectionKey === "side4" && key === "email" ? (
                  <a href={`mailto:${value}`} className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-(--color-background) shrink-0" />
                    <p className="text-sm">{value as string}</p>
                  </a>
                ) : (
                  <a
                    href={`/${lang}${normalizePath((value as LocalizedText).path || "")}`}
                    className="text-sm hover:underline block"
                  >
                    {(value as LocalizedText)[lang] || (value as LocalizedText).en}
                  </a>
                )}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const SocialIcons = () => (
    <div className="flex justify-start space-x-2 md:space-x-4">
      <a
        href={side4?.facebookHref || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-(--color-background) p-2 rounded-full"
      >
        <Facebook className="text-(--color-primary) w-6 h-6" />
      </a>

      <a
        href={side4?.wechatHref || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-(--color-background) p-2 rounded-full inline-flex items-center justify-center"
      >
        <img
          src="https://img.icons8.com/ios/500/weixing.png"
          alt="WeChat"
          className="w-6 h-6"
        />
      </a>

      <a
        href={side4?.whatsappHref || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-(--color-background) p-2 rounded-full inline-flex items-center justify-center"
      >
        <img
          src="https://img.icons8.com/ios-filled/150/whatsapp--v1.png"
          alt="WhatsApp"
          className="w-6 h-6"
        />
      </a>

      <a
        href={side4?.emailHref || `mailto:${side4?.email}`}
        className="bg-(--color-background) p-2 rounded-full"
      >
        <Mail className="text-(--color-primary) w-6 h-6" />
      </a>
    </div>
  );

  return (
    <footer className="bg-(--color-primary) text-(--color-foreground) py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="mb-6">
            <Image
              src={data.logoPath}
              alt="Company Logo"
              width={120}
              height={120}
              className="w-24 mb-3"
            />
            <h2 className="text-lg font-bold mb-2">{companyName}</h2>
            <p className="text-xs leading-relaxed mb-4">{companyAddress}</p>
            <SocialIcons />
          </div>

          <div className="space-y-0 border-t border-(--color-background)">
            {renderLinkSection("side1", links?.side1?.heading?.[lang] || links?.side1?.heading?.en || "Quick Links", true)}
            {renderLinkSection("side2", links?.side2?.heading?.[lang] || links?.side2?.heading?.en || "About", true)}
            {renderLinkSection("side3", links?.side3?.heading?.[lang] || links?.side3?.heading?.en || "Products", true)}
            {renderLinkSection("side4", links?.side4?.heading?.[lang] || links?.side4?.heading?.en || "Contact", true)}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-5 gap-6">
          <div className="flex flex-col items-start col-span-2 space-y-4">
            <Image
              src={data.logoPath}
              alt="Company Logo"
              width={144}
              height={144}
              className="w-48 mb-3"
            />
            <h2 className="text-xl font-bold">{companyName}</h2>
            <p className="text-sm leading-relaxed max-w-sm">{companyAddress}</p>
            <SocialIcons />
          </div>

          <div className="grid grid-cols-4 gap-6 col-span-3">
            {renderLinkSection("side1", links?.side1?.heading?.[lang] || links?.side1?.heading?.en || "Quick Links", false)}
            {renderLinkSection("side2", links?.side2?.heading?.[lang] || links?.side2?.heading?.en || "About", false)}
            {renderLinkSection("side3", links?.side3?.heading?.[lang] || links?.side3?.heading?.en || "Products", false)}
            {renderLinkSection("side4", links?.side4?.heading?.[lang] || links?.side4?.heading?.en || "Contact", false)}
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 border-t border-(--color-background) pt-6 text-center">
        <p className="text-xs opacity-80">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
