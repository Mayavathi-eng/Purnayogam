import React, { useMemo, useState } from 'react';
import {
  Clock,
  Download,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';
import { AUDIO_CATEGORIES, AUDIO_TRACKS } from '../data/libraryAndMaps';
import { PageUtilityBar } from '../components/PageUtilityBar';
import { downloadAuthorizedStudyPdf } from '../lib/pdfGenerator';

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const AudioLibraryPage: React.FC = () => {
  const { lang, showToast } = useApp();
  const {
    playlist,
    currentTrack,
    isPlaying,
    currentTimeSec,
    playbackRate,
    volume,
    repeat,
    sleepMinutesLeft,
    playTrack,
    togglePlay,
    seekTo,
    skipBy,
    nextTrack,
    prevTrack,
    setPlaybackRate,
    setVolume,
    setRepeat,
    setSleepTimer,
  } = useAudio();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTracks = useMemo(() => {
    if (selectedCategory === 'all') return AUDIO_TRACKS;
    return AUDIO_TRACKS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const active = currentTrack || playlist[0];

  const handleDownloadTranscript = (track: typeof active) => {
    if (!track.downloadAllowed) {
      showToast('Download is restricted for this recording to preserve publishing rights.');
      return;
    }
    downloadAuthorizedStudyPdf({
      title: track.title,
      author: track.speaker,
      category: track.category,
      licenseNote: 'Authorized Free Audio Transcript — PURNA YOGAM',
      pages: [{ heading: 'Audio Transcript & Study Note', body: track.transcript }],
    });
    showToast('Authorized transcript PDF downloaded.');
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] dark:bg-[#0F1A2B]">
      <PageUtilityBar breadcrumb="Spiritual Audio Library" breadcrumbTa="ஆன்மிக ஒலிக் களஞ்சியம்" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="pb-6 border-b border-[#DFCAA2] dark:border-[#2A4163]">
          <p className="text-xs font-semibold text-[#641E24] dark:text-[#C6A15B] mb-1">
            ஆன்மிக ஒலிக் களஞ்சியம் · 9 AUDIO COLLECTIONS
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F1914] dark:text-[#FBF4E4]">
            {lang === 'ta' ? 'ஆன்மிக ஒலிக் களஞ்சியம்' : 'Spiritual Audio Sanctuary'}
          </h1>
        </div>

        {/* Studio Player Card */}
        <section className="rounded-2xl border border-[#C6A15B]/50 bg-[#172B45] text-[#FFF9ED] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <p className="text-xs text-[#D8BD91]">
                {active.category} · {active.language} · {active.speaker}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                {lang === 'ta' ? active.titleTa : active.title}
              </h2>
              <p className="text-sm text-[#EAE0CC] max-w-2xl leading-relaxed">{active.transcript}</p>
            </div>

            {/* Animated Waveform */}
            <div className="flex items-end gap-1.5 h-16 px-4 py-2 rounded-xl bg-[#0F1A2B]/60 shrink-0" aria-hidden="true">
              {[22, 38, 28, 52, 34, 46, 24, 56, 40, 30, 48, 20].map((h, i) => (
                <span
                  key={i}
                  style={{
                    height: isPlaying ? `${h}px` : '8px',
                    transitionDelay: `${i * 35}ms`,
                  }}
                  className="w-1.5 rounded-full bg-[#C6A15B] transition-all duration-300"
                />
              ))}
            </div>
          </div>

          {/* Seek Bar */}
          <div className="space-y-1.5">
            <input
              type="range"
              min={0}
              max={active.durationSec}
              value={currentTrack?.id === active.id ? currentTimeSec : 0}
              onChange={(e) => {
                if (!currentTrack || currentTrack.id !== active.id) playTrack(active, Number(e.target.value));
                else seekTo(Number(e.target.value));
              }}
              aria-label="Audio seek slider"
              className="w-full accent-[#C6A15B]"
            />
            <div className="flex justify-between text-xs font-mono-tabular text-[#D8BD91]">
              <span>{formatClock(currentTrack?.id === active.id ? currentTimeSec : 0)}</span>
              <span>{formatClock(active.durationSec)}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={prevTrack}
                className="p-2.5 rounded-lg border border-[#D8BD91]/30 hover:bg-white/10 cursor-pointer"
                aria-label="Previous track"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => skipBy(-15)}
                className="px-2.5 py-2 rounded-lg border border-[#D8BD91]/30 text-xs font-mono-tabular hover:bg-white/10 cursor-pointer"
              >
                -15s
              </button>
              <button
                onClick={() => (currentTrack?.id === active.id ? togglePlay() : playTrack(active))}
                className="w-12 h-12 rounded-full bg-[#C6A15B] text-[#0F1A2B] flex items-center justify-center hover:bg-[#d7b572] cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying && currentTrack?.id === active.id ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              <button
                onClick={() => skipBy(15)}
                className="px-2.5 py-2 rounded-lg border border-[#D8BD91]/30 text-xs font-mono-tabular hover:bg-white/10 cursor-pointer"
              >
                +15s
              </button>
              <button
                onClick={nextTrack}
                className="p-2.5 rounded-lg border border-[#D8BD91]/30 hover:bg-white/10 cursor-pointer"
                aria-label="Next track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={() => setPlaybackRate(playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1)}
                className="px-3 py-1.5 rounded-lg border border-[#D8BD91]/30 font-mono-tabular cursor-pointer"
              >
                Speed: {playbackRate}x
              </button>
              <button
                onClick={() => setRepeat(!repeat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer ${
                  repeat ? 'bg-[#C6A15B] text-[#0F1A2B] border-[#C6A15B]' : 'border-[#D8BD91]/30'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Repeat</span>
              </button>
              <button
                onClick={() =>
                  setSleepTimer(sleepMinutesLeft === null ? 15 : sleepMinutesLeft === 15 ? 30 : null)
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer ${
                  sleepMinutesLeft !== null ? 'bg-[#C6A15B] text-[#0F1A2B] border-[#C6A15B]' : 'border-[#D8BD91]/30'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{sleepMinutesLeft !== null ? `Sleep: ${sleepMinutesLeft}m` : 'Sleep Timer'}</span>
              </button>
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#D8BD91]" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="w-20 accent-[#C6A15B]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#F6ECD8] dark:bg-[#172B45] rounded-xl">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                : 'text-[#5C4F42] dark:text-[#CBBBA0]'
            }`}
          >
            All Categories ({AUDIO_TRACKS.length})
          </button>
          {AUDIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#641E24] text-[#FFF9ED] dark:bg-[#C6A15B] dark:text-[#0F1A2B]'
                  : 'text-[#5C4F42] dark:text-[#CBBBA0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Playlist Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                className={`rounded-xl border p-5 flex items-center justify-between gap-4 transition-colors ${
                  isCurrent
                    ? 'border-[#641E24] dark:border-[#C6A15B] bg-[#F6ECD8]/70 dark:bg-[#172B45]'
                    : 'border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7] dark:bg-[#172B45]'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">
                    {track.category} · {track.language} · {formatClock(track.durationSec)}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1F1914] dark:text-[#FBF4E4] truncate">
                    {lang === 'ta' ? track.titleTa : track.title}
                  </h3>
                  <p className="text-xs text-[#5C4F42] dark:text-[#CBBBA0]">{track.speaker}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {track.downloadAllowed && (
                    <button
                      onClick={() => handleDownloadTranscript(track)}
                      className="p-2 rounded-lg border border-[#DFCAA2] dark:border-[#2A4163] text-[#5C4F42] dark:text-[#CBBBA0] hover:border-[#C6A15B] cursor-pointer"
                      title="Download authorized transcript PDF"
                      aria-label="Download transcript"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => (isCurrent ? togglePlay() : playTrack(track))}
                    className="p-2.5 rounded-full bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] cursor-pointer"
                    aria-label={`Play ${track.title}`}
                  >
                    {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
