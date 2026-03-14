"use client";

import React, { useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import productContents from "../../../data/products/content.json";
import "../../globals.css";

/* =====================
   Type Definitions
===================== */
import { Lang, LocalizedText } from "@/utils/language";

interface ProductItemLang {
    imageName: string;
    origins: string[];
}

interface ProductItem {
    imagePath: string;
    en: ProductItemLang;
    zh?: ProductItemLang;
    si?: ProductItemLang;
}

interface ProductCategoryLang {
    category: string;
}

interface ProductCategory {
    en: ProductCategoryLang;
    zh?: ProductCategoryLang;
    si?: ProductCategoryLang;
    items: ProductItem[];
}

interface Headings {
    heading: string;
    subheadingImport: string;
    subheadingExport: string;
}

interface ProductContents {
    headings: Record<Lang, Headings>;
    import: Record<string, ProductCategory>;
    export: Record<string, ProductCategory>;
}

interface PageProps {
    params: Promise<{
        lang: Lang;
    }>;
}

/* =====================
   Component
===================== */
export default function ProductsPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const { lang } = resolvedParams;

    const content = productContents as ProductContents;
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");

    const headings = content.headings[lang] || content.headings["en"];

    const importCategories = Object.values(content.import).map((category) => ({
        category: category[lang]?.category || category.en.category,
        items: category.items.map((item) => ({
            imagePath: item.imagePath,
            imageName: item[lang]?.imageName || item.en.imageName,
            origins: item[lang]?.origins || item.en.origins,
        })),
    }));

    const exportCategories = Object.values(content.export).map((category) => ({
        category: category[lang]?.category || category.en.category,
        items: category.items.map((item) => ({
            imagePath: item.imagePath,
            imageName: item[lang]?.imageName || item.en.imageName,
            origins: item[lang]?.origins || item.en.origins,
        })),
    }));

    /* 🔽 Scroll to the selected category with navbar offset */
    useEffect(() => {
        if (selectedCategory) {
            const element = document.getElementById(selectedCategory);
            if (element) {
                const yOffset = -100; // Adjust offset based on your navbar height
                const y =
                    element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }
    }, [selectedCategory]);

    return (
        <main className="p-8 mx-auto max-w-7xl bg-background mt-24 scroll-smooth">
            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-primary">
                {headings.heading}
            </h1>

            {/* Import Section */}
            <section id="import">
                <h2 className="text-2xl text-primary mb-8 text-center font-bold">
                    {headings.subheadingImport}
                </h2>

                {importCategories.map((category, index) => (
                    <section
                        key={index}
                        id={category.category}
                        className="mb-12 scroll-mt-[120px]" 
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-primary">
                            {category.category}
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {category.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    <img
                                        src={item.imagePath}
                                        alt={item.imageName}
                                        className="w-full h-[250px] sm:h-[350px] object-cover"
                                    />
                                     <div className="absolute inset-x-0 bottom-0 p-15 bg-linear-to-t from-black via-black/80 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h4 className="text-sm sm:text-base font-semibold text-white">
                                            {item.imageName}
                                        </h4>
                                        <p className="text-xs sm:text-xs text-gray-200">
                                            {item.origins.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </section>

            {/* Export Section */}
            <section id="export">
                <h2 className="text-2xl text-primary mb-8 text-center font-bold">
                    {headings.subheadingExport}
                </h2>

                {exportCategories.map((category, index) => (
                    <section
                        key={index}
                        id={category.category}
                        className="mb-12 scroll-mt-[120px]" 
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-primary">
                            {category.category}
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {category.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    <img
                                        src={item.imagePath}
                                        alt={item.imageName}
                                        className="w-full h-[250px] sm:h-[350px] object-cover"
                                    />
                                     <div className="absolute inset-x-0 bottom-0 p-15 bg-linear-to-t from-black via-black/80 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h4 className="text-sm sm:text-base font-semibold text-white">
                                            {item.imageName}
                                        </h4>
                                        <p className="text-xs sm:text-xs text-gray-200">
                                            {item.origins.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </section>
        </main>
    );
}
