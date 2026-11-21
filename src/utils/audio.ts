/**
 * High-performance Web Audio API mechanical switch sound synthesizer.
 * Zero external audio files needed; generates tactile sound frequencies in real-time.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playKeystroke(profile: 'cherry-blue' | 'cherry-brown' | 'thock' | 'typewriter' | 'off', volume: number = 0.5) {
    if (profile === 'off' || volume <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const gainNode = this.ctx.createGain();
    gainNode.connect(this.ctx.destination);
    gainNode.gain.setValueAtTime(volume * 0.4, now);

    if (profile === 'cherry-blue') {
      // Crisp clicky switch: fast high frequency transient + brief spring ping
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.03);

      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (profile === 'cherry-brown') {
      // Tactile clack: medium frequencies, damped transient
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.04);

      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (profile === 'thock') {
      // Deep resonant Topre / lubed custom mechanical switch "thock"
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

      gainNode.gain.setValueAtTime(volume * 0.7, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (profile === 'typewriter') {
      // Snappy metallic hit
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gainNode.gain.setValueAtTime(volume * 0.5, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  }

  playError(volume: number = 0.5) {
    if (volume <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.setValueAtTime(130, now + 0.06);

    gainNode.gain.setValueAtTime(volume * 0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  playSuccess() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }
}

export const soundEngine = new SoundEngine();
