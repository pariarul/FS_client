'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const messages = {
  en: {
    title: '404',
    heading: 'Page Not Found',
    description: 'Sorry, the page you are looking for does not exist.',
    button: 'Go Home',
    features: ['Return to safety', 'Explore more', 'Get help']
  },
  zh: {
    title: '404',
    heading: '页面未找到',
    description: '抱歉，您要查找的页面不存在。',
    button: '返回首页',
    features: ['返回安全地带', '继续探索', '获取帮助']
  },
  si: {
    title: '404',
    heading: 'පිටුව සොයාගත නොහැක',
    description: 'සමාවෙන්න, ඔබ සොයන පිටුව නොමැත.',
    button: 'මුල් පිටුවට යන්න',
    features: ['ආරක්ෂිත ස්ථානයට ඉවත් වන්න', 'තවත් ගවේෂණ කරන්න', 'උදවු ලබන්න']
  }
};

export default function NotFound() {
  const pathname = usePathname();
  let lang = 'en';
  if (pathname.startsWith('/en/')) lang = 'en';
  else if (pathname.startsWith('/zh/')) lang = 'zh';
  else if (pathname.startsWith('/si/')) lang = 'si';
  const msg = messages[lang as keyof typeof messages] || messages.en;
  const homePath = pathname.startsWith('/en/') ? '/en' : pathname.startsWith('/zh/') ? '/zh' : pathname.startsWith('/si/') ? '/si' : '/';

  return (
    <main 
      className="min-h-screen flex items-center justify-center p-8 overflow-hidden relative"
      style={{ 
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)'
      }}
    >
      {/* Animated background gradient circles */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse"
        style={{ backgroundColor: 'var(--color-primary)', animationDelay: '1s' }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Visual element */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              {/* Rotating rings */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
                style={{ 
                  borderTopColor: 'var(--color-primary)',
                  borderRightColor: 'var(--color-primary)',
                  animationDuration: '3s'
                }}
              />
              <div 
                className="absolute inset-6 rounded-full border-4 border-transparent animate-spin"
                style={{ 
                  borderBottomColor: 'var(--color-primary)',
                  borderLeftColor: 'var(--color-primary)',
                  animationDuration: '4s',
                  animationDirection: 'reverse'
                }}
              />
              <div 
                className="absolute inset-12 rounded-full border-4"
                style={{ borderColor: 'var(--color-primary)', opacity: 0.3 }}
              />
              
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="text-7xl font-black"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {msg.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 
                className="text-5xl font-bold leading-tight"
                style={{ color: 'var(--color-text)' }}
              >
                {msg.heading}
              </h2>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: 'var(--color-text)', opacity: 0.7 }}
              >
                {msg.description}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {msg.features.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <span style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="pt-4">
              <Link
                href={homePath}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 text-white group"
                style={{ 
                  backgroundColor: 'var(--color-primary)'
                }}
              >
                {msg.button}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}