// Stand-in audio: a soft generated melody per song plus vinyl crackle.
// No recordings are used. Replace this module with real playback
// (an <audio> element or a streaming SDK) and keep the same four methods.

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export class Sound {
  constructor() {
    this.ctx = null;
    this.timer = null;
    this.noise = null;
    this.muted = false;
  }

  ensure() {
    if (this.ctx) return true;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.value = this.muted ? 0 : 0.5;
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 2600;
      const delay = ctx.createDelay(1);
      delay.delayTime.value = 0.33;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.28;
      const wet = ctx.createGain();
      wet.gain.value = 0.35;
      const bus = ctx.createGain();
      bus.connect(lowpass);
      lowpass.connect(master);
      lowpass.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(wet);
      wet.connect(master);
      master.connect(ctx.destination);

      const len = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.012 + (Math.random() < 0.0006 ? (Math.random() * 2 - 1) * 0.5 : 0);
      }

      this.ctx = ctx;
      this.master = master;
      this.bus = bus;
      this.noiseBuffer = buffer;
      return true;
    } catch {
      return false;
    }
  }

  // Browsers only allow sound after a click, so call this from the click handler.
  unlock() {
    try {
      if (this.ensure() && this.ctx.state === 'suspended') this.ctx.resume();
    } catch {
      // no audio available
    }
  }

  setMuted(muted) {
    this.muted = muted;
    try {
      if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : 0.5, this.ctx.currentTime, 0.05);
    } catch {
      // no audio available
    }
  }

  // `seed` decides the key, scale, tempo and melody, so each song always sounds the same.
  play(seed) {
    this.stop();
    try {
      if (!this.ensure()) return;
      const ctx = this.ctx;
      if (ctx.state === 'suspended') ctx.resume();
      const random = mulberry32(hash(seed));
      const roots = [196, 220, 233.08, 261.63, 293.66, 174.61];
      const root = roots[Math.floor(random() * roots.length)];
      const scale = random() < 0.5 ? [0, 2, 4, 7, 9] : [0, 3, 5, 7, 10];
      const step = 0.42 + random() * 0.4;
      let degree = 5;
      let next = ctx.currentTime + 0.3;
      let beat = 0;

      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      noise.loop = true;
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 1200;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.5;
      noise.connect(highpass);
      highpass.connect(noiseGain);
      noiseGain.connect(this.master);
      noise.start();
      this.noise = noise;

      const frequency = (n) => root * Math.pow(2, (scale[((n % 5) + 5) % 5] + 12 * Math.floor(n / 5)) / 12);
      const note = (freq, when, volume, duration) => {
        const a = ctx.createOscillator();
        const b = ctx.createOscillator();
        const gain = ctx.createGain();
        const overtone = ctx.createGain();
        a.type = 'sine';
        a.frequency.value = freq;
        b.type = 'triangle';
        b.frequency.value = freq * 2.001;
        overtone.gain.value = 0.18;
        gain.gain.setValueAtTime(0.0001, when);
        gain.gain.exponentialRampToValueAtTime(volume, when + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
        a.connect(gain);
        b.connect(overtone);
        overtone.connect(gain);
        gain.connect(this.bus);
        a.start(when);
        b.start(when);
        a.stop(when + duration + 0.05);
        b.stop(when + duration + 0.05);
      };
      const schedule = () => {
        while (next < ctx.currentTime + 0.6) {
          if (beat % 8 === 0) note(frequency(Math.floor(random() * 3) - 5), next, 0.22, 3.2);
          if (random() < 0.72) {
            degree = Math.max(2, Math.min(12, degree + Math.floor(random() * 5) - 2));
            note(frequency(degree), next, 0.16, 2.2);
            if (random() < 0.18) note(frequency(degree + 2), next, 0.09, 2.2);
          }
          next += step;
          beat++;
        }
      };
      schedule();
      this.timer = setInterval(schedule, 200);
    } catch {
      // no audio available
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.noise) {
      try {
        this.noise.stop();
      } catch {
        // already stopped
      }
      this.noise = null;
    }
  }
}
