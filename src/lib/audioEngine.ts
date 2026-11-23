// Client-side Web Audio + Speech Synthesis Engine for Kural recitation, meditation bell, and tanpura drone

let audioCtx: AudioContext | null = null;
let droneNodes: { oscs: OscillatorNode[]; gain: GainNode } | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextCtor) {
      audioCtx = new AudioContextCtor();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => undefined);
  }
  return audioCtx;
}

export function playTempleBell(volume = 0.25): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.001, now);
  master.gain.exponentialRampToValueAtTime(Math.max(0.02, volume), now + 0.03);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
  master.connect(ctx.destination);

  const partials = [528, 1056, 1584, 2112];
  partials.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const pGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    pGain.gain.setValueAtTime(1 / (idx + 1.2), now);
    osc.connect(pGain);
    pGain.connect(master);
    osc.start(now);
    osc.stop(now + 4.0);
  });
}

export function startSacredDrone(volume = 0.12): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  stopSacredDrone();

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.001, ctx.currentTime);
  master.gain.linearRampToValueAtTime(Math.min(0.3, Math.max(0.01, volume)), ctx.currentTime + 1.2);
  master.connect(ctx.destination);

  // Sa - Pa - Sa harmonic drone (C# / D drone frequencies)
  const freqs = [130.81, 196.0, 261.63];
  const oscs = freqs.map((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = i === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(f, ctx.currentTime);
    g.gain.setValueAtTime(i === 0 ? 0.45 : 0.25, ctx.currentTime);
    osc.connect(g);
    g.connect(master);
    osc.start();
    return osc;
  });

  droneNodes = { oscs, gain: master };
}

export function setDroneVolume(volume: number): void {
  const ctx = getAudioContext();
  if (!ctx || !droneNodes) return;
  droneNodes.gain.gain.setTargetAtTime(Math.min(0.3, Math.max(0.0, volume)), ctx.currentTime, 0.1);
}

export function stopSacredDrone(): void {
  if (!droneNodes) return;
  try {
    droneNodes.oscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore already stopped oscillator
      }
    });
    droneNodes.gain.disconnect();
  } catch {
    // Ignore cleanup errors
  }
  droneNodes = null;
}

export function speakBilingual(
  text: string,
  lang: 'ta' | 'en' = 'ta',
  rate = 0.9,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
  utterance.rate = Math.max(0.6, Math.min(1.6, rate));
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find((v) =>
    v.lang.toLowerCase().startsWith(lang === 'ta' ? 'ta' : 'en')
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
