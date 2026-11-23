import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, HelpCircle, PenTool, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUIZ_SETS, QuizSet } from '../data/communityAndPlaces';
import { PageUtilityBar } from '../components/PageUtilityBar';

export const ActivitiesPage: React.FC = () => {
  const { lang, navigate, user, saveJournalEntry, showToast } = useApp();

  // Interactive Kural Missing-Word Exercise
  const kuralChallenges = [
    {
      kuralNum: 34,
      prompt: 'மனத்துக்கண் _____ ஆதல் அனைத்துஅறன் ஆகுல நீர பிற.',
      promptEn: 'Being _____ in mind is the entirety of virtue; all else is mere outward display.',
      options: ['மாசிலன் (spotless)', 'செல்வம் (wealthy)', 'வேகம் (swift)', 'பெருமை (proud)'],
      correct: 0,
      insight: 'Kural 34 teaches that inner purity of mind (Maasilan) is the foundation of all Dharma.',
    },
    {
      kuralNum: 355,
      prompt: 'எப்பொருள் எத்தன்மைத் தாயினும் அப்பொருள் _____ காண்பது அறிவு.',
      promptEn: 'Whatever appearance a thing may bear, discerning its _____ is true wisdom.',
      options: ['புறப்பொருள் (outer form)', 'மெய்ப்பொருள் (essential truth)', 'பொன் (gold)', 'புகழ் (fame)'],
      correct: 1,
      insight: 'Kural 355 aligns with Vedantic Viveka—discerning eternal Reality (Meipporul) behind appearances.',
    },
    {
      kuralNum: 291,
      prompt: 'வாய்மை எனப்படுவது யாதெனின் யாதொன்றும் _____ இலாத சொலல்.',
      promptEn: 'Truthfulness is speaking words wholly free of _____ to any being.',
      options: ['தீமை (harm)', 'சுவை (flavour)', 'ஒலி (sound)', 'காலம் (time)'],
      correct: 0,
      insight: 'Kural 291 unites truthfulness with Ahimsa (non-harming).',
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [contemplationText, setContemplationText] = useState('');

  const handleSaveContemplation = async () => {
    if (!contemplationText.trim()) return;
    if (!user) {
      showToast('Sign in with Google to save your reflection permanently in Wisdom Journal.');
      return;
    }
    await saveJournalEntry({
      title: 'Activity Contemplation: Applying Aram & Samatvam',
      content: contemplationText,
      topic: 'Activities',
    });
    setContemplationText('');
    navigate('journal');
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Learning Activities" breadcrumbTa="செயல்பாடுகள்" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
            செயல்பாடுகள் · INTERACTIVE KURAL &amp; VEDANTA EXERCISES
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' ? 'கற்றல் செயல்பாடுகள் & சிந்தனைப் பயிற்சிகள்' : 'Contemplative Learning Activities'}
          </h1>
        </div>

        {/* Exercise 1: Kural Couplet Builder */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            01. Thirukkural Couplet Discernment Exercise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kuralChallenges.map((ch, idx) => {
              const picked = selectedAnswers[idx];
              const isCorrect = picked === ch.correct;
              return (
                <div
                  key={ch.kuralNum}
                  className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-5 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <p className="text-xs font-mono-tabular text-[#641E24] dark:text-[#C6A15B] mb-2">
                      Kural #{ch.kuralNum}
                    </p>
                    <p className="font-tamil text-base font-bold text-[#1F1914] dark:text-[#FBF4E4] leading-relaxed">
                      {ch.prompt}
                    </p>
                    <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] mt-2 italic">{ch.promptEn}</p>
                  </div>

                  <div className="space-y-2">
                    {ch.options.map((opt, oIdx) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedAnswers((p) => ({ ...p, [idx]: oIdx }))}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          picked === oIdx
                            ? oIdx === ch.correct
                              ? 'border-[#314B3B] bg-[#314B3B]/15 font-semibold'
                              : 'border-[#641E24] bg-[#641E24]/15'
                            : 'border-[#DFCAA2] dark:border-[#2A4163] hover:border-[#C6A15B]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                    {picked !== undefined && (
                      <p className="text-xs text-[#314B3B] dark:text-[#D4B16E] pt-1">
                        {isCorrect ? 'Correct: ' : 'Note: '}
                        {ch.insight}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Exercise 2: Vedanta Contemplation Assignment */}
        <section className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#641E24] dark:text-[#D4B16E]">
            <PenTool className="w-5 h-5" />
            <h2 className="font-display text-2xl font-bold">
              02. Self-Observation &amp; Vedanta Contemplation Prompt
            </h2>
          </div>
          <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
            Recall a moment today when you felt hurried or reactive. How does stepping back into the Witness perspective (Sakshi Bhava) or practicing Kural 34 (spotless intention) shift how you view that moment?
          </p>
          <textarea
            rows={4}
            value={contemplationText}
            onChange={(e) => setContemplationText(e.target.value)}
            placeholder="Write your reflection..."
            className="w-full p-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleSaveContemplation}
              className="px-5 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
            >
              Save Reflection to Wisdom Journal
            </button>
            <button
              onClick={() => navigate('quizzes')}
              className="text-xs font-semibold text-[#314B3B] dark:text-[#D4B16E] hover:underline cursor-pointer"
            >
              Proceed to Knowledge Quizzes →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export const QuizzesPage: React.FC = () => {
  const { lang, saveLessonProgress, navigate, showToast, cmsItems } = useApp();
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Scholar'>('all');
  const [activeQuizId, setActiveQuizId] = useState<string>(QUIZ_SETS[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allQuizzes = useMemo<QuizSet[]>(() => {
    const cmsQuizzes = cmsItems
      .filter((c) => c.moduleType === 'quiz' && c.status === 'published' && c.payload)
      .map((c) => c.payload as unknown as QuizSet);
    return [...QUIZ_SETS, ...cmsQuizzes.filter((q) => q && q.id && Array.isArray(q.questions))];
  }, [cmsItems]);

  const filtered = useMemo(() => {
    if (difficultyFilter === 'all') return allQuizzes;
    return allQuizzes.filter((q) => q.difficulty === difficultyFilter);
  }, [allQuizzes, difficultyFilter]);

  const activeQuiz = allQuizzes.find((q) => q.id === activeQuizId) || allQuizzes[0];

  const scorePct = useMemo(() => {
    if (!activeQuiz.questions.length) return 0;
    const correct = activeQuiz.questions.reduce(
      (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
      0
    );
    return Math.round((correct / activeQuiz.questions.length) * 100);
  }, [activeQuiz, answers]);

  const handleSubmit = async () => {
    setSubmitted(true);
    await saveLessonProgress(activeQuiz.id, activeQuiz.id, {
      completed: scorePct >= 60,
      quizScore: scorePct,
    });
    showToast(`Assessment Complete: ${scorePct}%`);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Quiz & Assessment Centre" breadcrumbTa="அறிவுத் தேர்வு மையம்" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
              அறிவுத் தேர்வு மையம் · BILINGUAL SELF-ASSESSMENTS
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              {lang === 'ta' ? 'அறிவுத் தேர்வு மற்றும் மதிப்பீட்டு மையம்' : 'Quiz & Assessment Centre'}
            </h1>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#F6ECD8] dark:bg-[#172B45]">
            {(['all', 'Beginner', 'Intermediate', 'Scholar'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficultyFilter(lvl)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                  difficultyFilter === lvl
                    ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                    : 'text-[#5C4F42] dark:text-[#CBBBA0]'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quiz Selector Sidebar */}
          <aside className="lg:col-span-4 space-y-2.5">
            {filtered.map((quiz) => (
              <button
                key={quiz.id}
                onClick={() => {
                  setActiveQuizId(quiz.id);
                  setAnswers({});
                  setSubmitted(false);
                }}
                className={`w-full text-left p-4 rounded-xl border cursor-pointer transition-colors ${
                  quiz.id === activeQuiz.id
                    ? 'border-[#641E24] bg-[#641E24] text-[#FFF9ED] dark:border-[#C6A15B] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                    : 'border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45]'
                }`}
              >
                <p className="text-xs opacity-80">
                  {quiz.topic} · {quiz.difficulty} · {quiz.questions.length} Questions
                </p>
                <p className="font-display text-lg font-bold mt-0.5">
                  {lang === 'ta' ? quiz.titleTa : quiz.title}
                </p>
              </button>
            ))}
          </aside>

          {/* Quiz Runner */}
          <main className="lg:col-span-8 rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DFCAA2]/60 dark:border-[#2A4163]">
              <div>
                <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  {activeQuiz.topic} · {activeQuiz.difficulty}
                </p>
                <h2 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                  {lang === 'ta' ? activeQuiz.titleTa : activeQuiz.title}
                </h2>
              </div>

              {submitted && (
                <div className="flex items-center gap-2 text-sm font-mono-tabular font-bold text-[#314B3B] dark:text-[#D4B16E]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Score: {scorePct}%</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {activeQuiz.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/80 dark:border-[#2A4163] space-y-3"
                >
                  <p className="text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4] flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#641E24] dark:text-[#C6A15B] shrink-0 mt-0.5" />
                    <span>
                      {idx + 1}. {lang === 'ta' ? q.questionTa : q.question}
                    </span>
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const picked = answers[q.id] === oIdx;
                      const isRight = q.correctIndex === oIdx;
                      return (
                        <button
                          key={oIdx}
                          disabled={submitted}
                          onClick={() => setAnswers((p) => ({ ...p, [q.id]: oIdx }))}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                            submitted
                              ? isRight
                                ? 'border-[#314B3B] bg-[#314B3B]/15 font-semibold'
                                : picked
                                ? 'border-[#641E24] bg-[#641E24]/15'
                                : 'border-[#DFCAA2] dark:border-[#2A4163]'
                              : picked
                              ? 'border-[#641E24] bg-[#641E24]/10 dark:border-[#C6A15B] font-semibold'
                              : 'border-[#DFCAA2] dark:border-[#2A4163] hover:border-[#C6A15B]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <p className="text-xs text-[#314B3B] dark:text-[#D4B16E]">
                      Explanation: {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                >
                  Submit Assessment
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleRetake}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                  {scorePct >= 60 && (
                    <button
                      onClick={() => navigate('certificates')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#314B3B] text-[#FFF9ED] text-xs font-semibold cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Claim Free Certificate</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
