import OurLeadershipPageComponent from './ourLeadership';


export const metadata = {
  title: {
    en: "Our Leadership | FS Traders",
    zh: "我们的领导团队 | FS Traders",
    si: "අපේ නායකත්වය | FS Traders",
  },
  description: {
    en: "Meet the visionary leaders driving FS Traders' success and innovation across industries.",
    zh: "认识推动 FS Traders 成功和创新的远见卓识的领导者们。",
    si: "FS Traders හි සාර්ථකත්වය සහ නවෝත්පාදනය මඟ පෙන්වන දුරදක්නේ නායකයින්ව හමුවන්න."
  },
  keywords: {
    en: [
      "our leadership",
      "FS Traders leadership",
      "executive team",
      "company leaders",
      "visionary leadership",
      "team success",
    ],
    zh: [
      "我们的领导团队",
      "FS Traders 领导",
      "管理团队",
      "公司领导",
      "远见卓识的领导",
      "团队成功",
    ],
    si: [
      "අපේ නායකත්වය",
      "FS Traders නායකත්වය",
      "ප්රධාන කණ්ඩායම",
      "සමාගමේ නායකයින්",
      "දුරදක්නේ නායකත්වය",
      "කණ්ඩායම් සාර්ථකත්වය",
    ],
  },
};

import { Lang } from '@/utils/language';

export default async function LeadershipPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const resolvedParams = await params; 

  console.log("Current Metadata:", {
    title: metadata.title[resolvedParams.lang],
    description: metadata.description[resolvedParams.lang],
    keywords: metadata.keywords[resolvedParams.lang],
  });

  return <OurLeadershipPageComponent />;
}