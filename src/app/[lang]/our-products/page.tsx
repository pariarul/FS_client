import OurProductsPageComponent from './ourProducts';


export const metadata = {
  title: {
    en: "Our Products | FS Traders",
    zh: "我们的产品 | FS Traders",
    si: "අපේ නිෂ්පාදන | FS Traders",
  },
  description: {
    en: "Discover FS Traders' diverse range of products, including imports and exports across various categories.",
    zh: "探索 FS Traders 的多样化产品，包括各类进口和出口商品。",
    si: "FS Traders හි විවිධ නිෂ්පාදන පරාසය, විවිධ ප්රවර්ග හරහා ආනයන සහ අපනයන ඇතුළුව, සොයා බලන්න."
  },
  keywords: {
    en: [
      "our products",
      "FS Traders products",
      "import products",
      "export products",
      "product categories",
      "diverse range",
    ],
    zh: [
      "我们的产品",
      "FS Traders 产品",
      "进口产品",
      "出口产品",
      "产品类别",
      "多样化范围",
    ],
    si: [
      "අපේ නිෂ්පාදන",
      "FS Traders නිෂ්පාදන",
      "ආනයන නිෂ්පාදන",
      "අපනයන නිෂ්පාදන",
      "නිෂ්පාදන ප්රවර්ග",
      "විවිධ පරාසය",
    ],
  },
};

import { Lang } from '@/utils/language';

export default async function OurProductsPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const resolvedParams = await params; 
  const { lang } = resolvedParams;

  console.log("Current Metadata:", {
    title: metadata.title[lang],
    description: metadata.description[lang],
    keywords: metadata.keywords[lang],
  });

  const wrappedParams = Promise.resolve(resolvedParams); 

  return <OurProductsPageComponent params={wrappedParams} />;
}