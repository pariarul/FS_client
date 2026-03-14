"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchFromAPI } from "@/utils/api";

/* =====================
   Type Definitions
 ===================== */
import { Lang, LocalizedText } from "@/utils/language";

interface LeadershipMember {
  name: LocalizedText;
  title: LocalizedText;
  imagePath: string;
  message?: LocalizedText;
}

interface Destination3Member extends LeadershipMember {
  description: LocalizedText;
}

type Headings = {
  heading: string;
  subheadingDestination1: string;
  subheadingDestination2: string;
  subheadingDestination3: string;
  subheading2Destination3: string;
  exploreBlogBtn: string;
  destination3Description?: string;
};

interface LeadershipContent {
  headings: Record<Lang, Headings>;
  destination1: LeadershipMember;
  destination2: LeadershipMember;
  destination3: Destination3Member[];
  destination3Description?: Record<string, string>;
}

/* =====================
   Component
 ===================== */
export default function LeadershipPage() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<LeadershipContent | null>(null);

  useEffect(() => {
    const loadLeadership = async () => {
      const result = await fetchFromAPI<LeadershipContent>("/leadership/get-leadership");
      if (result) setData(result);
    };
    loadLeadership();
  }, []);

  if (!data) return <div className="min-h-screen bg-(--color-background)" />;

  const headings = data.headings?.[lang] || data.headings?.["en"] || {};
  const destination1 = data.destination1 || {};
  const destination2 = data.destination2 || {};
  const destination3 = data.destination3 || [];
  const destination3Paragraph = data.destination3Description?.[lang] || data.destination3Description?.["en"] || "";

  const getText = (obj: LocalizedText) => obj[lang] || obj.en;

  return (
    <main className="p-8 mt-20">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-primary">{headings.heading || ""}</h1>

      {/* Destination1 Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="flex-[0_0_auto]">
            {destination1.imagePath ? (
              <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                <Image
                  src={destination1.imagePath}
                  alt={getText(destination1.name)}
                  width={300} 
                  height={400} 
                  className="w-[300px] h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black to-transparent">
                  <h3 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                    {getText(destination1.name)}
                  </h3>
                  <p className="text-sm text-gray-200 drop-shadow-md">
                    {getText(destination1.title)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-[300px] h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-primary">{headings.subheadingDestination1 || ""}</h2>
            <p className="text-(--color-text) leading-relaxed">{destination1.message ? getText(destination1.message) : ""}</p>
            <div className="mt-10">
              <a
                href={`/${lang}/our-leaderships/founder`}
                className="border border-(--color-primary) text-(--color-text) font-semibold py-3 px-6 rounded-4xl shadow transition-colors duration-200 hover:bg-(--color-primary) hover:text-white"
              >
                {headings.exploreBlogBtn || "Explore"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destination2 Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-24">
          <div className="flex-[0_0_auto]">
            {destination2.imagePath ? (
              <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                <Image
                  src={destination2.imagePath}
                  alt={getText(destination2.name)}
                  width={300} // Adjust width as needed
                  height={400} // Adjust height as needed
                  className="w-[300px] h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black to-transparent">
                  <h3 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                    {getText(destination2.name)}
                  </h3>
                  <p className="text-sm text-gray-200 drop-shadow-md">
                    {getText(destination2.title)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-[300px] h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-primary">{headings.subheadingDestination2 || ""}</h2>
            <p className="text-(--color-text) leading-relaxed">{destination2.message ? getText(destination2.message) : ""}</p>
            <div className="mt-10">
              <a
                href={`/${lang}/our-leaderships/co-founder`}
                className="border border-(--color-primary) text-(--color-text) font-semibold py-3 px-6 rounded-4xl shadow transition-colors duration-200 hover:bg-(--color-primary) hover:text-white"
              >
                {headings.exploreBlogBtn || "Explore"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destination3 Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-2 text-center text-primary">{headings.subheadingDestination3 || ""}</h2>
        {destination3Paragraph && (
          <p className="max-w-3xl text-gray-700 text-center mx-auto mb-8">{destination3Paragraph}</p>
        )}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {destination3.map((member, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              {/* Card image */}
              <img
                src={member.imagePath}
                alt={getText(member.name)}
                className="w-full h-96 object-cover"
              />

              {/* Name and title gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left w-full bg-linear-to-t from-black via-black to-transparent">
                <h4 className="text-lg font-bold mb-1 text-white">{getText(member.name)}</h4>
                <p className="text-sm text-gray-200">{getText(member.title)}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[rgba(3,18,47,0.9)] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col">
                {/* Top section: small avatar + name & title */}
                <div className="flex items-center gap-4 mb-4">
                  {member.imagePath && (
                    <img
                      src={member.imagePath}
                      alt={getText(member.name)}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold">{getText(member.name)}</h4>
                    <p className="text-sm">{getText(member.title)}</p>
                  </div>
                </div>
                {/* Description/content below */}
                <p className="text-sm mt-2">{member.description?.[lang] || member.description?.en || ""}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
