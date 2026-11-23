import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WISDOM_TOPICS } from '../data/vedanta';
import { PageUtilityBar } from '../components/PageUtilityBar';

export const WisdomLibraryPage: React.FC = () => {
  const { routeParam, lang, navigate } = useApp();
  const [selectedId, setSelectedId] = useState(
    routeParam && WISDOM_TOPICS.some((w) => w.id === routeParam) ? routeParam : WISDOM_TOPICS[0].id
  );

  useEffect(() => {
    if (routeParam && WISDOM_TOPICS.some((w) => w.id === routeParam)) {
      setSelectedId(routeParam);
    }
  }, [routeParam]);

  const topic = WISDOM_TOPICS.find((w) => w.id === selectedId) || WISDOM_TOPICS[0];

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar
        breadcrumb="Wisdom Library"
        breadcrumbTa="ஞானக் களஞ்சியம்"
        readAloudText={`${topic.english}. ${topic.intro} ${topic.philosophicalExplanation}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
            ஞானக் களஞ்சியம் · 11 PHILOSOPHICAL REPOSITORIES
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' ? 'இந்திய தத்துவ மற்றும் ஆன்மிக ஞானக் களஞ்சியம்' : 'Wisdom Library of Indian Philosophy'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 space-y-1.5">
            {WISDOM_TOPICS.map((w, idx) => {
              const active = w.id === topic.id;
              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedId(w.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#641E24] text-[#FFF9ED] border-[#641E24] dark:bg-[#C6A15B] dark:text-[#0F1A2B] dark:border-[#C6A15B]'
                      : 'bg-[#FFFDF7] dark:bg-[#172B45] border-[#DFCAA2] dark:border-[#2A4163] text-[#1F1914] dark:text-[#FBF4E4] hover:border-[#C6A15B]'
                  }`}
                >
                  <p className="text-xs font-mono-tabular opacity-75">{String(idx + 1).padStart(2, '0')}.</p>
                  <p className="font-display text-base font-bold">
                    <span className="font-tamil">{w.tamil}</span> · {w.english}
                  </p>
                </button>
              );
            })}
          </aside>

          <main className="lg:col-span-8 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#641E24] dark:text-[#D4B16E]">
                <span className="font-tamil">{topic.tamil}</span> · {topic.english}
              </h2>
              <p className="mt-3 font-serif-editorial text-base text-[#1F1914] dark:text-[#FBF4E4] leading-relaxed">
                {lang === 'ta' ? topic.introTa : topic.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/80 dark:border-[#2A4163]">
                <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-1.5">
                  Historical Background
                </h3>
                <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                  {topic.historicalBackground}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/80 dark:border-[#2A4163]">
                <h3 className="text-xs font-semibold text-[#314B3B] dark:text-[#D4B16E] mb-1.5">
                  Philosophical Explanation
                </h3>
                <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                  {topic.philosophicalExplanation}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-[#172B45] dark:text-[#D4B16E] mb-2">
                Key Philosophical Concepts
              </h3>
              <p className="text-sm text-[#1F1914] dark:text-[#FBF4E4]">
                {topic.importantConcepts.join(' · ')}
              </p>
            </div>

            {/* Strict Distinction: Original Scriptures vs Commentaries vs Modern Interpretations */}
            <div className="pt-4 border-t border-[#DFCAA2]/70 dark:border-[#2A4163] grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163]">
                <h4 className="text-xs font-bold text-[#641E24] dark:text-[#D4B16E] mb-2">
                  1. Original Scriptures
                </h4>
                <ul className="space-y-1 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  {topic.originalScriptures.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163]">
                <h4 className="text-xs font-bold text-[#172B45] dark:text-[#D4B16E] mb-2">
                  2. Translations &amp; Commentaries
                </h4>
                <ul className="space-y-1 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  {topic.translationsAndCommentaries.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163]">
                <h4 className="text-xs font-bold text-[#314B3B] dark:text-[#D4B16E] mb-2">
                  3. Modern Interpretations
                </h4>
                <ul className="space-y-1 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  {topic.modernInterpretations.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DFCAA2]/70 dark:border-[#2A4163] flex flex-wrap gap-3">
              {topic.relatedLessonIds.map((lid) => (
                <button
                  key={lid}
                  onClick={() => navigate('vedanta', lid)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Open Related Vedanta Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}
              {topic.recommendedBooks.map((bid) => (
                <button
                  key={bid}
                  onClick={() => navigate('books', bid)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4] cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Recommended Book</span>
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
