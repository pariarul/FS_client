"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchFromAPI } from "@/utils/api";

import { Lang } from "@/utils/language";

interface PrivacyPolicySection {
  id: string;
  en: { title: string; [key: string]: any };
  zh?: { title: string; [key: string]: any };
  si?: { title: string; [key: string]: any };
}

interface PrivacyPolicyData {
  heading: Record<Lang, string>;
  sections: PrivacyPolicySection[];
}

export default function PrivacyPolicyPage() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<PrivacyPolicyData | null>(null);

  useEffect(() => {
    const loadPrivacyPolicy = async () => {
      const result = await fetchFromAPI<PrivacyPolicyData>("/privacypolicy/get-privacypolicy");
      if (result) setData(result);
    };
    loadPrivacyPolicy();
  }, []);

  if (!data) return <div className="min-h-screen bg-(--color-background)" />;

  const heading = data.heading[lang] ?? data.heading.en;
  const sections = data.sections;

  // Handle || → line breaks (Sinhala)
  const renderText = (text: string) => {
    if (typeof text !== "string" || !text.trim()) return null;

    return text.split("||").map((part, i) => (
      <span key={i}>
        {part.trim()}
        {i < text.split("||").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <main className="p-4 md:p-8 mt-20">
      {/* Heading */}
      <section className="max-w-6xl mx-auto mb-12 md:mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-primary mb-8 md:mb-12">
          {heading}
        </h1>
      </section>

      {/* Sections */}
      <section className="max-w-4xl mx-auto space-y-16">
        {sections.map((section) => {
          const content = (section as any)[lang] ?? section.en;

          return (
            <article key={section.id} className="space-y-6">
              {/* Section Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                {content.title}
              </h2>

              <div className="space-y-5 text-sm md:text-base leading-relaxed text-gray-700">
                {/* Render ALL content in correct order */}
                {Object.keys(content)
                  .filter((key) => key.startsWith("order"))
                  .sort((a, b) => {
                    const numA = parseInt(a.match(/order(\d+)/)?.[1] || "0");
                    const numB = parseInt(b.match(/order(\d+)/)?.[1] || "0");
                    return numA - numB;
                  })
                  .map((key) => {
                    const value = (content as any)[key];

                    if (typeof value === "string") {
                      // Render descriptions
                      return (
                        <p key={key} className="text-gray-700">
                          {renderText(value)}
                        </p>
                      );
                    } else if (Array.isArray(value)) {
                      // Render points
                      return (
                        <ul
                          key={key}
                          className="list-disc pl-6 md:pl-8 space-y-2 text-gray-700"
                        >
                          {value.map((point: string, idx: number) => (
                            <li key={idx}>{point.trim()}</li>
                          ))}
                        </ul>
                      );
                    }

                    return null;
                  })}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}