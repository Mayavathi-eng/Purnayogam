import React from 'react';
import { RouteKey, useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate, lang, isStaff } = useApp();

  const col1: { key: RouteKey; en: string; ta: string }[] = [
    { key: 'thirukkural', en: 'Thirukkural (1,080)', ta: 'திருக்குறள் (1,080)' },
    { key: 'vedanta', en: 'Vedanta Learning', ta: 'வேதாந்தக் கல்வி' },
    { key: 'wisdom-library', en: 'Wisdom Library', ta: 'ஞானக் களஞ்சியம்' },
    { key: 'wisdom-maps', en: 'Wisdom Maps', ta: 'ஞான வரைபடங்கள்' },
  ];

  const col2: { key: RouteKey; en: string; ta: string }[] = [
    { key: 'audio', en: 'Audio Library', ta: 'ஒலிக் களஞ்சியம்' },
    { key: 'books', en: 'Free Digital Books', ta: 'டிஜிட்டல் நூலகம்' },
    { key: 'articles', en: 'Articles', ta: 'கட்டுரைகள்' },
    { key: 'places', en: 'Spiritual Places', ta: 'ஆன்மிகத் தலங்கள்' },
  ];

  const col3: { key: RouteKey; en: string; ta: string }[] = [
    { key: 'practice', en: 'Daily Practice', ta: 'தினசரிப் பயிற்சி' },
    { key: 'meditation', en: 'Meditation Centre', ta: 'தியான மையம்' },
    { key: 'quizzes', en: 'Quizzes & Activities', ta: 'தேர்வு & செயல்பாடுகள்' },
    { key: 'certificates', en: 'Free Certificates', ta: 'இலவச சான்றிதழ்' },
    { key: 'journal', en: 'Wisdom Journal', ta: 'ஞானக் குறிப்பேடு' },
    ...(isStaff ? [{ key: 'admin' as RouteKey, en: 'Admin CMS', ta: 'நிர்வாகம்' }] : []),
  ];

  return (
    <footer className="border-t border-[#DFCAA2] dark:border-[#2A4163] bg-[#F6ECD8]/65 dark:bg-[#0B1422] mt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#DFCAA2]/80 dark:border-[#2A4163]">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#641E24] dark:text-[#D4B16E]">
              PURNA YOGAM · பூர்ண யோகம்
            </h2>
            <p className="font-tamil text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
              அறத்தால் வாழ்வோம் – வேதாந்தத்தால் உணர்வோம் – ஞானத்தால் நிறைவோம்.
            </p>
            <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
              Knowledge for Everyone. Wisdom for Life. Always 100% Free — No Subscriptions or Paywalls.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-3">
              {lang === 'ta' ? 'மரபுக் கல்வி' : 'Foundations'}
            </h3>
            <ul className="space-y-2 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
              {col1.map((l) => (
                <li key={l.key}>
                  <button onClick={() => navigate(l.key)} className="hover:text-[#641E24] dark:hover:text-[#FBF4E4] cursor-pointer">
                    {lang === 'ta' ? l.ta : l.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-3">
              {lang === 'ta' ? 'களஞ்சியங்கள்' : 'Repositories'}
            </h3>
            <ul className="space-y-2 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
              {col2.map((l) => (
                <li key={l.key}>
                  <button onClick={() => navigate(l.key)} className="hover:text-[#641E24] dark:hover:text-[#FBF4E4] cursor-pointer">
                    {lang === 'ta' ? l.ta : l.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-3">
              {lang === 'ta' ? 'பயிற்சி & சான்றிதழ்' : 'Practice & Sanctuary'}
            </h3>
            <ul className="space-y-2 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
              {col3.map((l) => (
                <li key={l.key}>
                  <button onClick={() => navigate(l.key)} className="hover:text-[#641E24] dark:hover:text-[#FBF4E4] cursor-pointer">
                    {lang === 'ta' ? l.ta : l.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
          <p>
            © {new Date().getFullYear()} PURNA YOGAM – பூர்ண யோகம். Open Educational Spiritual Sanctuary.
          </p>
          <p>
            Thirukkural scope: Arathuppaal (380) &amp; Porutpaal (700) · 108 Chapters · 1,080 Kurals
          </p>
        </div>
      </div>
    </footer>
  );
};
