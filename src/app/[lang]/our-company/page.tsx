import OurCompanyPageComponent from './ourCompany';

export const metadata = {
  title: {
    en: "Our Company | FS Traders",
    zh: "我们的公司 | FS Traders",
    si: "අපේ සමාගම | FS Traders",
  },
  description: {
    en: "Learn more about FS Traders, our mission, vision, and values.",
    zh: "了解更多关于 FS Traders 的信息，我们的使命、愿景和价值观。",
    si: "FS Traders, අපගේ මෙහෙවර, දැක්ම සහ අගයන් පිළිබඳ වැඩිදුරටත් ඉගෙන ගන්න."
  },
  keywords: {
    en: [
      "our company",
      "FS Traders company",
      "mission",
      "vision",
      "values",
      "about us",
    ],
    zh: [
      "我们的公司",
      "FS Traders 公司",
      "使命",
      "愿景",
      "价值观",
      "关于我们",
    ],
    si: [
      "අපේ සමාගම",
      "FS Traders සමාගම",
      "මෙහෙවර",
      "දැක්ම",
      "අගයන්",
      "අපි ගැන",
    ],
  },
};

export default function OurCompanyPage() {
  return <OurCompanyPageComponent />;
}