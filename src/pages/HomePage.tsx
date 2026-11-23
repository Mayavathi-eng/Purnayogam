import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  Headphones,
  Library,
  MapPin,
  Network,
  Play,
  Search,
  Sparkles,
  Sun,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { getKuralByNumber, VERIFIED_KURAL_NUMBERS } from '../data/thirukkural';
import { CERTIFICATE_PROGRAMS, VEDANTA_LESSONS, WISDOM_TOPICS } from '../data/vedanta';
import { AUDIO_TRACKS, DIGITAL_BOOKS, WISDOM_MAPS } from '../data/libraryAndMaps';
import { ARTICLES, DAILY_PRACTICES, SPIRITUAL_PLACES } from '../data/communityAndPlaces';
import { LotusDivider, MandalaMotif, ResilientImage } from '../components/SacredMotifs';
import { speakBilingual } from '../lib/audioEngine';

export const HomePage: React.FC = () => {
  const { navigate, lang, toggleLang, setSearchOpen, cmsItems, reducedMotion } = useApp();
  const { playTrack } = useAudio();

  // Deterministic "Today's Kural" based on day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const todaysKuralNum = VERIFIED_KURAL_NUMBERS[dayOfYear % VERIFIED_KURAL_NUMBERS.length];
  const todaysKural = getKuralByNumber(todaysKuralNum);
  const featuredLesson = VEDANTA_LESSONS[0];
  const featuredArticles = ARTICLES.slice(0, 3);
  const latestPublishedCms = cmsItems.filter((c) => c.status === 'published').slice(0, 3);

  return (
    <div className="bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      {/* 1. CINEMATIC HERO */}
      <section className="relative overflow-hidden border-b border-[#DFCAA2] dark:border-[#2A4163]">
        <div className="absolute inset-0">
          <ResilientImage
            src="/src/assets/images/hero_temple_sunrise_1795423242919.jpg"
            alt="Ancient South Indian stone temple and sacred lotus pond at golden sunrise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#172B45]/80 via-[#172B45]/65 to-[#0F1A2B]/90" />
        </div>

        {/* Slow rotating sacred mandala */}
        <div className="absolute -right-24 -top-24 text-[#C6A15B]/20 pointer-events-none">
          <MandalaMotif className="w-[460px] h-[460px]" slowSpin={!reducedMotion} />
        </div>

        {/* Subtle golden floating light particles */}
        {!reducedMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {[
              { left: '14%', top: '28%', delay: '0s' },
              { left: '38%', top: '18%', delay: '1.5s' },
              { left: '66%', top: '34%', delay: '2.8s' },
              { left: '82%', top: '62%', delay: '0.9s' },
            ].map((p, idx) => (
              <span
                key={idx}
                style={{ left: p.left, top: p.top, animationDelay: p.delay }}
                className="animate-light-particle absolute w-1.5 h-1.5 rounded-full bg-[#C6A15B]/70"
              />
            ))}
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-tamil text-sm sm:text-base tracking-wide text-[#D8BD91] mb-3">
              அறம் · வேதாந்தம் · ஞானம் · தியானம்
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#FFF9ED] tracking-tight text-balance">
              PURNA YOGAM <span className="font-tamil font-semibold text-[#D4B16E]">· பூர்ண யோகம்</span>
            </h1>
            <p className="mt-4 font-serif-editorial text-lg sm:text-2xl text-[#F6ECD8] italic">
              “Discover the Eternal Wisdom of India”
            </p>
            <p className="mt-2 font-tamil text-sm sm:text-base text-[#D8BD91]">
              அறத்தால் வாழ்வோம் – வேதாந்தத்தால் உணர்வோம் – ஞானத்தால் நிறைவோம்.
            </p>
            <p className="mt-4 text-sm sm:text-base text-[#EAE0CC] max-w-2xl leading-relaxed">
              {lang === 'ta'
                ? 'திருக்குறள் (1,080 குறள்கள்), சுவாமிஜியின் வேதாந்தப் பாடங்கள், பகவத்கீதை, உபநிஷத்துக்கள் மற்றும் தியானப் பயிற்சிகளுக்கான கட்டணமில்லா நிரந்தர ஆன்மிகக் கல்வித் தளம்.'
                : 'A free, permanent digital sanctuary preserving Thirukkural, Swamiji’s Vedanta teachings, Bhagavad Gita, Upanishads, digital books, and guided meditation for universal learning.'}
            </p>

            {/* Quick utility strip inside Hero */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C6A15B] text-[#0F1A2B] text-sm font-semibold hover:bg-[#d5b36f] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                <span>{lang === 'ta' ? 'முழுத் தேடல்' : 'Search Wisdom Archive'}</span>
              </button>
              <button
                onClick={toggleLang}
                className="px-4 py-2.5 rounded-lg border border-[#D8BD91]/50 text-[#FFF9ED] text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
              >
                {lang === 'en' ? 'தமிழ் பதிப்பு' : 'English Edition'}
              </button>
            </div>
          </motion.div>

          {/* Two Major Entrance Cards: A. THIRUKKURAL & B. VEDANTA */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl border border-[#C6A15B]/45 bg-[#FFF9ED]/95 dark:bg-[#172B45]/95 p-6 sm:p-8 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-[#641E24] dark:text-[#D4B16E] font-semibold mb-2">
                  <span>ENTRANCE A · DIVISION I &amp; II</span>
                  <span className="font-mono-tabular">108 Chapters · 1,080 Kurals</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  THIRUKKURAL · <span className="font-tamil">திருக்குறள்</span>
                </h2>
                <p className="mt-2 font-tamil text-sm font-medium text-[#641E24] dark:text-[#C6A15B]">
                  அறத்துப்பால் (380) மற்றும் பொருட்பால் (700)
                </p>
                <p className="mt-3 text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                  {lang === 'ta'
                    ? 'பால் → இயல் → அதிகாரம் → குறள் வரிசையில் பதவுரை, விளக்கவுரை மற்றும் ஒலி உச்சரிப்புடன் பயிலுங்கள்.'
                    : 'Explore all 108 chapters across Virtue and Polity with authentic Tamil couplets, word-by-word meanings, commentaries, and bilingual audio.'}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#DFCAA2] dark:border-[#2A4163]">
                <button
                  onClick={() => navigate('thirukkural')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-sm font-semibold hover:opacity-90 cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'திருக்குறள் நூலகம்' : 'Enter Thirukkural Library'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#C6A15B]/45 bg-[#FFF9ED]/95 dark:bg-[#172B45]/95 p-6 sm:p-8 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-[#314B3B] dark:text-[#D4B16E] font-semibold mb-2">
                  <span>ENTRANCE B · 7 LEARNING STREAMS</span>
                  <span className="font-mono-tabular">Slides · Notes · Quizzes</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  VEDANTA · <span className="font-tamil">வேதாந்தம்</span>
                </h2>
                <p className="mt-2 font-tamil text-sm font-medium text-[#314B3B] dark:text-[#C6A15B]">
                  சுவாமிஜியின் வேதாந்தக் கல்வி மையம்
                </p>
                <p className="mt-3 text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                  {lang === 'ta'
                    ? 'அறிமுகம், பகவத்கீதை, உபநிஷத்துக்கள், வேதாந்த நூல்கள், ப்ரம்ம சூத்ரம், சொற்பொழிவுகள் மற்றும் தியானம்.'
                    : 'Structured discourses across Introduction, Bhagavad Gita, Upanishads, Vedantic Texts, Brahma Sutram, General Talks, and Meditation.'}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#DFCAA2] dark:border-[#2A4163]">
                <button
                  onClick={() => navigate('vedanta')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#172B45] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-sm font-semibold hover:opacity-90 cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'வேதாந்தம் கற்க' : 'Enter Vedanta Centre'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {/* 2. TODAY'S THIRUKKURAL + TODAY'S VEDANTA REFLECTION + TODAY'S PRACTICE */}
        <section aria-labelledby="daily-sanctuary-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
                DAILY CONTEMPLATION · தினசரிச் சிந்தனை
              </p>
              <h2 id="daily-sanctuary-heading" className="font-display text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                {lang === 'ta' ? 'இன்றைய குறள், வேதாந்தம் & பயிற்சி' : "Today's Kural, Reflection & Practice"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Today's Thirukkural */}
            <article className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mb-3">
                  Today&apos;s Thirukkural · Kural {todaysKural.number}
                </div>
                <p className="font-tamil text-lg font-semibold text-[#641E24] dark:text-[#D4B16E] leading-relaxed">
                  {todaysKural.tamilLine1}
                  <br />
                  {todaysKural.tamilLine2}
                </p>
                <p className="mt-4 font-serif-editorial text-sm text-[#1F1914] dark:text-[#FBF4E4] italic leading-relaxed">
                  “{todaysKural.englishTranslation}”
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] flex items-center justify-between gap-2">
                <button
                  onClick={() => speakBilingual(`${todaysKural.tamilLine1} ${todaysKural.tamilLine2}`, 'ta')}
                  className="text-xs font-medium text-[#641E24] dark:text-[#C6A15B] hover:underline cursor-pointer"
                >
                  Listen in Tamil
                </button>
                <button
                  onClick={() => navigate('thirukkural', String(todaysKural.number))}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#172B45] dark:text-[#FBF4E4] hover:underline cursor-pointer"
                >
                  <span>Full Commentary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* 2. Today's Vedanta Reflection */}
            <article className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mb-3">
                  Today&apos;s Vedanta Reflection · Sakshi Bhava
                </div>
                <h3 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4] mb-2">
                  {lang === 'ta' ? 'சாட்சி உணர்வில் நிலைத்தல்' : 'You Are the Quiet Witness'}
                </h3>
                <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                  {lang === 'ta'
                    ? DAILY_PRACTICES[0].vedantaThoughtTa
                    : 'Thoughts, moods, and external duties rise and subside like waves upon the ocean. The awareness noticing them remains untouched, serene, and whole.'}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] flex items-center justify-between">
                <button
                  onClick={() => navigate('journal')}
                  className="text-xs font-medium text-[#314B3B] dark:text-[#C6A15B] hover:underline cursor-pointer"
                >
                  Write in Wisdom Journal
                </button>
                <button
                  onClick={() => navigate('vedanta', 'ved-texts-1')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#172B45] dark:text-[#FBF4E4] hover:underline cursor-pointer"
                >
                  <span>Study Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* 3. Today's Spiritual Practice */}
            <article className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mb-3">
                  Today&apos;s Spiritual Practice · 10 min Morning Routine
                </div>
                <h3 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4] mb-2">
                  {lang === 'ta' ? DAILY_PRACTICES[0].titleTa : DAILY_PRACTICES[0].title}
                </h3>
                <ul className="space-y-1.5 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                  {DAILY_PRACTICES[0].steps.map((s, i) => (
                    <li key={i} className="leading-snug">
                      {i + 1}. {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] flex items-center justify-between">
                <span className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">Educational &amp; Optional</span>
                <button
                  onClick={() => navigate('practice')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] hover:underline cursor-pointer"
                >
                  <span>Open Practice Centre</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          </div>
        </section>

        <LotusDivider />

        {/* 4. FEATURED VEDANTA LESSON + 9. GUIDED MEDITATION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden grid grid-cols-1 sm:grid-cols-2">
            <div className="h-56 sm:h-full">
              <ResilientImage
                src="/src/assets/images/vedanta_sanctuary_hall_1795423245934.jpg"
                alt="Traditional stone Vedanta learning pavilion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mb-2">
                  Featured Vedanta Lesson · {featuredLesson.durationMinutes} min
                </p>
                <h3 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  {lang === 'ta' ? featuredLesson.titleTa : featuredLesson.title}
                </h3>
                <p className="mt-3 text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                  {lang === 'ta' ? featuredLesson.summaryTa : featuredLesson.summary}
                </p>
                <p className="mt-3 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  Includes: Audio · PPT Slides · PDF Study Notes · Lesson Quiz
                </p>
              </div>
              <button
                onClick={() => navigate('vedanta', featuredLesson.id)}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-sm font-semibold self-start cursor-pointer"
              >
                <span>Start Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Guided Meditation Card */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#DFCAA2] dark:border-[#2A4163] flex flex-col justify-end min-h-[300px]">
            <div className="absolute inset-0">
              <ResilientImage
                src="/src/assets/images/meditation_sacred_lotus_1795423245192.jpg"
                alt="Sacred lotus blossoms floating on calm temple water at dawn"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2B]/90 via-[#0F1A2B]/45 to-transparent" />
            </div>
            <div className="relative p-6 sm:p-8 text-[#FFF9ED]">
              <p className="text-xs text-[#D8BD91] mb-1">Guided Meditation Centre · தியான மையம்</p>
              <h3 className="font-display text-2xl font-bold">Silence &amp; Breath Awareness</h3>
              <p className="mt-2 text-sm text-[#EAE0CC]">
                Enter a distraction-free sanctuary with guided breathing cadence, gentle temple bell chimes, and session timer.
              </p>
              <button
                onClick={() => navigate('meditation')}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C6A15B] text-[#0F1A2B] text-sm font-semibold cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Begin Quiet Session</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. WISDOM LIBRARY + 6. SPIRITUAL AUDIO LIBRARY + 7. DIGITAL BOOK LIBRARY */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wisdom Library */}
          <div className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#641E24] dark:text-[#D4B16E] mb-3">
                <Library className="w-5 h-5" />
                <h3 className="font-display text-xl font-bold">
                  {lang === 'ta' ? 'ஞானக் களஞ்சியம்' : 'Wisdom Library'}
                </h3>
              </div>
              <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] mb-4">
                11 philosophical repositories distinguishing original scriptures, commentaries, and modern insights.
              </p>
              <ul className="space-y-2 text-sm">
                {WISDOM_TOPICS.slice(0, 5).map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => navigate('wisdom-library', t.id)}
                      className="text-left hover:text-[#641E24] dark:hover:text-[#D4B16E] transition-colors cursor-pointer"
                    >
                      {lang === 'ta' ? t.tamil : `${t.english} · ${t.tamil}`}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => navigate('wisdom-library')}
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] hover:underline cursor-pointer"
            >
              <span>Explore All 11 Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Spiritual Audio Library */}
          <div className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#314B3B] dark:text-[#D4B16E] mb-3">
                <Headphones className="w-5 h-5" />
                <h3 className="font-display text-xl font-bold">
                  {lang === 'ta' ? 'ஆன்மிக ஒலிக் களஞ்சியம்' : 'Spiritual Audio Library'}
                </h3>
              </div>
              <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] mb-4">
                Lectures, recitations, chants, and guided contemplations with continuous mini-player.
              </p>
              <div className="space-y-2.5">
                {AUDIO_TRACKS.slice(0, 3).map((track) => (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/70 dark:border-[#2A4163] hover:border-[#C6A15B] text-left cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4] truncate">
                        {lang === 'ta' ? track.titleTa : track.title}
                      </p>
                      <p className="text-[11px] text-[#5C4F42] dark:text-[#CBBBA0]">{track.category}</p>
                    </div>
                    <Play className="w-4 h-4 text-[#641E24] dark:text-[#C6A15B] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('audio')}
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#314B3B] dark:text-[#D4B16E] hover:underline cursor-pointer"
            >
              <span>Open Audio Sanctuary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Digital Book Library */}
          <div className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#172B45] dark:text-[#D4B16E] mb-3">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-display text-xl font-bold">
                  {lang === 'ta' ? 'இலவச டிஜிட்டல் நூலகம்' : 'Free Digital Book Library'}
                </h3>
              </div>
              <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] mb-4">
                Read authorized e-books, study notes, and PDFs directly in-browser or download permitted editions.
              </p>
              <div className="space-y-2.5">
                {DIGITAL_BOOKS.slice(0, 3).map((book) => (
                  <button
                    key={book.id}
                    onClick={() => navigate('books', book.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/70 dark:border-[#2A4163] hover:border-[#C6A15B] cursor-pointer"
                  >
                    <p className="text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4] line-clamp-1">
                      {lang === 'ta' ? book.titleTa : book.title}
                    </p>
                    <p className="text-[11px] text-[#5C4F42] dark:text-[#CBBBA0]">
                      {book.category} · {book.language}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('books')}
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#172B45] dark:text-[#D4B16E] hover:underline cursor-pointer"
            >
              <span>Browse Digital Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* 8. FEATURED ARTICLES */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
                ESSAYS &amp; INSIGHTS · கட்டுரைகள்
              </p>
              <h2 className="font-display text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                {lang === 'ta' ? 'சிறப்புக் கட்டுரைகள்' : 'Featured Articles'}
              </h2>
            </div>
            <button
              onClick={() => navigate('articles')}
              className="text-sm font-semibold text-[#641E24] dark:text-[#D4B16E] hover:underline cursor-pointer whitespace-nowrap"
            >
              View All Articles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => navigate('articles', art.id)}
                className="group rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mb-1.5">
                      {art.category} · {art.readTimeMin} min read
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4] group-hover:text-[#641E24] dark:group-hover:text-[#D4B16E] transition-colors">
                      {lang === 'ta' ? art.titleTa : art.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#5C4F42] dark:text-[#CBBBA0] line-clamp-2">
                      {lang === 'ta' ? art.excerptTa : art.excerpt}
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">{art.author}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 10. WISDOM MAPS + 11. POPULAR LEARNING COURSES */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#641E24] dark:text-[#D4B16E] mb-2">
                <Network className="w-5 h-5" />
                <span className="text-xs font-semibold">INTERACTIVE DIAGRAMS · ஞான வரைபடங்கள்</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                Visual Wisdom Maps
              </h2>
              <p className="mt-2 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                Explore interactive zoom-and-pan concept maps connecting Bhagavad Gita, Upanishads, Atman-Brahman, and Thirukkural.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WISDOM_MAPS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => navigate('wisdom-maps', m.id)}
                    className="p-3 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-left hover:border-[#C6A15B] cursor-pointer"
                  >
                    <p className="text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4]">
                      {lang === 'ta' ? m.titleTa : m.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('wisdom-maps')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#641E24] dark:text-[#D4B16E] hover:underline cursor-pointer"
            >
              <span>Launch Interactive Map Explorer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 11. Popular Learning Courses & Certificates */}
          <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#314B3B] dark:text-[#D4B16E] mb-2">
                <Award className="w-5 h-5" />
                <span className="text-xs font-semibold">FREE PROGRAMMES · இலவச பாடநெறிகள்</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                Popular Learning Programmes
              </h2>
              <p className="mt-2 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                Self-paced courses with quizzes and free verifiable educational course-completion certificates.
              </p>
              <div className="mt-5 space-y-2.5">
                {CERTIFICATE_PROGRAMS.slice(0, 4).map((prog) => (
                  <button
                    key={prog.id}
                    onClick={() => navigate('certificates')}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-left hover:border-[#C6A15B] cursor-pointer"
                  >
                    <span className="text-sm font-medium text-[#1F1914] dark:text-[#FBF4E4]">
                      {lang === 'ta' ? prog.titleTa : prog.title}
                    </span>
                    <span className="text-xs text-[#314B3B] dark:text-[#C6A15B] shrink-0">Free</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('certificates')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#314B3B] dark:text-[#D4B16E] hover:underline cursor-pointer"
            >
              <span>View Programmes &amp; Verify Certificates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 12. SPIRITUAL PLACES + 13. LATEST ADDITIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
                  HERITAGE DIRECTORY · ஆன்மிகத் தலங்கள்
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  Spiritual Places &amp; Heritage Centres
                </h2>
              </div>
              <button
                onClick={() => navigate('places')}
                className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] hover:underline cursor-pointer"
              >
                Explore All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPIRITUAL_PLACES.slice(0, 4).map((place) => (
                <button
                  key={place.id}
                  onClick={() => navigate('places', place.id)}
                  className="text-left rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden hover:border-[#C6A15B] cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ResilientImage src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D9822B]" />
                      {place.district}, {place.state}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-[#1F1914] dark:text-[#FBF4E4] line-clamp-1">
                      {lang === 'ta' ? place.nameTa : place.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 13. Latest Additions */}
          <div className="lg:col-span-5 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#F6ECD8]/50 dark:bg-[#172B45] p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
                LATEST ADDITIONS · புதிய சேர்க்கைகள்
              </p>
              <h2 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4] mb-4">
                Recently Curated &amp; Published
              </h2>
              <div className="divide-y divide-[#DFCAA2] dark:divide-[#2A4163]">
                {latestPublishedCms.map((item) => (
                  <div key={item.id} className="py-3">
                    <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                      Published via CMS · {item.moduleType}
                    </p>
                    <p className="text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4]">{item.title}</p>
                  </div>
                ))}
                <button
                  onClick={() => navigate('quizzes')}
                  className="w-full py-3 text-left hover:text-[#641E24] dark:hover:text-[#D4B16E] cursor-pointer"
                >
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">Assessment · Bilingual</p>
                  <p className="text-sm font-semibold">5 Topic-Wise Interactive Quizzes (Tamil &amp; English)</p>
                </button>
                <button
                  onClick={() => navigate('activities')}
                  className="w-full py-3 text-left hover:text-[#641E24] dark:hover:text-[#D4B16E] cursor-pointer"
                >
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">Activities · Reflection</p>
                  <p className="text-sm font-semibold">Kural Couplet Builder &amp; Vedanta Contemplation Exercises</p>
                </button>
                <button
                  onClick={() => navigate('thirukkural', '355')}
                  className="w-full py-3 text-left hover:text-[#641E24] dark:hover:text-[#D4B16E] cursor-pointer"
                >
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">Thirukkural · Chapter 36</p>
                  <p className="text-sm font-semibold">Kural 355 — Discerning Essential Reality (மெய்ப்பொருள்)</p>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DFCAA2] dark:border-[#2A4163] flex items-center justify-between text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-[#D9822B]" />
                Free for Everyone Forever
              </span>
              <button
                onClick={() => navigate('journal')}
                className="font-semibold text-[#641E24] dark:text-[#D4B16E] hover:underline cursor-pointer"
              >
                Open Wisdom Journal
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
