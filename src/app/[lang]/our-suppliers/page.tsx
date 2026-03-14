import SuppliersPageComponent from './oursupplier';


export const metadata = {
  title: {
    en: "Our Suppliers | FS Traders",
    zh: "我们的供应商 | FS Traders",
    si: "අපේ සැපයුම්කරුවන් | FS Traders",
  },
  description: {
    en: "Explore Brainbric Innovations' comprehensive services including AI automation, web development, mobile app development, e-commerce solutions, and ongoing support & maintenance.",
    zh: "探索 Brainbric Innovations 的全面服务，包括人工智能自动化、网页开发、移动应用开发、电子商务解决方案以及持续支持与维护。",
    si: "Brainbric Innovations හි AI ස්වයංක්‍රීයනය, වෙබ් සංවර්ධනය, ජංගම යෙදුම් සංවර්ධනය, e-commerce විසඳුම් සහ අඛණ්ඩ සහාය සහ නඩත්තු ඇතුළු සම්පූර්ණ සේවාවන් සොයා බලන්න."
  },
  keywords: {
    en: [
      "Brainbric services",
      "AI automation services",
      "web development",
      "mobile development",
      "e-commerce solutions",
      "support and maintenance",
    ],
    zh: [
      "Brainbric 服务",
      "人工智能自动化服务",
      "网页开发",
      "移动开发",
      "电子商务解决方案",
      "支持与维护",
    ],
    si: [
      "Brainbric සේවාවන්",
      "AI ස්වයංක්‍රීය සේවාවන්",
      "වෙබ් සංවර්ධනය",
      "ජංගම සංවර්ධනය",
      "e-commerce විසඳුම්",
      "සහාය සහ නඩත්තු",
    ],
  },
};

import { Lang } from '@/utils/language';

export default async function SuppliersPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const resolvedParams = await params; 
  const { lang } = resolvedParams;

  console.log("Current Metadata:", {
    title: metadata.title[lang],
    description: metadata.description[lang],
    keywords: metadata.keywords[lang],
  });

  const wrappedParams = Promise.resolve(resolvedParams); 

  return <SuppliersPageComponent />;
}