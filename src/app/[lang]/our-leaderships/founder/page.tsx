import FounderPageComponent from './founder';


export const metadata = {
  title: {
    en: "Founder | FS Traders",
    zh: "创始人 | FS Traders",
    si: "ස්ථාපකයා | FS Traders",
  },
  description: {
    en: "Discover the inspiring journey and vision of the founder of FS Traders.",
    zh: "了解 FS Traders 创始人的励志旅程和愿景。",
    si: "FS Traders හි ස්ථාපකයාගේ ආදර්ශමත් ගමන සහ දැක්ම සොයා බලන්න."
  },
  keywords: {
    en: [
      "founder",
      "FS Traders founder",
      "company founder",
      "visionary leader",
      "founder's journey",
      "entrepreneurship",
    ],
    zh: [
      "创始人",
      "FS Traders 创始人",
      "公司创始人",
      "远见卓识的领导",
      "创始人的旅程",
      "创业精神",
    ],
    si: [
      "ස්ථාපකයා",
      "FS Traders ස්ථාපකයා",
      "සමාගමේ ස්ථාපකයා",
      "දුරදක්නේ නායකයා",
      "ස්ථාපකයාගේ ගමන",
      "ව්‍යාපාරිකත්වය",
    ],
  },
};

import { Lang } from '@/utils/language';

export default async function FounderPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const resolvedParams = await params; 

  console.log("Current Metadata:", {
    title: metadata.title[resolvedParams.lang],
    description: metadata.description[resolvedParams.lang],
    keywords: metadata.keywords[resolvedParams.lang],
  });

  return <FounderPageComponent params={resolvedParams} />;
}