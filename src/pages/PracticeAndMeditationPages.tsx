import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Flame, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DAILY_PRACTICES } from '../data/communityAndPlaces';
import { getKuralByNumber } from '../data/thirukkural';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { MandalaMotif } from '../components/SacredMotifs';
import { playTempleBell, startSacredDrone, stopSacredDrone } from '../lib/audioEngine';

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const DailyPracticePage: React.FC = () => {
  const { lang, practiceLogs, savePracticeLog, user, navigate } = useApp();
  const [planLevel, setPlanLevel] = useState<'beginner' | 'advanced'>('beginner');
  const [activePeriod, setActivePeriod] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  const key = todayKey();
  const existingLog = practiceLogs.find((l) => l.dateKey === key);

  const [morningDone, setMorningDone] = useState(existingLog?.morningDone ?? false);
  const [afternoonDone, setAfternoonDone] = useState(existingLog?.afternoonDone ?? false);
  const [eveningDone, setEveningDone] = useState(existingLog?.eveningDone ?? false);
  const [reflectionNote, setReflectionNote] = useState(existingLog?.reflectionNote ?? '');

  useEffect(() => {
    if (existingLog) {
      setMorningDone(existingLog.morningDone);
      setAfternoonDone(existingLog.afternoonDone);
      setEveningDone(existingLog.eveningDone);
      setReflectionNote(existingLog.reflectionNote || '');
    }
  }, [existingLog]);

  const routine = DAILY_PRACTICES.find((r) => r.period === activePeriod) || DAILY_PRACTICES[0];
  const kural34 = getKuralByNumber(34);

  const streakCount = useMemo(() => {
    const completedDays = practiceLogs.filter((l) => l.morningDone || l.afternoonDone || l.eveningDone).length;
    return completedDays + (morningDone || afternoonDone || eveningDone ? (existingLog ? 0 : 1) : 0);
  }, [practiceLogs, morningDone, afternoonDone, eveningDone, existingLog]);

  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dk = d.toISOString().slice(0, 10);
      const log = practiceLogs.find((p) => p.dateKey === dk);
      const count = log
        ? [log.morningDone, log.afternoonDone, log.eveningDone].filter(Boolean).length
        : dk === key
        ? [morningDone, afternoonDone, eveningDone].filter(Boolean).length
        : 0;
      return { dateKey: dk, label: d.toLocaleDateString('en-US', { weekday: 'short' }), count };
    });
  }, [practiceLogs, key, morningDone, afternoonDone, eveningDone]);

  const handleSave = async (nextM = morningDone, nextA = afternoonDone, nextE = eveningDone) => {
    await savePracticeLog({
      dateKey: key,
      morningDone: nextM,
      afternoonDone: nextA,
      eveningDone: nextE,
      meditationMinutes: (nextM ? 5 : 0) + (nextE ? 10 : 0),
      reflectionNote,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Daily Spiritual Practice" breadcrumbTa="தினசரி ஆன்மிகப் பயிற்சி" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
              தினசரி ஆன்மிகப் பயிற்சி · EDUCATIONAL &amp; OPTIONAL CONTEMPLATIVE RHYTHM
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              {lang === 'ta' ? 'தினசரி ஆன்மிகப் பயிற்சி மையம்' : 'Daily Spiritual Practice Centre'}
            </h1>
          </div>

          {/* Beginner vs Advanced Plan Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#F6ECD8] dark:bg-[#172B45]">
            <button
              onClick={() => setPlanLevel('beginner')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                planLevel === 'beginner'
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'text-[#5C4F42] dark:text-[#CBBBA0]'
              }`}
            >
              Beginner Plan (15m/day)
            </button>
            <button
              onClick={() => setPlanLevel('advanced')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                planLevel === 'advanced'
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'text-[#5C4F42] dark:text-[#CBBBA0]'
              }`}
            >
              Advanced Plan (35m/day)
            </button>
          </div>
        </div>

        {/* Practice Overview + Weekly Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {/* Period Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[#F6ECD8] dark:bg-[#172B45]">
              {DAILY_PRACTICES.map((r) => (
                <button
                  key={r.period}
                  onClick={() => setActivePeriod(r.period)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold capitalize cursor-pointer ${
                    activePeriod === r.period
                      ? 'bg-[#FFFDF7] dark:bg-[#0F1A2B] text-[#641E24] dark:text-[#D4B16E]'
                      : 'text-[#5C4F42] dark:text-[#CBBBA0]'
                  }`}
                >
                  {lang === 'ta' ? r.titleTa : r.period}
                </button>
              ))}
            </div>

            {/* Active Period Routine Card */}
            <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    {planLevel === 'beginner' ? routine.durationMin : routine.durationMin + 10} minutes ·{' '}
                    {planLevel === 'beginner' ? 'Beginner' : 'Deepened'} Practice
                  </p>
                  <h2 className="font-display text-2xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                    {lang === 'ta' ? routine.titleTa : routine.title}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    if (activePeriod === 'morning') {
                      const next = !morningDone;
                      setMorningDone(next);
                      handleSave(next, afternoonDone, eveningDone);
                    } else if (activePeriod === 'afternoon') {
                      const next = !afternoonDone;
                      setAfternoonDone(next);
                      handleSave(morningDone, next, eveningDone);
                    } else {
                      const next = !eveningDone;
                      setEveningDone(next);
                      handleSave(morningDone, afternoonDone, next);
                    }
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
                    (activePeriod === 'morning' && morningDone) ||
                    (activePeriod === 'afternoon' && afternoonDone) ||
                    (activePeriod === 'evening' && eveningDone)
                      ? 'bg-[#314B3B] text-[#FFF9ED]'
                      : 'bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark {activePeriod} Complete</span>
                </button>
              </div>

              {activePeriod === 'morning' && (
                <div className="p-4 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2] dark:border-[#2A4163]">
                  <p className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-1">
                    Today&apos;s Contemplative Kural (#34)
                  </p>
                  <p className="font-tamil text-base font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                    {kural34.tamilLine1} {kural34.tamilLine2}
                  </p>
                  <p className="mt-1 text-xs text-[#5C4F42] dark:text-[#CBBBA0] italic">
                    “{kural34.englishTranslation}”
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-xs font-semibold text-[#314B3B] dark:text-[#D4B16E] mb-1">
                  Contemplative Thought
                </h3>
                <p className="font-serif-editorial text-base text-[#1F1914] dark:text-[#FBF4E4]">
                  {lang === 'ta' ? routine.vedantaThoughtTa : routine.vedantaThought}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[#5C4F42] dark:text-[#CBBBA0] mb-2">Guided Steps</h3>
                <ol className="space-y-2 text-sm text-[#1F1914] dark:text-[#FBF4E4]">
                  {routine.steps.map((step, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="font-mono-tabular text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mt-0.5">
                        0{i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] space-y-3">
                <label className="block text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]">
                  Reflection Question: {lang === 'ta' ? routine.reflectionPromptTa : routine.reflectionPrompt}
                </label>
                <textarea
                  rows={3}
                  value={reflectionNote}
                  onChange={(e) => setReflectionNote(e.target.value)}
                  placeholder="Write a brief daily reflection..."
                  className="w-full p-3 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-sm text-[#1F1914] dark:text-[#FBF4E4]"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handleSave()}
                    className="px-4 py-2 rounded-lg bg-[#172B45] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                  >
                    Save Daily Reflection
                  </button>
                  <button
                    onClick={() => navigate('meditation')}
                    className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] hover:underline cursor-pointer"
                  >
                    Open Meditation Timer →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Streak & Weekly Report Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#D9822B]">
                  <Flame className="w-5 h-5" />
                  <h3 className="font-display text-xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
                    Practice Streak
                  </h3>
                </div>
                <span className="font-mono-tabular text-2xl font-bold text-[#641E24] dark:text-[#D4B16E]">
                  {streakCount}d
                </span>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-[#5C4F42] dark:text-[#CBBBA0] mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Weekly Practice Calendar</span>
                </p>
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {last7Days.map((d) => (
                    <div
                      key={d.dateKey}
                      className={`p-2 rounded-lg border text-[11px] ${
                        d.count > 0
                          ? 'bg-[#314B3B] text-[#FFF9ED] border-[#314B3B]'
                          : 'bg-[#FFF9ED] dark:bg-[#0F1A2B] border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0]'
                      }`}
                    >
                      <div>{d.label}</div>
                      <div className="font-mono-tabular font-bold mt-0.5">{d.count}/3</div>
                    </div>
                  ))}
                </div>
              </div>

              {!user && (
                <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] pt-2">
                  Optional: Sign in with Google via the Explore menu to sync your daily streak permanently.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#F6ECD8]/60 dark:bg-[#15243A] p-5 text-xs text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
              <strong className="text-[#1F1914] dark:text-[#FBF4E4]">Educational Practice Notice:</strong> All
              contemplation, breath awareness, and meditation routines on PURNA YOGAM are strictly educational and
              voluntary spiritual practices—not medical advice or clinical therapy.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export const MeditationCentrePage: React.FC = () => {
  const { lang, reducedMotion, practiceLogs, savePracticeLog, user } = useApp();

  const categories = [
    'Beginner Meditation',
    'Breath Awareness',
    'Silent Meditation',
    'Guided Contemplation',
    'Vedantic Meditation',
    'Advanced Meditation',
  ];

  const [category, setCategory] = useState(categories[1]);
  const [durationMin, setDurationMin] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const [running, setRunning] = useState(false);
  const [droneOn, setDroneOn] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    setSecondsLeft(durationMin * 60);
    setRunning(false);
  }, [durationMin]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          stopSacredDrone();
          setDroneOn(false);
          playTempleBell(0.35);
          if (user) {
            const dk = todayKey();
            const existing = practiceLogs.find((l) => l.dateKey === dk);
            savePracticeLog({
              dateKey: dk,
              morningDone: existing?.morningDone ?? false,
              afternoonDone: existing?.afternoonDone ?? false,
              eveningDone: true,
              meditationMinutes: (existing?.meditationMinutes ?? 0) + durationMin,
              reflectionNote: existing?.reflectionNote ?? `Completed ${durationMin}m ${category}`,
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running, durationMin, category, user, practiceLogs, savePracticeLog]);

  // 14-second breathing cycle: 4s Inhale, 4s Hold, 6s Exhale
  useEffect(() => {
    if (!running) {
      setBreathPhase('Inhale');
      return;
    }
    let tick = 0;
    const id = window.setInterval(() => {
      tick = (tick + 1) % 14;
      if (tick < 4) setBreathPhase('Inhale');
      else if (tick < 8) setBreathPhase('Hold');
      else setBreathPhase('Exhale');
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    return () => stopSacredDrone();
  }, []);

  const toggleSession = () => {
    if (!running) {
      playTempleBell(0.28);
      if (droneOn) startSacredDrone(0.14);
      setRunning(true);
    } else {
      setRunning(false);
      stopSacredDrone();
    }
  };

  const toggleDrone = () => {
    const next = !droneOn;
    setDroneOn(next);
    if (next && running) startSacredDrone(0.14);
    else stopSacredDrone();
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="min-h-screen bg-[#0F1A2B] text-[#FFF9ED]">
      <PageUtilityBar breadcrumb="Guided Meditation Centre" breadcrumbTa="தியான மையம்" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold text-[#C6A15B]">
            தியான மையம் · DISTRACTION-FREE CONTEMPLATIVE SANCTUARY
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#FFF9ED]">
            {lang === 'ta' ? 'அமைதி மற்றும் தியான மையம்' : 'Guided Meditation Sanctuary'}
          </h1>
          <p className="text-sm text-[#D8BD91] max-w-xl mx-auto">
            Rest in natural breath and silent awareness. Educational practice only.
          </p>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                category === cat
                  ? 'bg-[#C6A15B] text-[#0F1A2B] font-semibold'
                  : 'border border-[#2A4163] text-[#D8BD91] hover:border-[#C6A15B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Minimal Breathing Circle & Mandala */}
        <div className="relative flex flex-col items-center justify-center py-12">
          <div className="relative w-72 h-72 flex items-center justify-center">
            <MandalaMotif
              className="w-72 h-72 text-[#C6A15B]/25 absolute inset-0"
              slowSpin={running && !reducedMotion}
            />
            <div
              className={`w-44 h-44 rounded-full border-2 border-[#C6A15B]/80 bg-[#172B45]/90 flex flex-col items-center justify-center transition-transform duration-1000 ${
                running && !reducedMotion
                  ? breathPhase === 'Inhale'
                    ? 'scale-110'
                    : breathPhase === 'Hold'
                    ? 'scale-110'
                    : 'scale-95'
                  : 'scale-100'
              }`}
            >
              <span className="text-xs uppercase tracking-widest text-[#D8BD91]">
                {running ? breathPhase : category}
              </span>
              <span className="font-mono-tabular text-4xl font-bold text-[#FFF9ED] mt-1">
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={toggleSession}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6A15B] text-[#0F1A2B] font-semibold text-sm cursor-pointer"
            >
              {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{running ? 'Pause Meditation' : 'Begin Session'}</span>
            </button>

            <button
              onClick={() => {
                setRunning(false);
                stopSacredDrone();
                setSecondsLeft(durationMin * 60);
              }}
              className="p-3 rounded-xl border border-[#2A4163] text-[#D8BD91] hover:border-[#C6A15B] cursor-pointer"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleDrone}
              className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border text-xs font-medium cursor-pointer ${
                droneOn ? 'border-[#C6A15B] text-[#C6A15B]' : 'border-[#2A4163] text-[#D8BD91]'
              }`}
            >
              {droneOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{droneOn ? 'Sacred Drone On' : 'Silent Mode'}</span>
            </button>
          </div>

          {/* Duration Pills */}
          <div className="mt-6 flex items-center gap-2">
            {[5, 10, 15, 20, 30].map((m) => (
              <button
                key={m}
                onClick={() => setDurationMin(m)}
                className={`px-3 py-1 rounded-md text-xs font-mono-tabular cursor-pointer ${
                  durationMin === m
                    ? 'bg-[#FFF9ED] text-[#0F1A2B] font-semibold'
                    : 'border border-[#2A4163] text-[#D8BD91]'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
