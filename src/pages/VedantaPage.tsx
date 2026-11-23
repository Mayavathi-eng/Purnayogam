import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HelpCircle,
  Pause,
  Play,
  Presentation,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VEDANTA_CATEGORIES, VEDANTA_LESSONS, VedantaLesson } from '../data/vedanta';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { speakBilingual, startSacredDrone, stopSacredDrone, stopSpeaking } from '../lib/audioEngine';
import { downloadAuthorizedStudyPdf } from '../lib/pdfGenerator';

export const VedantaPage: React.FC = () => {
  const {
    routeParam,
    lang,
    lessonProgress,
    saveLessonProgress,
    toggleBookmark,
    isBookmarked,
    showToast,
    user,
    saveJournalEntry,
    navigate,
  } = useApp();

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    routeParam && VEDANTA_LESSONS.some((l) => l.id === routeParam)
      ? routeParam
      : VEDANTA_LESSONS[0].id
  );
  const [resourceTab, setResourceTab] = useState<'explanation' | 'ppt' | 'pdf' | 'quiz'>('explanation');
  const [slideIdx, setSlideIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Integrated discourse player state
  const [playing, setPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (routeParam && VEDANTA_LESSONS.some((l) => l.id === routeParam)) {
      setSelectedLessonId(routeParam);
    }
  }, [routeParam]);

  const activeLesson: VedantaLesson = useMemo(
    () => VEDANTA_LESSONS.find((l) => l.id === selectedLessonId) || VEDANTA_LESSONS[0],
    [selectedLessonId]
  );

  const activeIndex = VEDANTA_LESSONS.findIndex((l) => l.id === activeLesson.id);
  const totalSec = activeLesson.durationMinutes * 60;

  // Restore saved progress position when switching lesson
  useEffect(() => {
    const saved = lessonProgress.find((p) => p.lessonId === activeLesson.id);
    setProgressSec(saved?.lastPositionSec || 0);
    setSlideIdx(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setPlaying(false);
    stopSpeaking();
    stopSacredDrone();
  }, [activeLesson.id]);

  // Playback tick
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgressSec((prev) => {
        const next = prev + speed;
        if (next >= totalSec) {
          setPlaying(false);
          stopSpeaking();
          stopSacredDrone();
          saveLessonProgress(activeLesson.categoryId, activeLesson.id, {
            completed: true,
            lastPositionSec: totalSec,
          });
          return totalSec;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, speed, totalSec, activeLesson, saveLessonProgress]);

  const togglePlayLesson = () => {
    if (playing) {
      setPlaying(false);
      stopSpeaking();
      stopSacredDrone();
      saveLessonProgress(activeLesson.categoryId, activeLesson.id, {
        lastPositionSec: Math.round(progressSec),
      });
    } else {
      setPlaying(true);
      startSacredDrone(volume * 0.18);
      speakBilingual(
        lang === 'ta' ? activeLesson.explanationTa : activeLesson.explanation,
        lang,
        speed
      );
    }
  };

  const handleMarkCompleted = async () => {
    await saveLessonProgress(activeLesson.categoryId, activeLesson.id, {
      completed: true,
      lastPositionSec: Math.round(progressSec),
    });
    showToast(lang === 'ta' ? 'பாடம் நிறைவுற்றதாகப் பதிவு செய்யப்பட்டது' : 'Lesson marked completed');
  };

  const handleQuizSubmit = async () => {
    setQuizSubmitted(true);
    const correct = activeLesson.quiz.reduce(
      (acc, q, i) => (quizAnswers[i] === q.correctIndex ? acc + 1 : acc),
      0
    );
    const score = Math.round((correct / activeLesson.quiz.length) * 100);
    await saveLessonProgress(activeLesson.categoryId, activeLesson.id, {
      completed: score >= 50,
      quizScore: score,
    });
    showToast(`Quiz Score: ${score}%`);
  };

  const handleSaveNote = async () => {
    if (!user) {
      showToast('Sign in with Google to save lesson notes to your Wisdom Journal.');
      return;
    }
    await saveJournalEntry({
      title: `Study Notes: ${activeLesson.title}`,
      content: `${activeLesson.summary}\n\nPersonal Contemplation: `,
      topic: 'Vedanta',
      linkedRef: activeLesson.id,
    });
    navigate('journal');
  };

  const isCompleted = lessonProgress.some((p) => p.lessonId === activeLesson.id && p.completed);
  const bookmarked = isBookmarked('lesson', activeLesson.id);

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar
        breadcrumb="Swamiji's Vedanta Learning Centre"
        breadcrumbTa="வேதாந்தக் கல்வி மையம்"
        readAloudText={lang === 'ta' ? activeLesson.explanationTa : activeLesson.explanation}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
            7 LEARNING STREAMS · CATEGORY → SUBCATEGORY → SERIES → CHAPTER → CLASS → RESOURCES
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' ? 'சுவாமிஜியின் வேதாந்தக் கல்வி மையம்' : "Swamiji's Vedanta Learning Centre"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Hierarchy Sidebar */}
          <aside className="lg:col-span-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#DFCAA2] dark:border-[#2A4163] bg-[#F6ECD8]/60 dark:bg-[#15243A] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]">
                Curriculum Hierarchy
              </span>
              <span className="text-xs font-mono-tabular text-[#5C4F42] dark:text-[#CBBBA0]">
                {lessonProgress.filter((p) => p.completed).length}/{VEDANTA_LESSONS.length} Done
              </span>
            </div>

            <div className="divide-y divide-[#DFCAA2]/60 dark:divide-[#2A4163]">
              {VEDANTA_CATEGORIES.map((cat) => {
                const catLessons = VEDANTA_LESSONS.filter((l) => l.categoryId === cat.id);
                return (
                  <div key={cat.id} className="p-4">
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]">
                        {cat.number}. <span className="font-tamil">{cat.tamil}</span> · {cat.english}
                      </p>
                      <p className="text-[11px] text-[#5C4F42] dark:text-[#CBBBA0] mt-0.5">
                        {lang === 'ta' ? cat.descriptionTa : cat.description}
                      </p>
                    </div>
                    <div className="space-y-1.5 pl-2">
                      {catLessons.map((lesson) => {
                        const active = lesson.id === activeLesson.id;
                        const done = lessonProgress.some((p) => p.lessonId === lesson.id && p.completed);
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLessonId(lesson.id)}
                            className={`w-full px-3 py-2 rounded-lg text-left text-xs transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                              active
                                ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B] font-semibold'
                                : 'bg-[#FFF9ED] dark:bg-[#0F1A2B] text-[#1F1914] dark:text-[#FBF4E4] hover:border-[#C6A15B] border border-[#DFCAA2]/60 dark:border-[#2A4163]'
                            }`}
                          >
                            <div>
                              <p className="opacity-75 text-[10px]">
                                {lesson.series} · {lesson.chapter}
                              </p>
                              <p className="mt-0.5">{lang === 'ta' ? lesson.titleTa : lesson.title}</p>
                            </div>
                            {done && <CheckCircle2 className="w-4 h-4 text-[#314B3B] dark:text-[#0F1A2B] shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main Learning Content Stage */}
          <main className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    {activeLesson.subcategory} / {activeLesson.series} / {activeLesson.chapter}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4] mt-1">
                    {lang === 'ta' ? activeLesson.titleTa : activeLesson.title}
                  </h2>
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mt-1">
                    Teacher: {activeLesson.teacher} · {activeLesson.durationMinutes} min
                    {activeLesson.isSampleContent ? ' · Curated Study Sample' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      toggleBookmark({
                        itemType: 'lesson',
                        itemId: activeLesson.id,
                        title: activeLesson.title,
                        titleTa: activeLesson.titleTa,
                      })
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                      bookmarked
                        ? 'border-[#641E24] bg-[#641E24]/10 text-[#641E24] dark:border-[#C6A15B] dark:text-[#D4B16E]'
                        : 'border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
                  </button>
                  <button
                    onClick={handleMarkCompleted}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      isCompleted
                        ? 'bg-[#314B3B] text-[#FFF9ED]'
                        : 'border border-[#314B3B] text-[#314B3B] dark:border-[#C6A15B] dark:text-[#D4B16E]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                  </button>
                </div>
              </div>

              {/* Multimedia Discourse Player */}
              <div className="rounded-xl bg-[#172B45] text-[#FFF9ED] p-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayLesson}
                      className="w-11 h-11 rounded-full bg-[#C6A15B] text-[#0F1A2B] flex items-center justify-center hover:bg-[#d6b470] cursor-pointer shrink-0"
                      aria-label={playing ? 'Pause discourse' : 'Play discourse'}
                    >
                      {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <div>
                      <p className="text-sm font-semibold">
                        {playing ? 'Playing Guided Discourse & Sacred Drone' : 'Audio / Video Discourse Player'}
                      </p>
                      <p className="text-xs text-[#D8BD91] font-mono-tabular">
                        {Math.floor(progressSec / 60)}:{String(Math.floor(progressSec % 60)).padStart(2, '0')} /{' '}
                        {activeLesson.durationMinutes}:00 · Speed {speed}x
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 0.75 : 1))}
                      className="px-2.5 py-1 rounded border border-[#D8BD91]/40 text-xs font-mono-tabular cursor-pointer"
                    >
                      {speed}x
                    </button>
                    <div className="hidden sm:flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-[#D8BD91]" />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        aria-label="Playback volume"
                        className="w-20 accent-[#C6A15B]"
                      />
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={totalSec}
                  value={progressSec}
                  onChange={(e) => setProgressSec(Number(e.target.value))}
                  aria-label="Lesson seek timeline"
                  className="w-full accent-[#C6A15B]"
                />
              </div>

              {/* Resource Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6ECD8] dark:bg-[#0F1A2B] rounded-lg">
                {(
                  [
                    ['explanation', 'Text Explanation', FileText],
                    ['ppt', 'PPT Slides', Presentation],
                    ['pdf', 'PDF Notes', Download],
                    ['quiz', 'Lesson Quiz', HelpCircle],
                  ] as const
                ).map(([key, label, Icon]) => (
                  <button
                    key={key}
                    onClick={() => setResourceTab(key)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      resourceTab === key
                        ? 'bg-[#FFFDF7] dark:bg-[#172B45] text-[#641E24] dark:text-[#D4B16E] shadow-xs'
                        : 'text-[#5C4F42] dark:text-[#CBBBA0]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Tab 1: Text Explanation */}
              {resourceTab === 'explanation' && (
                <div className="space-y-5">
                  <p className="font-serif-editorial text-base leading-relaxed text-[#1F1914] dark:text-[#FBF4E4]">
                    {lang === 'ta' ? activeLesson.explanationTa : activeLesson.explanation}
                  </p>
                  <div className="p-4 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2] dark:border-[#2A4163]">
                    <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-2">
                      Scriptural References &amp; Further Reading
                    </h3>
                    <ul className="space-y-1 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                      {activeLesson.references.map((ref, idx) => (
                        <li key={idx}>· {ref}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={handleSaveNote}
                    className="text-xs font-semibold text-[#314B3B] dark:text-[#D4B16E] hover:underline cursor-pointer"
                  >
                    + Copy summary into my private Wisdom Journal
                  </button>
                </div>
              )}

              {/* Tab 2: Interactive PPT Slide Viewer */}
              {resourceTab === 'ppt' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#C6A15B]/60 bg-[#FFF9ED] dark:bg-[#0F1A2B] p-6 sm:p-8 min-h-[260px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#5C4F42] dark:text-[#CBBBA0] mb-3">
                        <span>Slide {slideIdx + 1} of {activeLesson.pptSlides.length}</span>
                        <span className="font-semibold text-[#641E24] dark:text-[#D4B16E]">
                          Key Term: {activeLesson.pptSlides[slideIdx].keyTerm}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                        {lang === 'ta'
                          ? activeLesson.pptSlides[slideIdx].titleTa
                          : activeLesson.pptSlides[slideIdx].title}
                      </h3>
                      <ul className="mt-4 space-y-2.5 text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                        {activeLesson.pptSlides[slideIdx].bullets.map((b, i) => (
                          <li key={i}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#DFCAA2]/60 dark:border-[#2A4163]">
                      <button
                        disabled={slideIdx === 0}
                        onClick={() => setSlideIdx((s) => Math.max(0, s - 1))}
                        className="px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs disabled:opacity-40 cursor-pointer"
                      >
                        Previous Slide
                      </button>
                      <button
                        disabled={slideIdx >= activeLesson.pptSlides.length - 1}
                        onClick={() => setSlideIdx((s) => Math.min(activeLesson.pptSlides.length - 1, s + 1))}
                        className="px-3 py-1.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold disabled:opacity-40 cursor-pointer"
                      >
                        Next Slide
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: PDF Notes Reader & Download */}
              {resourceTab === 'pdf' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4]">
                      Structured Study Handout
                    </h3>
                    <button
                      onClick={() =>
                        downloadAuthorizedStudyPdf({
                          title: activeLesson.title,
                          author: activeLesson.teacher,
                          category: activeLesson.chapter,
                          licenseNote: 'PURNA YOGAM Free Educational Study Handout',
                          pages: activeLesson.pdfNotes,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#314B3B] text-[#FFF9ED] text-xs font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Notes</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activeLesson.pdfNotes.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2] dark:border-[#2A4163]"
                      >
                        <h4 className="font-display text-lg font-bold text-[#641E24] dark:text-[#D4B16E]">
                          {sec.heading}
                        </h4>
                        <p className="mt-1.5 text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                          {sec.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Embedded Lesson Quiz */}
              {resourceTab === 'quiz' && (
                <div className="space-y-5">
                  {activeLesson.quiz.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-5 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2] dark:border-[#2A4163] space-y-3"
                    >
                      <p className="text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4]">
                        {qIdx + 1}. {lang === 'ta' ? q.questionTa : q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => {
                          const selected = quizAnswers[qIdx] === oIdx;
                          const isCorrect = q.correctIndex === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setQuizAnswers((p) => ({ ...p, [qIdx]: oIdx }))}
                              className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                                quizSubmitted
                                  ? isCorrect
                                    ? 'border-[#314B3B] bg-[#314B3B]/15 text-[#1F1914] dark:text-[#FBF4E4]'
                                    : selected
                                    ? 'border-[#641E24] bg-[#641E24]/15'
                                    : 'border-[#DFCAA2] dark:border-[#2A4163]'
                                  : selected
                                  ? 'border-[#641E24] bg-[#641E24]/10 dark:border-[#C6A15B] font-semibold'
                                  : 'border-[#DFCAA2] dark:border-[#2A4163]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && (
                        <p className="text-xs text-[#314B3B] dark:text-[#D4B16E] pt-1">
                          Explanation: {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={handleQuizSubmit}
                    className="px-5 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                  >
                    Check Answers &amp; Record Progress
                  </button>
                </div>
              )}

              {/* Prev / Next Lesson Footer */}
              <div className="pt-5 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] flex items-center justify-between">
                <button
                  disabled={activeIndex <= 0}
                  onClick={() => setSelectedLessonId(VEDANTA_LESSONS[activeIndex - 1].id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Lesson</span>
                </button>
                <button
                  disabled={activeIndex >= VEDANTA_LESSONS.length - 1}
                  onClick={() => setSelectedLessonId(VEDANTA_LESSONS[activeIndex + 1].id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs disabled:opacity-40 cursor-pointer"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
