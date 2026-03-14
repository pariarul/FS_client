"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchFromAPI } from "@/utils/api";
import SupplierForm, { SupplierFormContent } from './components/supplierForm';

/* =====================
   Type Definitions
 ===================== */
import { Lang, LocalizedText } from "@/utils/language";

interface SupplierManager {
  imagePath: string;
  name: LocalizedText;
  role: LocalizedText;
  heading: LocalizedText;
  description: LocalizedText;
}

interface SupplierMap {
  heading: LocalizedText;
  description: LocalizedText;
  imagePath: string;
}

interface SupplierFormContentExtended extends SupplierFormContent {
  // Existing structure
}

interface SupplierData {
  heading: LocalizedText;
  manager: SupplierManager;
  supplierMap: SupplierMap;
  supplierForm: any; // Using any for local form data to avoid schema mismatch
  reviews_heading: LocalizedText;
  reviews_description: LocalizedText;
  reviews: SupplierReview[];
}

interface SupplierReview {
  id: string;
  supplierCompanyName: LocalizedText;
  country: LocalizedText;
  supplierLogoPath: string;
  message: LocalizedText;
}

/* =====================
   ReviewCard Component
 ===================== */
type ReviewCardProps = {
  review: SupplierReview;
  getText: (obj?: LocalizedText | null) => string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, getText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div
      className={`
        relative bg-(--color-primary) text-white rounded-lg shadow-md
        hover:shadow-xl transition-shadow duration-500 overflow-hidden
        group cursor-pointer w-full max-w-sm h-20
        ${isExpanded ? "h-auto" : ""} md:h-20 md:hover:h-auto
        flex flex-col
      `}
      onClick={handleToggle}
    >
      <div className="p-4 flex items-center justify-between border-b border-white/20">
        <div className="flex items-center gap-3">
          <img
            src={review.supplierLogoPath}
            alt={getText(review.supplierCompanyName)}
            className="w-12 h-12 object-contain rounded-full"
          />
          <div>
            <h3 className="text-xs sm:text-sm md:text-sm lg:text-sm font-semibold leading-tight">
              {getText(review.supplierCompanyName)}
            </h3>
            <p className="text-xs sm:text-sm md:text-sm text-gray-200">
              {getText(review.country)}
            </p>
          </div>
        </div>
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div
        className={`
          p-4 bg-(--color-primary)/95 backdrop-blur-sm
          max-h-80 overflow-y-auto
          ${isExpanded ? "opacity-100" : "opacity-0"}
          md:opacity-0 md:group-hover:opacity-100
          transition-opacity duration-300 ease-in-out
        `}
      >
        <p className="text-xs sm:text-sm leading-relaxed text-gray-100">
          {getText(review.message)}
        </p>
      </div>
    </div>
  );
};

/* =====================
   Main Component
 ===================== */
export default function SuppliersPage() {
  const params = useParams();
  const lang = (params.lang as Lang) || "en";
  const [data, setData] = useState<SupplierData | null>(null);

  useEffect(() => {
    const loadSuppliers = async () => {
      const result = await fetchFromAPI<SupplierData>("/suppliers/get-suppliers-section");
      if (result) setData(result);
    };
    loadSuppliers();
  }, []);

  useEffect(() => {
    if (data) {
      const urlParams = new URLSearchParams(window.location.search);
      const supplierForm = urlParams.get('supplierForm');
      if (supplierForm === 'true') {
        const section = document.getElementById('supplier-form');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [data]);

  if (!data) return <div className="min-h-screen bg-(--color-background)" />;

  const getText = (obj?: LocalizedText | null): string => {
    if (!obj) return "";
    return obj[lang] || obj.en || "";
  };

  return (
    <main className="p-8 mt-20">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-primary">
        {data.heading ? getText(data.heading) : ""}
      </h1>

      {/* Manager Section */}
      <section className="mb-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="flex-[0_0_auto]">
            {data.manager && (
              <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                {data.manager.imagePath ? (
                  <img
                    src={data.manager.imagePath}
                    alt={getText(data.manager.name)}
                    className="w-[300px] h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-[300px] h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">No Image</div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black via-black/50 to-transparent">
                  <h3 className="text-lg font-semibold mb-1 text-white drop-shadow-md">
                    {getText(data.manager.name)}
                  </h3>
                  <p className="text-sm text-gray-200 drop-shadow-md">
                    {getText(data.manager.role)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4 text-primary">
              {data.manager ? getText(data.manager.heading) : ""}
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.manager ? getText(data.manager.description) : ""}</p>
          </div>
        </div>
      </section>

      {/* Supplier Reviews Section */}
      <section className="mb-24">
        <h2 className="text-2xl sm:text-2xl md:text-4xl font-extrabold mb-4 text-center text-primary">
          {data.reviews_heading ? getText(data.reviews_heading) : ""}
        </h2>
        <p className="max-w-4xl text-base sm:text-sm md:text-sm text-gray-700 text-center mx-auto mb-12">
          {data.reviews_description ? getText(data.reviews_description) : ""}
        </p>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start justify-items-center">
            <div className="space-y-6">
              {(data.reviews || [])
                .filter((_, i) => i % 3 === 0)
                .map((review) => (
                  <ReviewCard key={review.id} review={review} getText={getText} />
                ))}
            </div>
            <div className="space-y-6">
              {(data.reviews || [])
                .filter((_, i) => i % 3 === 1)
                .map((review) => (
                  <ReviewCard key={review.id} review={review} getText={getText} />
                ))}
            </div>
            <div className="space-y-6">
              {(data.reviews || [])
                .filter((_, i) => i % 3 === 2)
                .map((review) => (
                  <ReviewCard key={review.id} review={review} getText={getText} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 text-center text-primary">
          {data.supplierMap ? getText(data.supplierMap.heading) : ""}
        </h2>
        <p className="max-w-3xl text-gray-700 text-center mx-auto mb-8 text-sm sm:text-base">
          {data.supplierMap ? getText(data.supplierMap.description) : ""}
        </p>
        <div className="max-w-6xl mx-auto">
          {data.supplierMap?.imagePath ? (
            <img
              src={data.supplierMap.imagePath}
              alt={getText(data.supplierMap.heading)}
              className="w-full h-auto object-contain sm:h-[350px] md:h-[450px] lg:h-[500px] transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
             <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">No Map Image</div>
          )}
        </div>
      </section>

      {/* Supplier Form Section */}
      <section id="supplier-form" className="mb-24">
        {data.supplierForm && (
          <SupplierForm content={data.supplierForm as SupplierFormContent} lang={lang} />
        )}
      </section>
    </main>
  );
}