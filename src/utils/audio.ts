/**
 * Universal Layered Web Audio Synthesizer
 * Zero external files required; 100% clean-room sound generation.
 * Conforms to UI Redesign Master Plan Section 6.
 */

export type SoundSetId = 'soft-tactile' | 'cream' | 'thock' | 'typewriter' | 'bubble' | 'silent';

export interface SoundSetDef {
  id: SoundSetId;
  name: string;
  bodyFreq: number; // Hz
  bodyDecay: number; // seconds
  bodyGain: number;
  clickFreq: number; // Hz
  clickDecay: number; // seconds
  clickGain: number;
  bottomOutCutoff: number; // Hz
  bottomOutGain: number;
}

export const SOUND_SETS: Record<SoundSetId, SoundSetDef> = {
  'soft-tactile': {
    id: 'soft-tactile',
    name: 'Soft Tactile (Default)',
    bodyFreq: 130,
    bodyDecay: 0.055,
    bodyGain: 0.22,
    clickFreq: 2800,
    clickDecay: 0.012,
    clickGain: 0.10,
    bottomOutCutoff: 750,
    bottomOutGain: 0.12,
  },
  'cream': {
    id: 'cream',
    name: 'Cream (Smooth & Damped)',
    bodyFreq: 110,
    bodyDecay: 0.065,
    bodyGain: 0.26,
    clickFreq: 1900,
    clickDecay: 0.008,
    clickGain: 0.06,
    bottomOutCutoff: 620,
    bottomOutGain: 0.14,
  },
  'thock': {
    id: 'thock',
    name: 'Thock (Deep & Resonant)',
    bodyFreq: 95,
    bodyDecay: 0.075,
    bodyGain: 0.32,
    clickFreq: 1500,
    clickDecay: 0.009,
    clickGain: 0.05,
    bottomOutCutoff: 550,
    bottomOutGain: 0.18,
  },
  'typewriter': {
    id: 'typewriter',
    name: 'Typewriter (Snappy Soft)',
    bodyFreq: 180,
    bodyDecay: 0.045,
    bodyGain: 0.18,
    clickFreq: 3400,
    clickDecay: 0.016,
    clickGain: 0.16,
    bottomOutCutoff: 900,
    bottomOutGain: 0.15,
  },
  'bubble': {
    id: 'bubble',
    name: 'Bubble (Playful)',
    bodyFreq: 260,
    bodyDecay: 0.06,
    bodyGain: 0.24,
    clickFreq: 3800,
    clickDecay: 0.01,
    clickGain: 0.08,
    bottomOutCutoff: 800,
    bottomOutGain: 0.10,
  },
  'silent': {
    id: 'silent',
    name: 'Silent (No Sound)',
    bodyFreq: 0,
    bodyDecay: 0,
    bodyGain: 0,
    clickFreq: 0,
    clickDecay: 0,
    clickGain: 0,
    bottomOutCutoff: 0,
    bottomOutGain: 0,
  },
};

class LayeredSoundEngine {
  private ctx: AudioContext | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private muted: boolean = false;
  private activeSoundSet: SoundSetId = 'soft-tactile';

  constructor() {
    try {
      const savedMute = localStorage.getItem('typing_trainer_muted');
      if (savedMute === 'true') this.muted = true;
      const savedSet = localStorage.getItem('typing_trainer_sound_set');
      if (savedSet && savedSet in SOUND_SETS) {
        this.activeSoundSet = savedSet as SoundSetId;
      }
    } catch {
      // ignore in environments without localStorage
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Master Chain: High-pass 60Hz -> Low-pass 7kHz -> Compressor -> Master Gain
        const highPass = this.ctx.createBiquadFilter();
        highPass.type = 'highpass';
        highPass.frequency.value = 60;

        const lowPass = this.ctx.createBiquadFilter();
        lowPass.type = 'lowpass';
        lowPass.frequency.value = 7000;

        this.masterCompressor = this.ctx.createDynamicsCompressor();
        this.masterCompressor.threshold.value = -18;
        this.masterCompressor.ratio.value = 3;

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.35; // Master default 35%

        highPass.connect(lowPass);
        lowPass.connect(this.masterCompressor);
        this.masterCompressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        // Precompute 1 second of white noise for fast layered bursts
        const bufferSize = this.ctx.sampleRate;
        this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    try {
      localStorage.setItem('typing_trainer_muted', String(muted));
    } catch {}
  }

  getSoundSet(): SoundSetId {
    return this.activeSoundSet;
  }

  setSoundSet(setId: SoundSetId) {
    if (setId in SOUND_SETS) {
      this.activeSoundSet = setId;
      try {
        localStorage.setItem('typing_trainer_sound_set', setId);
      } catch {}
    }
  }

  playKeystroke(
    _legacyProfile?: string,
    volume: number = 0.5,
    keyChar?: string
  ) {
    if (this.muted || volume <= 0 || this.activeSoundSet === 'silent') return;
    this.initCtx();
    if (!this.ctx || !this.masterCompressor || !this.noiseBuffer) return;

    const preset = SOUND_SETS[this.activeSoundSet] || SOUND_SETS['soft-tactile'];
    const now = this.ctx.currentTime;

    // Humanization factors: pitch +/- 4%, gain +/- 8%
    const pitchJitter = 1 + (Math.random() * 0.08 - 0.04);
    const gainJitter = 1 + (Math.random() * 0.16 - 0.08);
    const effectiveVol = Math.max(0.01, volume * gainJitter);

    const isSpace = keyChar === ' ' || keyChar === 'Space';
    const isEnter = keyChar === 'Enter';
    const isBack = keyChar === 'Backspace';

    // 1. Layer 1: Body (sine/triangle for warm "thock")
    let bodyFreq = preset.bodyFreq * pitchJitter;
    let bodyDecay = preset.bodyDecay;
    let bodyGainVal = preset.bodyGain * effectiveVol;

    if (isSpace) {
      bodyFreq = 75 * pitchJitter;
      bodyDecay = 0.09;
      bodyGainVal *= 1.3;
    } else if (isBack) {
      bodyDecay = 0.035;
      bodyGainVal *= 0.8;
    }

    const bodyOsc = this.ctx.createOscillator();
    bodyOsc.type = isEnter ? 'triangle' : 'sine';
    bodyOsc.frequency.setValueAtTime(bodyFreq, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(Math.max(20, bodyFreq * 0.5), now + bodyDecay);

    const bodyGain = this.ctx.createGain();
    bodyGain.gain.setValueAtTime(bodyGainVal, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + bodyDecay);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(this.masterCompressor);
    bodyOsc.start(now);
    bodyOsc.stop(now + bodyDecay + 0.01);

    // 2. Layer 2: Tactile Click (band-passed noise burst)
    const clickSource = this.ctx.createBufferSource();
    clickSource.buffer = this.noiseBuffer;

    const clickFilter = this.ctx.createBiquadFilter();
    clickFilter.type = 'bandpass';
    clickFilter.frequency.value = preset.clickFreq * pitchJitter;
    clickFilter.Q.value = 1.2;

    const clickGain = this.ctx.createGain();
    const clickDecay = isEnter ? preset.clickDecay * 1.4 : preset.clickDecay;
    clickGain.gain.setValueAtTime(preset.clickGain * effectiveVol, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + clickDecay);

    clickSource.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(this.masterCompressor);
    clickSource.start(now);
    clickSource.stop(now + clickDecay + 0.005);

    // 3. Layer 3: Bottom-Out (low-passed noise)
    const bottomSource = this.ctx.createBufferSource();
    bottomSource.buffer = this.noiseBuffer;

    const bottomFilter = this.ctx.createBiquadFilter();
    bottomFilter.type = 'lowpass';
    bottomFilter.frequency.value = preset.bottomOutCutoff;

    const bottomGain = this.ctx.createGain();
    const bottomDecay = 0.025;
    bottomGain.gain.setValueAtTime(preset.bottomOutGain * effectiveVol, now + 0.005);
    bottomGain.gain.exponentialRampToValueAtTime(0.0001, now + bottomDecay + 0.005);

    bottomSource.connect(bottomFilter);
    bottomFilter.connect(bottomGain);
    bottomGain.connect(this.masterCompressor);
    bottomSource.start(now + 0.005);
    bottomSource.stop(now + bottomDecay + 0.01);
  }

  // Soft low "thud" glide 140 -> 110 Hz, ~120 ms, gentle sine only
  playError(volume: number = 0.4) {
    if (this.muted || volume <= 0) return;
    this.initCtx();
    if (!this.ctx || !this.masterCompressor) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);

    gain.gain.setValueAtTime(volume * 0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterCompressor);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  // Gentle 3-note rising arpeggio (C5, E5, G5, sine, smooth attack/release)
  playSuccess() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterCompressor) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.1;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // 10ms attack, 400ms release
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.masterCompressor!);
      osc.start(startTime);
      osc.stop(startTime + 0.42);
    });
  }

  playWordPop() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterCompressor) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.07);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterCompressor);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playStreak(combo: number) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterCompressor) return;

    const now = this.ctx.currentTime;
    const baseFreq = Math.min(440 + combo * 35, 1100);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + 0.1);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterCompressor);
    osc.start(now);
    osc.stop(now + 0.13);
  }
}

export const soundEngine = new LayeredSoundEngine();
