import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Download,
  ExternalLink,
  FileText,
  Headphones,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Printer,
  Radio,
  RotateCcw,
  Video,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ChapterInfo, IyalInfo, KuralItem, PaalInfo } from '../data/thirukkural';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import {
  speakBilingual,
  startSacredDrone,
  stopSacredDrone,
  stopSpeaking,
} from '../lib/audioEngine';
import { downloadChapterKuralPdf, downloadKuralPdf } from '../lib/pdfGenerator';
import { MandalaMotif } from './SacredMotifs';

export type KuralMediaTab = 'audio' | 'video' | 'pdf';

interface KuralMediaStudioProps {
  kural: KuralItem;
  chapter: ChapterInfo;
  paal?: PaalInfo;
  iyal?: IyalInfo;
  chapterKurals: KuralItem[];
  activeTab: KuralMediaTab;
  onTabChange: (tab: KuralMediaTab) => void;
}

function getSafeHttpsUrl(raw?: string): string | null {
  if (!raw || typeof raw !== 'string') return null;
  try {
    const parsed = new URL(raw.trim());
    if (parsed.protocol === 'https:') return parsed.toString();
    return null;
  } catch {
    return null;
  }
}

function getEmbedVideoInfo(raw?: string): { type: 'iframe' | 'video'; src: string } | null {
  const safe = getSafeHttpsUrl(raw);
  if (!safe) return null;
  try {
    const u = new URL(safe);
    const host = u.hostname.toLowerCase();

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      let videoId = '';
      if (host.includes('youtu.be')) {
        videoId = u.pathname.replace(/^\//, '').split('/')[0];
      } else if (u.pathname.startsWith('/embed/')) {
        videoId = u.pathname.replace('/embed/', '').split('/')[0];
      } else {
        videoId = u.searchParams.get('v') || '';
      }
      if (/^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
        return {
          type: 'iframe',
          src: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
        };
      }
    }

    if (host.includes('vimeo.com')) {
      const id = u.pathname.replace(/^\//, '').split('/').pop() || '';
      if (/^[0-9]{5,15}$/.test(id)) {
        return {
          type: 'iframe',
          src: `https://player.vimeo.com/video/${id}`,
        };
      }
    }

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(u.pathname)) {
      return { type: 'video', src: safe };
    }
    return null;
  } catch {
    return null;
  }
}

export const KuralMediaStudio: React.FC<KuralMediaStudioProps> = ({
  kural,
  chapter,
  paal,
  iyal,
  chapterKurals,
  activeTab,
  onTabChange,
}) => {
  const { lang, showToast } = useApp();
  const { playTrack } = useAudio();

  // Audio studio state
  const [audioMode, setAudioMode] = useState<'couplet' | 'bilingual' | 'chapter'>('couplet');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioRate, setAudioRate] = useState<number>(0.9);
  const [droneEnabled, setDroneEnabled] = useState<boolean>(true);
  const [chapterSeqIdx, setChapterSeqIdx] = useState<number>(0);

  // Video visual-discourse player state (28s 4-scene discourse per Kural)
  const VIDEO_TOTAL_SEC = 28;
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoSec, setVideoSec] = useState(0);
  const [subtitleMode, setSubtitleMode] = useState<'bilingual' | 'ta' | 'en'>('bilingual');
  const [videoVoiceOn, setVideoVoiceOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoSourceMode, setVideoSourceMode] = useState<'external' | 'visual'>('external');
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const safeAudioUrl = useMemo(() => getSafeHttpsUrl(kural.audioUrl), [kural.audioUrl]);
  const safePdfUrl = useMemo(() => getSafeHttpsUrl(kural.pdfUrl), [kural.pdfUrl]);
  const embedVideo = useMemo(() => getEmbedVideoInfo(kural.videoUrl), [kural.videoUrl]);

  // Stop active synthesis when Kural changes
  useEffect(() => {
    setAudioPlaying(false);
    setVideoPlaying(false);
    setVideoSec(0);
    setChapterSeqIdx(0);
    setVideoSourceMode(embedVideo ? 'external' : 'visual');
    stopSpeaking();
    stopSacredDrone();
  }, [kural.number, embedVideo]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      stopSacredDrone();
    };
  }, []);

  // Video visual discourse timer
  useEffect(() => {
    if (!videoPlaying) return;
    const id = window.setInterval(() => {
      setVideoSec((prev) => {
        if (prev + 0.5 >= VIDEO_TOTAL_SEC) {
          setVideoPlaying(false);
          stopSpeaking();
          stopSacredDrone();
          return VIDEO_TOTAL_SEC;
        }
        return prev + 0.5;
      });
    }, 500);
    return () => window.clearInterval(id);
  }, [videoPlaying]);

  const stopAllStudioMedia = () => {
    setAudioPlaying(false);
    setVideoPlaying(false);
    stopSpeaking();
    stopSacredDrone();
  };

  const playAudioSequence = (seqIndex = 0) => {
    if (audioMode === 'chapter') {
      const target = chapterKurals[seqIndex];
      if (!target) {
        stopAllStudioMedia();
        setChapterSeqIdx(0);
        return;
      }
      setChapterSeqIdx(seqIndex);
      setAudioPlaying(true);
      if (droneEnabled) startSacredDrone(0.11);
      const speech =
        lang === 'ta'
          ? `குறள் ${target.number}. ${target.tamilLine1} ${target.tamilLine2}. ${target.tamilCommentary}`
          : `Kural ${target.number}. ${target.tamilLine1} ${target.tamilLine2}. ${target.englishTranslation}`;
      const ok = speakBilingual(speech, lang, audioRate, () => {
        if (seqIndex + 1 < chapterKurals.length) {
          playAudioSequence(seqIndex + 1);
        } else {
          stopAllStudioMedia();
          setChapterSeqIdx(0);
        }
      });
      if (!ok) {
        stopAllStudioMedia();
        showToast('Speech synthesis unavailable in this browser.');
      }
      return;
    }

    const speechText =
      audioMode === 'couplet'
        ? `${kural.tamilLine1} ${kural.tamilLine2}`
        : `${kural.tamilLine1} ${kural.tamilLine2}. ${kural.englishTranslation}. ${kural.englishExplanation}`;
    const speechLang = audioMode === 'couplet' ? 'ta' : lang;
    setAudioPlaying(true);
    if (droneEnabled) startSacredDrone(0.11);
    const ok = speakBilingual(speechText, speechLang, audioRate, () => {
      stopAllStudioMedia();
    });
    if (!ok) {
      stopAllStudioMedia();
      showToast('Speech synthesis unavailable in this browser.');
    }
  };

  const handleToggleAudio = () => {
    if (audioPlaying) {
      stopAllStudioMedia();
    } else {
      setVideoPlaying(false);
      playAudioSequence(0);
    }
  };

  const handleSendToMiniPlayer = () => {
    stopAllStudioMedia();
    playTrack({
      id: `kural-track-${kural.number}`,
      category: 'Thirukkural Recitation',
      title: `Kural #${kural.number} · ${chapter.english}`,
      titleTa: `திருக்குறள் #${kural.number} · ${chapter.tamil}`,
      speaker: kural.commentaryAuthor,
      durationSec: 45,
      language: 'Bilingual',
      downloadAllowed: true,
      speechLang: lang,
      transcript: `${kural.tamilLine1} ${kural.tamilLine2}. ${
        lang === 'ta' ? kural.tamilCommentary : kural.englishTranslation
      }`,
      isSampleContent: !kural.isAuthenticVerified,
    });
    showToast(
      lang === 'ta'
        ? `குறள் #${kural.number} மினி பிளேயரில் இயக்கப்படுகிறது`
        : `Playing Kural #${kural.number} in mini-player`
    );
  };

  const handleToggleVisualVideo = () => {
    if (videoPlaying) {
      stopAllStudioMedia();
      return;
    }
    setAudioPlaying(false);
    const startFrom = videoSec >= VIDEO_TOTAL_SEC ? 0 : videoSec;
    if (videoSec >= VIDEO_TOTAL_SEC) setVideoSec(0);
    setVideoPlaying(true);

    if (videoVoiceOn) {
      startSacredDrone(0.1);
      const narration =
        subtitleMode === 'ta'
          ? `குறள் ${kural.number}. ${kural.tamilLine1} ${kural.tamilLine2}. ${kural.wordByWordTa}. ${kural.tamilCommentary}`
          : subtitleMode === 'en'
          ? `Thirukkural ${kural.number}, ${chapter.english}. ${kural.englishTranslation}. ${kural.englishExplanation}`
          : `குறள் ${kural.number}. ${kural.tamilLine1} ${kural.tamilLine2}. ${kural.englishTranslation}. ${kural.englishExplanation}`;
      speakBilingual(narration, subtitleMode === 'en' ? 'en' : 'ta', 0.88);
    } else if (startFrom === 0) {
      startSacredDrone(0.1);
    }
  };

  const handleToggleFullscreen = async () => {
    const el = videoContainerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      showToast('Fullscreen mode is restricted by the browser frame.');
    }
  };

  const chapterMeta = useMemo(
    () => ({
      number: chapter.number,
      tamil: chapter.tamil,
      english: chapter.english,
      paalTa: paal?.tamil || '',
      paalEn: paal?.english || '',
      iyalTa: iyal?.tamil || '',
      iyalEn: iyal?.english || '',
    }),
    [chapter, paal, iyal]
  );

  const handleDownloadKuralPdf = () => {
    try {
      downloadKuralPdf(kural, chapterMeta);
      showToast(
        lang === 'ta'
          ? `குறள் #${kural.number} PDF பதிவிறக்கம் செய்யப்பட்டது`
          : `Downloaded Kural #${kural.number} Study Sheet PDF`
      );
    } catch {
      showToast('Unable to generate PDF in this browser.');
    }
  };

  const handleDownloadChapterPdf = () => {
    try {
      downloadChapterKuralPdf(chapterMeta, chapterKurals);
      showToast(
        lang === 'ta'
          ? `அதிகாரம் ${chapter.number} முழு PDF பதிவிறக்கம் செய்யப்பட்டது`
          : `Downloaded Chapter ${chapter.number} (10 Kurals) PDF`
      );
    } catch {
      showToast('Unable to generate Chapter PDF in this browser.');
    }
  };

  const sceneIndex = videoSec < 7 ? 0 : videoSec < 14 ? 1 : videoSec < 21 ? 2 : 3;

  return (
    <section
      aria-label="Thirukkural Audio Video and PDF Studio"
      className="rounded-xl border border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFF9ED] dark:bg-[#0F1A2B] overflow-hidden"
    >
      {/* Switcher Header */}
      <div className="px-4 py-3 border-b border-[#DFCAA2] dark:border-[#2A4163] bg-[#F6ECD8]/70 dark:bg-[#15243A] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]">
          <span>MULTIMEDIA &amp; STUDY STUDIO · KURAL #{kural.number}</span>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#FFF9ED] dark:bg-[#0F1A2B] border border-[#DFCAA2]/80 dark:border-[#2A4163]">
          {(
            [
              ['audio', lang === 'ta' ? 'ஒலி (Audio)' : 'Audio', Headphones],
              ['video', lang === 'ta' ? 'காணொளி (Video)' : 'Video', Video],
              ['pdf', 'PDF', FileText],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === key
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'text-[#5C4F42] dark:text-[#CBBBA0] hover:text-[#1F1914] dark:hover:text-[#FBF4E4]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: AUDIO STUDIO */}
      {activeTab === 'audio' && (
        <div className="p-5 sm:p-6 space-y-5">
          {safeAudioUrl && (
            <div className="p-4 rounded-xl border border-[#C6A15B]/60 bg-[#FFFDF7] dark:bg-[#172B45] space-y-2">
              <p className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]">
                Curated Studio Recording · Kural #{kural.number}
              </p>
              <audio controls preload="metadata" src={safeAudioUrl} className="w-full h-10" />
            </div>
          )}

          <div className="rounded-xl bg-[#172B45] text-[#FFF9ED] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className="w-12 h-12 rounded-full bg-[#C6A15B] text-[#0F1A2B] flex items-center justify-center hover:bg-[#d6b470] cursor-pointer shrink-0"
                  aria-label={audioPlaying ? 'Pause Kural audio' : 'Play Kural audio'}
                >
                  {audioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <p className="text-sm font-semibold">
                    {audioMode === 'chapter'
                      ? `Chapter ${chapter.number} Sequential Recitation (${chapterSeqIdx + 1}/10)`
                      : audioMode === 'bilingual'
                      ? `Bilingual Recitation & Meaning · Kural #${kural.number}`
                      : `Classical Tamil Recitation · Kural #${kural.number}`}
                  </p>
                  <p className="text-xs text-[#D8BD91]">
                    {audioPlaying ? 'Reciting with calm cadence...' : 'Tap Play for Tamil & Bilingual voice recitation'}
                  </p>
                </div>
              </div>

              {/* Waveform visual */}
              <div className="flex items-end gap-1 h-7" aria-hidden="true">
                {[12, 22, 16, 26, 18, 24, 14, 20].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: audioPlaying ? `${h}px` : '6px' }}
                    className="w-1.5 rounded-full bg-[#C6A15B] transition-all duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Audio Mode & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D8BD91]/20 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    ['couplet', 'Tamil Couplet'],
                    ['bilingual', 'Bilingual + Meaning'],
                    ['chapter', 'Full Chapter (10 Kurals)'],
                  ] as const
                ).map(([m, label]) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      stopAllStudioMedia();
                      setAudioMode(m);
                    }}
                    className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
                      audioMode === m
                        ? 'bg-[#C6A15B] text-[#0F1A2B]'
                        : 'bg-[#0F1A2B]/60 text-[#D8BD91] hover:bg-[#0F1A2B]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDroneEnabled((d) => !d)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded border cursor-pointer ${
                    droneEnabled
                      ? 'border-[#C6A15B] text-[#C6A15B]'
                      : 'border-[#D8BD91]/30 text-[#D8BD91]/70'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Drone {droneEnabled ? 'On' : 'Off'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setAudioRate((r) => (r === 0.75 ? 0.9 : r === 0.9 ? 1.0 : r === 1.0 ? 1.25 : 0.75))
                  }
                  className="px-2.5 py-1.5 rounded border border-[#D8BD91]/40 font-mono-tabular cursor-pointer"
                >
                  {audioRate}x
                </button>
                <button
                  type="button"
                  onClick={handleSendToMiniPlayer}
                  className="px-3 py-1.5 rounded bg-[#641E24] text-[#FFF9ED] font-semibold hover:bg-[#7d2830] cursor-pointer"
                >
                  Pin to Mini-Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VIDEO DISCOURSE & VISUAL RECITATION */}
      {activeTab === 'video' && (
        <div className="p-5 sm:p-6 space-y-4">
          {embedVideo && (
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]">
                Video Mode
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setVideoSourceMode('external')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                    videoSourceMode === 'external'
                      ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                      : 'border border-[#DFCAA2] dark:border-[#2A4163]'
                  }`}
                >
                  Curated Video Discourse
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSourceMode('visual')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                    videoSourceMode === 'visual'
                      ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                      : 'border border-[#DFCAA2] dark:border-[#2A4163]'
                  }`}
                >
                  Interactive Visual Verse
                </button>
              </div>
            </div>
          )}

          {embedVideo && videoSourceMode === 'external' ? (
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#C6A15B]/50 bg-[#0F1A2B]">
              {embedVideo.type === 'iframe' ? (
                <iframe
                  src={embedVideo.src}
                  title={`Thirukkural #${kural.number} Video Discourse`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls src={embedVideo.src} className="w-full h-full object-contain" />
              )}
            </div>
          ) : (
            <div
              ref={videoContainerRef}
              className="rounded-xl overflow-hidden border border-[#C6A15B]/60 bg-gradient-to-br from-[#2B1216] via-[#172B45] to-[#0F1A2B] text-[#FFF9ED]"
            >
              {/* 16:9 Sacred Visual Stage */}
              <div className="relative aspect-video p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
                {/* Ambient Rotating Mandala */}
                <div className="pointer-events-none absolute -right-20 -bottom-24 w-72 h-72 opacity-15 text-[#C6A15B]">
                  <MandalaMotif slowSpin />
                </div>

                {/* Top Metadata Strip */}
                <div className="relative z-10 flex items-center justify-between text-xs text-[#D8BD91]">
                  <span className="font-mono-tabular font-semibold tracking-wide">
                    THIRUKKURAL #{kural.number} · {chapter.tamil} ({chapter.english})
                  </span>
                  <span className="font-mono-tabular">
                    Scene {sceneIndex + 1}/4
                  </span>
                </div>

                {/* Dynamic Synchronized Content */}
                <div className="relative z-10 my-auto max-w-2xl mx-auto text-center space-y-4">
                  {sceneIndex === 0 && (
                    <>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B]">
                        மந்திரப் பாராயணம் · Sacred Couplet
                      </p>
                      <p className="font-tamil text-xl sm:text-3xl font-bold text-[#FFF9ED] leading-relaxed">
                        {kural.tamilLine1}
                        <br />
                        {kural.tamilLine2}
                      </p>
                      {kural.transliteration && (
                        <p className="text-xs sm:text-sm italic text-[#D8BD91]">
                          {kural.transliteration}
                        </p>
                      )}
                    </>
                  )}

                  {sceneIndex === 1 && (
                    <>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B]">
                        பதவுரை · Word-by-Word Breakdown
                      </p>
                      <p className="font-tamil text-base sm:text-xl font-medium text-[#FFF9ED] leading-relaxed">
                        {kural.wordByWordTa}
                      </p>
                    </>
                  )}

                  {sceneIndex === 2 && (
                    <>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B]">
                        {subtitleMode === 'ta' ? 'தமிழ் விளக்கவுரை' : 'English Translation'}
                      </p>
                      {subtitleMode !== 'ta' && (
                        <p className="font-serif-editorial text-lg sm:text-2xl italic text-[#FFF9ED] leading-relaxed">
                          “{kural.englishTranslation}”
                        </p>
                      )}
                      {subtitleMode !== 'en' && (
                        <p className="font-tamil text-sm sm:text-base text-[#D8BD91] leading-relaxed">
                          {kural.tamilCommentary}
                        </p>
                      )}
                    </>
                  )}

                  {sceneIndex === 3 && (
                    <>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B]">
                        ஞானச் சிந்தனை · Philosophical Reflection
                      </p>
                      <p className="text-sm sm:text-lg text-[#FFF9ED] leading-relaxed">
                        {subtitleMode === 'ta' ? kural.tamilCommentary : kural.englishExplanation}
                      </p>
                    </>
                  )}
                </div>

                {/* Subtitle Bar */}
                <div className="relative z-10 text-center">
                  <p className="inline-block px-3 py-1 rounded bg-black/45 text-[11px] sm:text-xs text-[#FBF4E4] max-w-xl truncate">
                    {subtitleMode === 'ta'
                      ? `${kural.tamilLine1} ${kural.tamilLine2}`
                      : kural.englishTranslation}
                  </p>
                </div>
              </div>

              {/* Video Transport Controls */}
              <div className="px-4 py-3 bg-[#0F1A2B]/90 border-t border-[#C6A15B]/30 space-y-2.5">
                <input
                  type="range"
                  min={0}
                  max={VIDEO_TOTAL_SEC}
                  step={0.5}
                  value={videoSec}
                  onChange={(e) => setVideoSec(Number(e.target.value))}
                  aria-label="Visual discourse progress"
                  className="w-full accent-[#C6A15B]"
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleVisualVideo}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C6A15B] text-[#0F1A2B] font-semibold cursor-pointer"
                    >
                      {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{videoPlaying ? 'Pause' : 'Play Video'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        stopAllStudioMedia();
                        setVideoSec(0);
                      }}
                      className="p-1.5 rounded border border-[#D8BD91]/30 text-[#D8BD91] cursor-pointer"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono-tabular text-[#D8BD91]">
                      0:{String(Math.floor(videoSec)).padStart(2, '0')} / 0:{VIDEO_TOTAL_SEC}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVideoVoiceOn((v) => !v)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#D8BD91]/30 text-[#D8BD91] cursor-pointer"
                    >
                      {videoVoiceOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                      <span>{videoVoiceOn ? 'Narration' : 'Muted'}</span>
                    </button>
                    <select
                      value={subtitleMode}
                      onChange={(e) => setSubtitleMode(e.target.value as 'bilingual' | 'ta' | 'en')}
                      aria-label="Subtitle language"
                      className="px-2 py-1 rounded bg-[#172B45] border border-[#D8BD91]/30 text-[#FFF9ED] text-xs"
                    >
                      <option value="bilingual">Bilingual Subtitles</option>
                      <option value="ta">தமிழ் மட்டும்</option>
                      <option value="en">English Only</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleToggleFullscreen}
                      className="p-1.5 rounded border border-[#D8BD91]/30 text-[#D8BD91] cursor-pointer"
                      aria-label="Toggle fullscreen"
                    >
                      {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PDF STUDY SHEET & CHAPTER COMPENDIUM */}
      {activeTab === 'pdf' && (
        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4]">
                Bilingual Study PDF &amp; Printable Manuscript
              </h3>
              <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                Generates authentic Tamil + English A4 study sheets directly for offline contemplation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadKuralPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] text-xs font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Kural #{kural.number} PDF</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadChapterPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#314B3B] text-[#FFF9ED] text-xs font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Chapter {chapter.number} PDF (10 Kurals)</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-xs font-medium cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              {safePdfUrl && (
                <a
                  href={safePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#C6A15B] text-xs font-semibold text-[#641E24] dark:text-[#D4B16E]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Curated External PDF</span>
                </a>
              )}
            </div>
          </div>

          {/* A4 Manuscript Preview Card */}
          <div className="rounded-xl border-2 border-[#C6A15B]/70 bg-[#FFFDF7] text-[#1F1914] p-6 space-y-4">
            <div className="border-b border-[#DFCAA2] pb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C4F42]">
              <span className="font-semibold text-[#641E24]">
                PURNA YOGAM · A4 STUDY SHEET PREVIEW
              </span>
              <span className="font-mono-tabular">
                {paal?.tamil} · அதிகாரம் {chapter.number} · குறள் #{kural.number}
              </span>
            </div>
            <p className="font-tamil text-lg sm:text-xl font-bold text-[#641E24]">
              {kural.tamilLine1}
              <br />
              {kural.tamilLine2}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div>
                <p className="font-semibold text-[#641E24] mb-1">பதவுரை &amp; விளக்கவுரை</p>
                <p className="font-tamil text-[#3E352D]">{kural.tamilCommentary}</p>
              </div>
              <div>
                <p className="font-semibold text-[#172B45] mb-1">English Translation</p>
                <p className="italic text-[#172B45]">“{kural.englishTranslation}”</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
