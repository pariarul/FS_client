"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchFromAPI } from "@/utils/api";

import { Lang } from "@/utils/language";

interface TimelineEntry {
  id: string;
  year: string;
  en: { title: string; description: string };
  zh?: { title: string; description: string };
  si?: { title: string; description: string };
}

interface HistoryData {
  heading: Record<Lang, string>;
  timeline: TimelineEntry[];
}

export default function HistoryPage() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<HistoryData | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      const result = await fetchFromAPI<HistoryData>("/history/get-history");
      if (result) setData(result);
    };
    loadHistory();
  }, []);

  if (!data) return <div className="min-h-screen bg-(--color-background)" />;

  const heading = data.heading[lang] || data.heading.en;
  const timeline = data.timeline;

  return (
    <main className="p-4 md:p-8 mt-20 text-(--color-text)">
      {/* Heading */}
      <section className="max-w-6xl mx-auto mb-12 md:mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-(--color-primary) mb-8 md:mb-12">
          {heading}
        </h1>
      </section>

      {/* Scrollable Timeline */}
      <section className="relative max-w-6xl mx-auto">
        <div className="relative">
          <div className="absolute left-1/2 top-0 w-0.5 bg-(--color-primary) -translate-x-1/2 hidden sm:block" style={{ height: "100%" }}></div>

          {/* Desktop Timeline */}
          <div className="hidden sm:block max-h-[70vh] overflow-y-auto relative">
            {timeline.map((entry, index) => {
              const title = (entry as any)[lang]?.title || entry.en.title;
              const description = (entry as any)[lang]?.description || entry.en.description;
              const isEven = index % 2 === 1;

              return (
                <div key={`desktop-${entry.id}`} className="relative w-full mb-28 md:mb-20">
                  <div className="w-full flex items-center relative">
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-3 md:h-3 bg-(--color-primary) rounded-full z-20"></div>
                    {!isEven ? (
                      <>
                        <div className="w-1/2 flex justify-center pr-32 md:pr-16 relative">
                          <div className="absolute top-1/2 right-5 h-0.5 bg-(--color-primary) w-60 md:w-24 transform -translate-y-1/2"></div>
                          <span className="font-bold text-xl md:text-lg relative z-10 text-(--color-primary) flex items-center">{entry.year}</span>
                        </div>
                        <div className="w-1/2 pl-32 md:pl-16">
                          <h3 className="text-xl md:text-lg font-bold mb-2 flex items-center">{title}</h3>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-32 md:pr-16 flex justify-end">
                          <h3 className="text-xl md:text-lg font-bold mb-2 flex items-center">{title}</h3>
                        </div>
                        <div className="w-1/2 flex justify-center relative">
                          <div className="absolute top-1/2 left-5 h-0.5 bg-(--color-primary) w-60 md:w-24 transform -translate-y-1/2"></div>
                          <span className="ml-5 font-bold text-xl md:text-lg relative z-10 text-(--color-primary) flex items-center">{entry.year}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="w-full flex mt-4">
                    {!isEven ? (
                      <>
                        <div className="w-1/2"></div>
                        <div className="w-1/2 pl-32 md:pl-16">
                          <p className="text-base md:text-sm text-(--color-text) leading-relaxed text-justify max-w-md">{description}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-32 md:pr-16 flex justify-end">
                          <p className="text-base md:text-sm text-(--color-text) leading-relaxed text-justify max-w-md">{description}</p>
                        </div>
                        <div className="w-1/2"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Timeline */}
          <div className="sm:hidden max-h-[70vh] overflow-y-auto relative space-y-12">
            {timeline.map((entry) => {
              const title = (entry as any)[lang]?.title || entry.en.title;
              const description = (entry as any)[lang]?.description || entry.en.description;

              return (
                <div key={`mobile-${entry.id}`} className="relative w-full">
                  <div className="flex flex-col items-center relative">
                    <span className="font-bold text-xl text-(--color-primary) mb-2">{entry.year}</span>
                    <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
                    <p className="text-sm text-(--color-text) leading-relaxed text-center px-4 mb-6">{description}</p>
                    <div className="w-full h-0.5 bg-(--color-primary) mb-6"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
