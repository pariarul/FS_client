import OurHistoryPageComponent from './ourHistory';

export const metadata = {
  title: {
    en: "Our History | FS Trader",
    zh: "我们的历史 | FS Traders",
    si: "අපේ ඉතිහාසය | FS Trader",
  },
  description: {
    en: "Explore the rich history and milestones of FS Traders over the years.",
    zh: "探索 FS Traders 多年来的丰富历史和里程碑。",
    si: "FS Traders හි වසර ගණනාවක් පුරා ඇති සම්පත්මත් ඉතිහාසය සහ මීලෝග සොයා බලන්න."
  },
  keywords: {
    en: [
      "our history",
      "FS Traders history",
      "company milestones",
      "historical journey",
      "legacy",
      "timeline",
    ],
    zh: [
      "我们的历史",
      "FS Traders 历史",
      "公司里程碑",
      "历史旅程",
      "遗产",
      "时间线",
    ],
    si: [
      "අපේ ඉතිහාසය",
      "FS Traders ඉතිහාසය",
      "සමාගමේ මීලෝග",
      "ඉතිහාස ගමන",
      "අවුරුදු උරුමය",
      "කාලරේඛාව",
    ],
  },
};

export default function OurHistoryPage() {
  return <OurHistoryPageComponent />;
}
