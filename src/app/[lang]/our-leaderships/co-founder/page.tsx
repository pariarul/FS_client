import CoFounderPageComponent from './coFounder';

export const metadata = {
  "title": {
    "en": "Co-Founder | FS Traders",
    "zh": "联合创始人 | FS Traders",
    "si": "සහ-ස්ථාපකයා | FS Traders"
  },
  "description": {
    "en": "Learn about the co-founder's role and contributions to FS Traders' success.",
    "zh": "了解联合创始人对 FS Traders 成功的贡献和角色。",
    "si": "FS Traders හි සහ-ස්ථාපකයාගේ කාර්යභාරය සහ දායකත්වය පිළිබඳව ඉගෙන ගන්න."
  },
  "keywords": {
    "en": [
      "co-founder",
      "FS Traders co-founder",
      "company co-founder",
      "visionary leader",
      "co-founder's journey",
      "entrepreneurship",
      "testing"
    ],
    "zh": [
      "联合创始人",
      "FS Traders 联合创始人",
      "公司联合创始人",
      "远见卓识的领导",
      "联合创始人的旅程",
      "创业精神",
      "dummy"
    ],
    "si": [
      "සහ-ස්ථාපකයා",
      "FS Traders සහ-ස්ථාපකයා",
      "සමාගමේ සහ-ස්ථාපකයා",
      "දුරදක්නේ නායකයා",
      "සහ-ස්ථාපකයාගේ ගමන",
      "ව්‍යාපාරිකත්වය"
    ]
  }
};
import { Lang } from '@/utils/language';

export default async function CoFounderPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const resolvedParams = await params; 

  console.log("Current Metadata:", {
    title: metadata.title[resolvedParams.lang],
    description: metadata.description[resolvedParams.lang],
    keywords: metadata.keywords[resolvedParams.lang],
  });

  return <CoFounderPageComponent params={resolvedParams} />;
}