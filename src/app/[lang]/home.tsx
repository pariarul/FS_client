"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { fetchFromAPI } from "@/utils/api";

// === TYPES ===
import { Lang, LocalizedText } from "@/utils/language";

interface HeroData {
  heading: LocalizedText;
  subheading: LocalizedText;
  background: Record<string, string>;
  "suppliers-branding": Record<string, string>;
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <LeadersSection />
      <SupplierSection />
      <ProductsSection />
      <CTASection />
    </main>
  );
}

// ======================== HERO SECTION ========================
function HeroSection() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<HeroData | null>(null);
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const loadHero = async () => {
      const hero = await fetchFromAPI<HeroData>("/home/get-hero-section");
      if (hero) setData(hero);
    };
    loadHero();
  }, []);

  const backgrounds = Object.values(data?.background || {});
  const supplierBrandings = Object.values(data?.["suppliers-branding"] || {});

  useEffect(() => {
    if (backgrounds.length > 0) {
      const interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [backgrounds.length]);

  if (!data) return <div className="h-screen bg-black" />; // Loading placeholder

  const heading = data.heading?.[lang] || data.heading?.en || "";
  const subheading = data.subheading?.[lang] || data.subheading?.en || "";

  return (
    <main className="relative w-full overflow-hidden">
      <section id="hero-section" className="relative w-full h-[75vh] sm:h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
        {backgrounds.map((path, i) => (
          <div
            key={`bg-${i}`}
            className={` bg-black absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === currentBg ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${path})` }}
          ></div>
        ))}

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-3xl px-4 mx-auto w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-extrabold mb-4 drop-shadow-lg leading-tight">
            {heading}
          </h1>
          <p className="text-base xs:text-lg sm:text-lg mb-8 drop-shadow-md px-2 sm:px-0">{subheading}</p>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
          <ArrowDown
            onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-12 h-12 text-primary bg-(--color-background) rounded-full p-2 cursor-pointer
               transition-all duration-300 ease-in-out
               hover:scale-125 hover:animate-pulse-zoom"
          />
        </div>

        <style jsx>{`
          @keyframes pulse-zoom {
            0%, 100% { transform: scale(1.25); }
            50% { transform: scale(1.5); }
          }
          .animate-pulse-zoom {
            animation: pulse-zoom 1.2s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* =============== Branding Section ======================== */}
      <section className="w-full bg-[#F7EDE2] py-12 overflow-hidden">
        <div className="w-full bg-(--color-primary) py-10 px-6">
          <div
            className="flex items-center gap-16 flex-nowrap animate-slide"
            style={{ animation: "slide 20s linear infinite" }}
          >
            {(supplierBrandings || []).map((logo, i) => (
              logo ? (
                <img
                  key={`branding-${i}`}
                  src={logo}
                  alt={`Supplier ${i + 1}`}
                  className="h-15 md:h-20 object-contain"
                />
              ) : null
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide {
            display: flex;
            width: calc(200% + 16px);
          }
        `}</style>
      </section>
    </main>
  );
}

// ======================== ABOUT SECTION ======================== 
interface StatusItem {
  id: string;
  count: string;
  en: string;
  zh?: string;
  si?: string;
}

interface AboutData {
  title: LocalizedText;
  description: LocalizedText;
  status: StatusItem[];
}

function AboutSection() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    const loadAbout = async () => {
      const about = await fetchFromAPI<AboutData>("/home/get-about-section");
      if (about) setData(about);
    };
    loadAbout();
  }, []);

  if (!data) return null;

  const title = data.title?.[lang] || data.title?.en || "";
  const description = data.description?.[lang] || data.description?.en || "";
  const statuses = data.status || [];

  return (
    <section id="about-section" className="bg-(--color-background) max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl xs:text-3xl sm:text-3xl font-bold text-(--color-primary) mb-4 sm:mb-6 text-center md:text-left">{title}</h2>
        <p className="text-base sm:text-md text-(--color-text) text-center md:text-left">{description}</p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 pl-0 md:pl-20 lg:pl-40 mt-6 md:mt-0">
        {statuses.map((status) => (
          <StatusCard key={status.id} count={status.count} label={status[lang] || (status as any).en} />
        ))}
      </div>
    </section>
  );
}

function StatusCard({ count, label }: { count: string; label: string }) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(label);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isInViewport) setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [label]);

  useEffect(() => {
    if (isVisible) {
      const target = parseInt(count.replace(/\D/g, ""), 10);
      const duration = 2000;
      const increment = target / (duration / 50);
      const interval = setInterval(() => {
        setAnimatedCount((prev) => {
          const nextValue = Math.min(prev + increment, target);
          if (nextValue === target) clearInterval(interval);
          return nextValue;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible, count]);

  return (
    <div
      id={label}
      className="flex items-center justify-between p-6 rounded-lg bg-(--color-primary) text-(--color-background) shadow-md"
    >
      <span className="text-4xl font-extrabold">{Math.floor(animatedCount)}+</span>
      <p className="text-lg font-medium">{label}</p>
    </div>
  );
}

// ======================== LEADERS SECTION ========================
interface Leader {
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  imagePath: string;
}

interface LeadersData {
  heading: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  btn: LocalizedText;
  leaders: Leader[];
}

function LeadersSection() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<LeadersData | null>(null);

  useEffect(() => {
    const loadLeaders = async () => {
      const leaders = await fetchFromAPI<LeadersData>("/home/get-leadership-section");
      if (leaders) setData(leaders);
    };
    loadLeaders();
  }, []);

  if (!data) return null;

  const heading = data.heading[lang] || data.heading.en;
  const title = data.title[lang] || data.title.en;
  const description = data.description[lang] || data.description.en;
  const btnText = data.btn[lang] || data.btn.en;
  const leaders = data.leaders;

  const getText = (obj: LocalizedText) => obj[lang] || obj.en;

  return (
    <section className="bg-(--color-background) max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Heading */}
      <h1 className="text-2xl xs:text-3xl sm:text-3xl font-extrabold text-center text-(--color-primary) mb-8 sm:mb-12">
        {heading}
      </h1>

      {/* Responsive layout wrapper */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* === LEFT (Images) === */}
        <div className="order-4 md:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mx-auto w-full">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group w-full max-w-[300px] mx-auto"
            >
              {leader.imagePath ? (
                <img
                  src={leader.imagePath}
                  alt={getText(leader.name)}
                  className="w-full h-92 sm:h-96 object-cover"
                />
              ) : (
                <div className="w-full h-92 sm:h-96 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-left w-full bg-linear-to-t from-[rgba(0,0,0,0.6) to-transparent">
                <h4 className="text-base sm:text-lg font-bold mb-1 text-white">{getText(leader.name)}</h4>
                <p className="text-xs sm:text-sm text-gray-200">{getText(leader.role)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* === RIGHT (Text + Button for Desktop) === */}
        <div className="order-2 md:order-2 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-2xl xs:text-3xl sm:text-3xl font-bold text-(--color-primary) mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-md text-(--color-text) mb-4 sm:mb-6 px-2 md:px-0">
            {description}
          </p>

          {/* Button — visible here on desktop/tablet only */}
          <div className="hidden md:flex mt-4 sm:mt-5 justify-center md:justify-start">
            <a
              href={`/${lang}/our-leaderships`}
              className="inline-block border border-(--color-primary) text-(--color-text) font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-4xl shadow transition-colors duration-200 hover:bg-(--color-primary) hover:text-white text-sm sm:text-base"
            >
              {btnText}
            </a>
          </div>
        </div>

        {/* === Button (Mobile Only, Below Images) === */}
        <div className="order-5 md:hidden mt-6 flex justify-center">
          <a
            href={`/${lang}/our-leaderships`}
            className="inline-block w-full max-w-[250px] text-center border border-(--color-primary) text-(--color-text) font-semibold py-2 px-4 rounded-4xl shadow transition-colors duration-200 hover:bg-(--color-primary) hover:text-white text-sm"
          >
            {btnText}
          </a>
        </div>
      </div>
    </section>
  );
}

// ======================== SUPPLIER SECTION ========================
interface SupplierHomeData {
  heading: LocalizedText;
  description: LocalizedText;
  imagePath: string;
}

function SupplierSection() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<SupplierHomeData | null>(null);

  useEffect(() => {
    const loadSupplier = async () => {
      const supplier = await fetchFromAPI<SupplierHomeData>("/home/get-supplier-section");
      if (supplier) setData(supplier);
    };
    loadSupplier();
  }, []);

  if (!data) return null;

  const heading = data.heading[lang] || data.heading.en;
  const description = data.description[lang] || data.description.en;
  const imagePath = data.imagePath;

  return (
    <section className="bg-(--color-background) max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 text-center">
      <h1 className="text-2xl xs:text-3xl sm:text-3xl font-extrabold text-(--color-primary) mb-4 sm:mb-6">{heading}</h1>
      <p className="text-base sm:text-md text-(--color-text) mb-6 sm:mb-8 px-2 sm:px-0 max-w-4xl mx-auto text-center">
        {description}
      </p>

      {imagePath ? (
        <div className="w-full max-w-7xl mx-auto">
          <Image
            src={imagePath}
            alt="Supplier"
            width={800}
            height={500}
            className="w-full h-auto object-contain sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl sm:rounded-4xl"
          />
        </div>
      ) : null}
    </section>
  );
}
// ======================== PRODUCTS SECTION ========================
interface ProductCategory {
  id: string;
  name: LocalizedText;
  imagePath: string;
}

interface ProductsHomeData {
  heading: LocalizedText;
  description: LocalizedText;
  categories: ProductCategory[];
}

function ProductsSection() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<ProductsHomeData | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchFromAPI<ProductsHomeData>("/home/get-product-section");
      if (products) setData(products);
    };
    loadProducts();
  }, []);

  if (!data) return null;

  const heading = data.heading?.[lang] || data.heading?.en || "";
  const description = data.description?.[lang] || data.description?.en || "";
  const categories = data.categories || [];

  // Helper slices -------------------------------------------------
  const firstRow = categories.slice(0, 4);      // 0-3
  const secondRow = categories.slice(4, 8);     // 4-7 (exactly 4)
  const thirdRow = categories.slice(8);        // 8-end (will be 0 or 1)

  return (
    <section className="bg-(--color-background) max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 text-center">
      {/* Heading & description */}
      <h1 className="text-2xl xs:text-3xl sm:text-3xl font-extrabold text-(--color-primary) mb-4 sm:mb-6">
        {heading}
      </h1>
      <p className="text-base sm:text-md text-(--color-text) mb-6 sm:mb-8 max-w-4xl mx-auto px-2 sm:px-0">
        {description}
      </p>

      {/* ---------- ROW 1: 4 cards ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {firstRow.map((category) => (
          <ProductCard key={category.id} category={category} lang={lang} />
        ))}
      </div>

      {/* ---------- ROW 2: exactly 4 cards ---------- */}
      {secondRow.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {secondRow.map((category) => (
            <ProductCard key={category.id} category={category} lang={lang} />
          ))}
        </div>
      )}
      {/* ---------- ROW 3: single centered card (compact) ---------- */}
      {thirdRow.length > 0 && (
        <div className="flex justify-center mb-12">
          {/* 
            - max-w-[180px] → max-w-48   (12rem = 192px, closest canonical)
            - sm:max-w-[200px] → sm:max-w-52 (13rem = 208px)
            - md:max-w-[240px] → md:max-w-60 (15rem = 240px)   ← canonical!
          */}
          <div className="w-full max-w-48 sm:max-w-48 md:max-w-75">
            <ProductCard
              key={thirdRow[0].id}
              category={thirdRow[0]}
              lang={lang}
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Re-usable card component – keeps the markup DRY and consistent     */
/* ------------------------------------------------------------------ */
function ProductCard({
  category,
  lang,
}: {
  category: {
    id: string;
    name: { en: string; zh?: string; si?: string };
    imagePath?: string;
  };
  lang: Lang;
}) {
  const title = category.name?.[lang] || category.name?.en || "";

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]">
      {category.imagePath ? (
        <img
          src={category.imagePath}
          alt={title}
          className="w-full h-[250px] sm:h-[350px] object-cover"
        />
      ) : (
        <div className="w-full h-[250px] sm:h-[350px] bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="font-semibold text-white text-xs sm:text-base md:text-lg lg:text-base">
          {title}
        </h4>
      </div>
    </div>
  );
}

// ======================== CTA SECTION ========================
interface CTAData {
  heading: LocalizedText;
  subheading: LocalizedText;
  description: LocalizedText;
  btn: LocalizedText;
}

function CTASection() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<CTAData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCTA = async () => {
      const cta = await fetchFromAPI<CTAData>("/home/get-cta-section");
      if (cta) setData(cta);
    };
    loadCTA();
  }, []);

  if (!data) return null;

  const heading = data.heading?.[lang] || data.heading?.en || "";
  const subheading = data.subheading?.[lang] || data.subheading?.en || "";
  const description = data.description?.[lang] || data.description?.en || "";
  const buttonText = data.btn?.[lang] || data.btn?.en || "Contact Us";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <section className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-8 text-center bg-(--color-primary) text-white rounded-2xl sm:rounded-3xl mb-8 sm:mb-15">
        <h1 className="text-2xl xs:text-3xl sm:text-3xl font-extrabold mb-3 sm:mb-4">{heading}</h1>
        <h2 className="text-xl xs:text-2xl sm:text-2xl font-semibold mb-4 sm:mb-6">{subheading}</h2>
        <p className="text-base sm:text-md mb-6 sm:mb-8 max-w-5xl mx-auto px-2 sm:px-0">{description}</p>
        <button
          onClick={() => router.push(`/${lang}/our-suppliers#supplier-form`)}
          className="px-4 sm:px-6 py-2 sm:py-3 border border-white font-semibold rounded-full shadow-md hover:bg-white hover:text-(--color-primary) transition-colors duration-300 text-sm sm:text-base">
          {buttonText}
        </button>
      </section>
    </div>
  );
}
