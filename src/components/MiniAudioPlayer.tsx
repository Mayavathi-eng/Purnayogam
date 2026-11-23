import React from 'react';
import { Pause, Play, SkipBack, SkipForward, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useApp } from '../context/AppContext';

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const MiniAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTimeSec,
    playbackRate,
    togglePlay,
    skipBy,
    setPlaybackRate,
    closePlayer,
  } = useAudio();
  const { navigate, lang } = useApp();

  if (!currentTrack) return null;

  const pct = Math.min(100, Math.round((currentTimeSec / currentTrack.durationSec) * 100));

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 h-14 border-t border-[#DFCAA2] dark:border-[#2A4163] bg-[#FFFDF7]/95 dark:bg-[#172B45]/95 backdrop-blur-md px-4"
      role="region"
      aria-label="Audio Mini-Player"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-3">
        <button
          onClick={() => navigate('audio')}
          className="min-w-0 text-left flex items-center gap-3 cursor-pointer"
        >
          <div className="flex items-end gap-0.5 h-5 shrink-0" aria-hidden="true">
            {[10, 18, 12, 20, 14].map((h, i) => (
              <span
                key={i}
                style={{ height: isPlaying ? `${h}px` : '5px' }}
                className="w-1 bg-[#641E24] dark:bg-[#C6A15B] rounded-full transition-all duration-300"
              />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-[#1F1914] dark:text-[#FBF4E4] truncate">
              {lang === 'ta' ? currentTrack.titleTa : currentTrack.title}
            </p>
            <p className="text-[11px] text-[#5C4F42] dark:text-[#CBBBA0] font-mono-tabular truncate">
              {formatTime(currentTimeSec)} / {formatTime(currentTrack.durationSec)} · {pct}%
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => skipBy(-15)}
            className="p-2 rounded-lg text-[#5C4F42] dark:text-[#CBBBA0] hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
            aria-label="Rewind 15 seconds"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-[#641E24] dark:bg-[#C6A15B] text-[#FFF9ED] dark:text-[#0F1A2B] cursor-pointer"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => skipBy(15)}
            className="p-2 rounded-lg text-[#5C4F42] dark:text-[#CBBBA0] hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
            aria-label="Forward 15 seconds"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPlaybackRate(playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1)}
            className="hidden sm:inline-flex px-2 py-1 text-xs font-mono-tabular rounded border border-[#DFCAA2] dark:border-[#2A4163] text-[#1F1914] dark:text-[#FBF4E4] cursor-pointer"
          >
            {playbackRate}x
          </button>
          <button
            onClick={closePlayer}
            className="p-1.5 rounded-lg text-[#5C4F42] dark:text-[#CBBBA0] hover:bg-[#F6ECD8] dark:hover:bg-[#0F1A2B] cursor-pointer"
            aria-label="Close mini-player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
