import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AUDIO_TRACKS, AudioTrack } from '../data/libraryAndMaps';
import {
  setDroneVolume,
  speakBilingual,
  startSacredDrone,
  stopSacredDrone,
  stopSpeaking,
} from '../lib/audioEngine';

interface AudioContextValue {
  playlist: AudioTrack[];
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTimeSec: number;
  playbackRate: number;
  volume: number;
  repeat: boolean;
  sleepMinutesLeft: number | null;
  playTrack: (track: AudioTrack, startSec?: number) => void;
  togglePlay: () => void;
  seekTo: (sec: number) => void;
  skipBy: (deltaSec: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaybackRate: (rate: number) => void;
  setVolume: (vol: number) => void;
  setRepeat: (rep: boolean) => void;
  setSleepTimer: (mins: number | null) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist] = useState<AudioTrack[]>(AUDIO_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolumeState] = useState(0.5);
  const [repeat, setRepeat] = useState(false);
  const [sleepMinutesLeft, setSleepMinutesLeft] = useState<number | null>(null);

  const stopAudioEngine = useCallback(() => {
    stopSacredDrone();
    stopSpeaking();
  }, []);

  const playTrack = useCallback(
    (track: AudioTrack, startSec = 0) => {
      setCurrentTrack(track);
      setCurrentTimeSec(startSec);
      setIsPlaying(true);
      startSacredDrone(volume * 0.25);
      speakBilingual(track.transcript, track.speechLang, playbackRate);
    },
    [playbackRate, volume]
  );

  const togglePlay = useCallback(() => {
    if (!currentTrack) {
      playTrack(playlist[0]);
      return;
    }
    if (isPlaying) {
      setIsPlaying(false);
      stopAudioEngine();
    } else {
      setIsPlaying(true);
      startSacredDrone(volume * 0.25);
      speakBilingual(currentTrack.transcript, currentTrack.speechLang, playbackRate);
    }
  }, [currentTrack, isPlaying, playTrack, playlist, playbackRate, stopAudioEngine, volume]);

  const closePlayer = useCallback(() => {
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTimeSec(0);
    setSleepMinutesLeft(null);
    stopAudioEngine();
  }, [stopAudioEngine]);

  const nextTrack = useCallback(() => {
    if (!currentTrack) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const next = playlist[(idx + 1) % playlist.length];
    playTrack(next, 0);
  }, [currentTrack, playlist, playTrack]);

  const prevTrack = useCallback(() => {
    if (!currentTrack) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const prev = playlist[(idx - 1 + playlist.length) % playlist.length];
    playTrack(prev, 0);
  }, [currentTrack, playlist, playTrack]);

  const seekTo = useCallback(
    (sec: number) => {
      if (!currentTrack) return;
      const clamped = Math.max(0, Math.min(currentTrack.durationSec, sec));
      setCurrentTimeSec(clamped);
    },
    [currentTrack]
  );

  const skipBy = useCallback(
    (deltaSec: number) => {
      if (!currentTrack) return;
      seekTo(currentTimeSec + deltaSec);
    },
    [currentTrack, currentTimeSec, seekTo]
  );

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    setDroneVolume(clamped * 0.25);
  }, []);

  // Playback progress timer
  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const timer = window.setInterval(() => {
      setCurrentTimeSec((prev) => {
        const next = prev + playbackRate;
        if (next >= currentTrack.durationSec) {
          if (repeat) {
            speakBilingual(currentTrack.transcript, currentTrack.speechLang, playbackRate);
            return 0;
          }
          setIsPlaying(false);
          stopAudioEngine();
          return currentTrack.durationSec;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, currentTrack, playbackRate, repeat, stopAudioEngine]);

  // Sleep timer countdown
  useEffect(() => {
    if (sleepMinutesLeft === null || !isPlaying) return;
    const id = window.setInterval(() => {
      setSleepMinutesLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          setIsPlaying(false);
          stopAudioEngine();
          return null;
        }
        return prev - 1;
      });
    }, 60000);
    return () => window.clearInterval(id);
  }, [sleepMinutesLeft, isPlaying, stopAudioEngine]);

  return (
    <AudioContext.Provider
      value={{
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
        setSleepTimer: setSleepMinutesLeft,
        closePlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used inside AudioProvider');
  return ctx;
}
