import PrivacyPolicyPageComponent from './privacypolicy';


export const metadata = {
  title: {
    en: "Privacy Policy | FS Traders",
    zh: "隐私政策 | FS Traders",
    si: "පෞද්ගලිකත්ව ප්රතිපත්තිය | FS Traders",
  },
  description: {
    en: "Learn about FS Traders' privacy practices, including how we collect, use, and protect your personal information.",
    zh: "了解 FS Traders 的隐私实践，包括我们如何收集、使用和保护您的个人信息。",
    si: "FS Traders හි පෞද්ගලිකත්ව ක්රියාකාරකම්, අපි ඔබේ පුද්ගලික තොරතුරු එකතු කරන ආකාරය, භාවිතා කරන ආකාරය සහ ආරක්ෂා කරන ආකාරය පිළිබඳව ඉගෙන ගන්න."
  },
  keywords: {
    en: [
      "privacy policy",
      "data protection",
      "personal information",
      "FS Traders privacy",
      "user data",
      "data security",
    ],
    zh: [
      "隐私政策",
      "数据保护",
      "个人信息",
      "FS Traders 隐私",
      "用户数据",
      "数据安全",
    ],
    si: [
      "පෞද්ගලිකත්ව ප්රතිපත්තිය",
      "දත්ත ආරක්ෂාව",
      "පුද්ගලික තොරතුරු",
      "FS Traders පෞද්ගලිකත්වය",
      "පරිශීලක දත්ත",
      "දත්ත ආරක්ෂාව",
    ],
  },
};

import { Lang } from '@/utils/language';

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const resolvedParams = await params; 
  const { lang } = resolvedParams;

  console.log("Current Metadata:", {
    title: metadata.title[lang],
    description: metadata.description[lang],
    keywords: metadata.keywords[lang],
  });

  return <PrivacyPolicyPageComponent />;
}