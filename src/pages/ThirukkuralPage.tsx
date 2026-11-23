import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Pause,
  Play,
  PenTool,
  Search,
  Share2,
  Video,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  getChapterForKural,
  getKuralByNumber,
  getKuralsInChapter,
  searchKurals,
  THIRUKKURAL_CHAPTERS,
  THIRUKKURAL_IYALS,
  THIRUKKURAL_PAALS,
} from '../data/thirukkural';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { KuralMediaStudio, KuralMediaTab } from '../components/KuralMediaStudio';
import { speakBilingual, stopSpeaking } from '../lib/audioEngine';

export const ThirukkuralPage: React.FC = () => {
  const {
    routeParam,
    lang,
    toggleBookmark,
    isBookmarked,
    navigate,
    cmsItems,
    showToast,
    user,
    saveJournalEntry,
  } = useApp();

  const initialKuralNum = useMemo(() => {
    const parsed = routeParam ? Number(routeParam) : 1;
    return Number.isInteger(parsed) && parsed >= 1 && parsed <= 1080 ? parsed : 1;
  }, [routeParam]);

  const [selectedKuralNumber, setSelectedKuralNumber] = useState<number>(initialKuralNum);
  const [expandedPaals, setExpandedPaals] = useState<Record<string, boolean>>({
    arathuppaal: true,
    porutpaal: true,
  });
  const [expandedIyals, setExpandedIyals] = useState<Record<string, boolean>>({
    payiraviyal: true,
    illaraviyal: true,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mediaTab, setMediaTab] = useState<KuralMediaTab>('audio');

  useEffect(() => {
    if (routeParam) {
      const parsed = Number(routeParam);
      if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 1080) {
        setSelectedKuralNumber(parsed);
        const ch = getChapterForKural(parsed);
        setExpandedPaals((p) => ({ ...p, [ch.paalId]: true }));
        setExpandedIyals((p) => ({ ...p, [ch.iyalId]: true }));
      }
    }
  }, [routeParam]);

  const baseKural = getKuralByNumber(selectedKuralNumber);
  // Check if an Admin published a verified CMS override for this Kural number
  const cmsOverride = useMemo(() => {
    return cmsItems.find(
      (item) =>
        item.moduleType === 'kural' &&
        item.status === 'published' &&
        Number(item.payload?.kuralNumber) === selectedKuralNumber
    );
  }, [cmsItems, selectedKuralNumber]);

  const activeKural = useMemo(() => {
    if (!cmsOverride || !cmsOverride.payload) return baseKural;
    const p = cmsOverride.payload as Record<string, string>;
    return {
      ...baseKural,
      tamilLine1: p.tamilLine1 || baseKural.tamilLine1,
      tamilLine2: p.tamilLine2 || baseKural.tamilLine2,
      wordByWordTa: p.wordByWordTa || baseKural.wordByWordTa,
      tamilCommentary: p.tamilCommentary || baseKural.tamilCommentary,
      commentaryAuthor: p.commentaryAuthor || 'Admin CMS Verified Edition',
      englishTranslation: p.englishTranslation || baseKural.englishTranslation,
      englishExplanation: p.englishExplanation || baseKural.englishExplanation,
      audioUrl: p.audioUrl || baseKural.audioUrl,
      videoUrl: p.videoUrl || baseKural.videoUrl,
      pdfUrl: p.pdfUrl || baseKural.pdfUrl,
      isAuthenticVerified: true,
    };
  }, [baseKural, cmsOverride]);

  const activeChapter = getChapterForKural(activeKural.number);
  const activeIyal = THIRUKKURAL_IYALS.find((i) => i.id === activeChapter.iyalId);
  const activePaal = THIRUKKURAL_PAALS.find((p) => p.id === activeChapter.paalId);
  const chapterKurals = useMemo(() => getKuralsInChapter(activeChapter.number), [activeChapter.number]);
  const searchResults = useMemo(() => (searchTerm.trim() ? searchKurals(searchTerm) : []), [searchTerm]);

  const selectChapter = (chapterNum: number) => {
    const ch = THIRUKKURAL_CHAPTERS.find((c) => c.number === chapterNum);
    if (!ch) return;
    setSelectedKuralNumber(ch.kuralRange[0]);
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleListen = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    const text =
      lang === 'ta'
        ? `${activeKural.tamilLine1} ${activeKural.tamilLine2}. ${activeKural.tamilCommentary}`
        : `${activeKural.tamilLine1} ${activeKural.tamilLine2}. ${activeKural.englishTranslation}`;
    const ok = speakBilingual(text, lang, 0.88, () => setIsSpeaking(false));
    if (ok) setIsSpeaking(true);
    else showToast('Speech synthesis unavailable in this browser.');
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/thirukkural/${activeKural.number}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast(lang === 'ta' ? 'குறள் இணைப்பு நகலெடுக்கப்பட்டது' : `Copied link to Kural ${activeKural.number}`);
    } catch {
      showToast(shareUrl);
    }
  };

  const handleSaveToJournal = async () => {
    if (!user) {
      showToast('Please sign in with Google to save reflections to your Wisdom Journal.');
      return;
    }
    await saveJournalEntry({
      title: `Reflection on Kural ${activeKural.number} (${activeChapter.english})`,
      content: `${activeKural.tamilLine1}\n${activeKural.tamilLine2}\n\n"${activeKural.englishTranslation}"\n\nPersonal insight: `,
      topic: 'Thirukkural',
      linkedRef: `Kural #${activeKural.number}`,
    });
    navigate('journal');
  };

  const bookmarked = isBookmarked('kural', String(activeKural.number));

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar
        breadcrumb="Thirukkural (1,080)"
        breadcrumbTa="திருக்குறள் (1,080)"
        readAloudText={`${activeKural.tamilLine1} ${activeKural.tamilLine2}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Banner */}
        <div className="mb-8 pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163] flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
              அறத்துப்பால் (380) &amp; பொருட்பால் (700) · 108 CHAPTERS · 1,080 KURALS
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
              {lang === 'ta' ? 'திருக்குறள் டிஜிட்டல் நூலகம்' : 'Thirukkural Digital Library'}
            </h1>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-[#5C4F42] dark:text-[#CBBBA0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                lang === 'ta'
                  ? 'குறள் எண் (1–1080), தமிழ்/ஆங்கிலச் சொல்...'
                  : 'Search by Kural # (1–1080), Tamil/English word, chapter...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] text-sm text-[#1F1914] dark:text-[#FBF4E4] focus:outline-none focus:border-[#641E24] dark:focus:border-[#C6A15B]"
            />
          </div>
        </div>

        {/* Search Results Strip if Searching */}
        {searchTerm.trim() && (
          <div className="mb-8 p-5 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#641E24] dark:text-[#D4B16E]">
                Search Results ({searchResults.length})
              </h2>
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0]">
                No matching Kurals found. Enter any number from 1 to 1080 or keywords like “அறம்”, “வாய்மை”, or “wisdom”.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {searchResults.map((res) => (
                  <button
                    key={res.number}
                    onClick={() => {
                      setSelectedKuralNumber(res.number);
                      setSearchTerm('');
                    }}
                    className="p-3 rounded-lg border border-[#DFCAA2]/70 dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-left hover:border-[#C6A15B] cursor-pointer"
                  >
                    <p className="text-xs font-mono-tabular text-[#641E24] dark:text-[#C6A15B]">Kural {res.number}</p>
                    <p className="font-tamil text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4] line-clamp-1">
                      {res.tamilLine1} {res.tamilLine2}
                    </p>
                    <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0] line-clamp-1">{res.englishTranslation}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main 2-Column Layout: Expandable Hierarchy Sidebar + Reading Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Expandable Sidebar: Paal -> Iyal -> Adhigaram */}
          <aside className="lg:col-span-4 rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#DFCAA2] dark:border-[#2A4163] bg-[#F6ECD8]/60 dark:bg-[#15243A] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]">
                பால் → இயல் → அதிகாரம் (108)
              </span>
              <span className="text-xs font-mono-tabular text-[#5C4F42] dark:text-[#CBBBA0]">1,080 Kurals</span>
            </div>

            <div className="max-h-[680px] overflow-y-auto divide-y divide-[#DFCAA2]/60 dark:divide-[#2A4163]">
              {THIRUKKURAL_PAALS.map((paal) => {
                const paalOpen = !!expandedPaals[paal.id];
                const iyals = THIRUKKURAL_IYALS.filter((i) => i.paalId === paal.id);
                return (
                  <div key={paal.id}>
                    <button
                      onClick={() => setExpandedPaals((p) => ({ ...p, [paal.id]: !p[paal.id] }))}
                      className="w-full px-4 py-3 flex items-center justify-between text-left bg-[#FFF9ED]/70 dark:bg-[#0F1A2B]/60 hover:bg-[#F6ECD8]/70 dark:hover:bg-[#15243A] cursor-pointer"
                    >
                      <div>
                        <p className="font-tamil text-sm font-bold text-[#641E24] dark:text-[#D4B16E]">
                          {paal.tamil} · {paal.english}
                        </p>
                        <p className="text-[11px] font-mono-tabular text-[#5C4F42] dark:text-[#CBBBA0]">
                          {paal.chapterCount} Chapters · {paal.kuralCount} Kurals ({paal.kuralRange[0]}–{paal.kuralRange[1]})
                        </p>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${paalOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {paalOpen && (
                      <div className="divide-y divide-[#DFCAA2]/40 dark:divide-[#2A4163]/60">
                        {iyals.map((iyal) => {
                          const iyalOpen = !!expandedIyals[iyal.id];
                          const chapters = THIRUKKURAL_CHAPTERS.filter((c) => c.iyalId === iyal.id);
                          return (
                            <div key={iyal.id}>
                              <button
                                onClick={() => setExpandedIyals((p) => ({ ...p, [iyal.id]: !p[iyal.id] }))}
                                className="w-full px-5 py-2.5 flex items-center justify-between text-left hover:bg-[#F6ECD8]/40 dark:hover:bg-[#0F1A2B]/40 cursor-pointer"
                              >
                                <span className="text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4]">
                                  {iyal.tamil} · {iyal.english} ({chapters.length})
                                </span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${iyalOpen ? 'rotate-180' : ''}`} />
                              </button>

                              {iyalOpen && (
                                <div className="px-3 pb-2 space-y-0.5">
                                  {chapters.map((ch) => {
                                    const isSelected = ch.number === activeChapter.number;
                                    return (
                                      <button
                                        key={ch.number}
                                        onClick={() => selectChapter(ch.number)}
                                        className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer ${
                                          isSelected
                                            ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B] font-semibold'
                                            : 'text-[#5C4F42] dark:text-[#CBBBA0] hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B]'
                                        }`}
                                      >
                                        <span className="truncate">
                                          <span className="font-mono-tabular mr-1.5">{String(ch.number).padStart(3, '0')}.</span>
                                          <span className="font-tamil">{ch.tamil}</span> · {ch.english}
                                        </span>
                                        <span className="font-mono-tabular text-[10px] opacity-80 shrink-0">
                                          10
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main Reading Area */}
          <main className="lg:col-span-8 space-y-6">
            {/* Chapter Header + Kural Number Strip */}
            <div className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DFCAA2]/70 dark:border-[#2A4163]">
                <div>
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    {activePaal?.tamil} / {activeIyal?.tamil} / Chapter {activeChapter.number} of 108
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914] dark:text-[#FBF4E4] mt-1">
                    <span className="font-tamil">{activeChapter.tamil}</span> · {activeChapter.english}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={activeChapter.number <= 1}
                    onClick={() => selectChapter(activeChapter.number - 1)}
                    className="px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-medium disabled:opacity-40 hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
                  >
                    Prev Chapter
                  </button>
                  <button
                    disabled={activeChapter.number >= 108}
                    onClick={() => selectChapter(activeChapter.number + 1)}
                    className="px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-medium disabled:opacity-40 hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
                  >
                    Next Chapter
                  </button>
                </div>
              </div>

              {/* 10 Kurals in Chapter */}
              <div className="pt-4 flex flex-wrap items-center gap-1.5">
                {chapterKurals.map((k) => (
                  <button
                    key={k.number}
                    onClick={() => {
                      setSelectedKuralNumber(k.number);
                      stopSpeaking();
                      setIsSpeaking(false);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono-tabular transition-colors cursor-pointer ${
                      k.number === activeKural.number
                        ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B] font-semibold'
                        : 'bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0] hover:border-[#C6A15B]'
                    }`}
                  >
                    #{k.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Kural Reading Card */}
            <article className="rounded-2xl border border-[#C6A15B]/60 dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-mono-tabular font-semibold text-[#641E24] dark:text-[#D4B16E]">
                  THIRUKKURAL #{activeKural.number} OF 1,080 · {activeKural.isAuthenticVerified ? 'Verified Classical Text' : 'Sample / Editorial Slot'}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setMediaTab('audio');
                      handleListen();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
                  >
                    {isSpeaking ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'Pause Audio' : 'Audio'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setMediaTab('video');
                      document.getElementById('kural-media-studio')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                      mediaTab === 'video'
                        ? 'border-[#641E24] bg-[#641E24]/10 text-[#641E24] dark:border-[#C6A15B] dark:text-[#D4B16E]'
                        : 'border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0] hover:border-[#C6A15B]'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video</span>
                  </button>
                  <button
                    onClick={() => {
                      setMediaTab('pdf');
                      document.getElementById('kural-media-studio')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                      mediaTab === 'pdf'
                        ? 'border-[#641E24] bg-[#641E24]/10 text-[#641E24] dark:border-[#C6A15B] dark:text-[#D4B16E]'
                        : 'border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0] hover:border-[#C6A15B]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() =>
                      toggleBookmark({
                        itemType: 'kural',
                        itemId: String(activeKural.number),
                        title: `Kural ${activeKural.number}: ${activeKural.englishTranslation}`,
                        titleTa: `${activeKural.tamilLine1} ${activeKural.tamilLine2}`,
                      })
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                      bookmarked
                        ? 'border-[#641E24] bg-[#641E24]/10 text-[#641E24] dark:border-[#C6A15B] dark:text-[#D4B16E]'
                        : 'border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>
                  <button
                    onClick={handleSaveToJournal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-medium text-[#5C4F42] dark:text-[#CBBBA0] hover:border-[#C6A15B] cursor-pointer"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Journal</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-medium text-[#5C4F42] dark:text-[#CBBBA0] hover:border-[#C6A15B] cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Couplet Box */}
              <div className="p-6 sm:p-8 rounded-xl bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2] dark:border-[#2A4163]">
                <p className="font-tamil text-xl sm:text-3xl font-bold text-[#641E24] dark:text-[#D4B16E] leading-relaxed">
                  {activeKural.tamilLine1}
                  <br />
                  {activeKural.tamilLine2}
                </p>
                {activeKural.transliteration && (
                  <p className="mt-3 text-xs sm:text-sm text-[#5C4F42] dark:text-[#CBBBA0] italic">
                    {activeKural.transliteration}
                  </p>
                )}
              </div>

              {!activeKural.isAuthenticVerified && (
                <div className="p-4 rounded-lg bg-[#F6ECD8]/65 dark:bg-[#15243A] border border-[#C6A15B]/50 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                  <strong className="text-[#641E24] dark:text-[#D4B16E]">Editorial Transparency Notice:</strong>{' '}
                  {activeKural.editorialNote}. Verified authentic couplets are immediately browsable in Chapters 1, 4, 8, 25, 30, 32, 36, 40, 43, 60, 79, 99, and 100.
                </div>
              )}

              {/* Bilingual Meanings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-1.5">
                      பதவுரை · Word-by-Word Meaning
                    </h3>
                    <p className="font-tamil text-sm text-[#1F1914] dark:text-[#FBF4E4] leading-relaxed">
                      {activeKural.wordByWordTa}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E] mb-1.5">
                      தமிழ் விளக்கவுரை · Tamil Commentary
                    </h3>
                    <p className="font-tamil text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                      {activeKural.tamilCommentary}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-[#172B45] dark:text-[#D4B16E] mb-1.5">
                      English Translation
                    </h3>
                    <p className="font-serif-editorial text-base font-medium text-[#1F1914] dark:text-[#FBF4E4] leading-relaxed">
                      “{activeKural.englishTranslation}”
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#172B45] dark:text-[#D4B16E] mb-1.5">
                      Philosophical Explanation
                    </h3>
                    <p className="text-sm text-[#5C4F42] dark:text-[#CBBBA0] leading-relaxed">
                      {activeKural.englishExplanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Integrated Thirukkural Audio, Video & PDF Studio */}
              <div id="kural-media-studio" className="pt-2">
                <KuralMediaStudio
                  kural={activeKural}
                  chapter={activeChapter}
                  paal={activePaal}
                  iyal={activeIyal}
                  chapterKurals={chapterKurals}
                  activeTab={mediaTab}
                  onTabChange={setMediaTab}
                />
              </div>

              <div className="pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                <span>Source &amp; Attribution: {activeKural.commentaryAuthor}</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={activeKural.number <= 1}
                    onClick={() => setSelectedKuralNumber((n) => Math.max(1, n - 1))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] disabled:opacity-40 hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev Kural</span>
                  </button>
                  <button
                    disabled={activeKural.number >= 1080}
                    onClick={() => setSelectedKuralNumber((n) => Math.min(1080, n + 1))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] disabled:opacity-40 hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
                  >
                    <span>Next Kural</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Related Kurals */}
              {activeKural.relatedKurals.length > 0 && (
                <div className="pt-4 border-t border-[#DFCAA2]/60 dark:border-[#2A4163]">
                  <h3 className="text-xs font-semibold text-[#5C4F42] dark:text-[#CBBBA0] mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Related Kurals
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeKural.relatedKurals.map((relNum) => {
                      const rk = getKuralByNumber(relNum);
                      return (
                        <button
                          key={relNum}
                          onClick={() => setSelectedKuralNumber(relNum)}
                          className="p-3 rounded-lg border border-[#DFCAA2]/80 dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] text-left hover:border-[#C6A15B] cursor-pointer"
                        >
                          <p className="text-[11px] font-mono-tabular text-[#641E24] dark:text-[#C6A15B]">
                            Kural #{rk.number}
                          </p>
                          <p className="font-tamil text-xs font-semibold text-[#1F1914] dark:text-[#FBF4E4] line-clamp-1">
                            {rk.tamilLine1}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};
