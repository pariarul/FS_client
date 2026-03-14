import TermsConditionsPageComponent from './terms-conditions';


export const metadata = {
  title: {
    en: "Terms and Conditions | FS Traders",
    zh: "条款和条件 | FS Traders",
    si: "කොන්දේසි සහ නියම | FS Traders",
  },
  description: {
    en: "Review the terms and conditions for using FS Traders' services, including user responsibilities and legal agreements.",
    zh: "查看使用 FS Traders 服务的条款和条件，包括用户责任和法律协议。",
    si: "FS Traders සේවාවන් භාවිතා කිරීම සඳහා කොන්දේසි සහ නියම, පරිශීලක වගකීම් සහ නීතිමය ගිවිසුම් සමාලෝචනය කරන්න."
  },
  keywords: {
    en: [
      "terms and conditions",
      "user agreement",
      "legal terms",
      "FS Traders terms",
      "service agreement",
      "user responsibilities",
    ],
    zh: [
      "条款和条件",
      "用户协议",
      "法律条款",
      "FS Traders 条款",
      "服务协议",
      "用户责任",
    ],
    si: [
      "කොන්දේසි සහ නියම",
      "පරිශීලක ගිවිසුම",
      "නීතිමය කොන්දේසි",
      "FS Traders කොන්දේසි",
      "සේවා ගිවිසුම",
      "පරිශීලක වගකීම්",
    ],
  },
};

import { Lang } from '@/utils/language';

export default async function TermsConditionsPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const resolvedParams = await params; 
  const { lang } = resolvedParams;

  console.log("Current Metadata:", {
    title: metadata.title[lang],
    description: metadata.description[lang],
    keywords: metadata.keywords[lang],
  });

  return <TermsConditionsPageComponent />;
}