// Web Audio API Sound Effects for Supercar Realism

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Realistic Supercar Engine Rev Sound (Twin-Turbo V8 / V10 Roar)
export function playEngineRevSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Master Gain
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.01, now);
  master.gain.exponentialRampToValueAtTime(0.35, now + 0.15);
  master.gain.exponentialRampToValueAtTime(0.4, now + 0.6);
  master.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
  master.connect(ctx.destination);

  // Lowpass filter simulating exhaust muffler
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(180, now);
  filter.frequency.exponentialRampToValueAtTime(950, now + 0.5);
  filter.frequency.exponentialRampToValueAtTime(250, now + 1.6);
  filter.connect(master);

  // Distortion / saturation
  const distortion = ctx.createWaveShaper();
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  const k = 50;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  distortion.curve = curve;
  distortion.oversample = "4x";
  distortion.connect(filter);

  // Primary V8 Engine Fundamental Oscillator (Sawtooth)
  const osc1 = ctx.createOscillator();
  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(55, now);
  osc1.frequency.exponentialRampToValueAtTime(260, now + 0.5);
  osc1.frequency.exponentialRampToValueAtTime(70, now + 1.6);
  osc1.connect(distortion);

  // Sub-harmonic rumble (Square wave)
  const osc2 = ctx.createOscillator();
  osc2.type = "square";
  osc2.frequency.setValueAtTime(27.5, now);
  osc2.frequency.exponentialRampToValueAtTime(130, now + 0.5);
  osc2.frequency.exponentialRampToValueAtTime(35, now + 1.6);
  osc2.connect(distortion);

  // High-pitch Turbocharger Whistle (Sine wave)
  const turbo = ctx.createOscillator();
  const turboGain = ctx.createGain();
  turbo.type = "sine";
  turbo.frequency.setValueAtTime(900, now);
  turbo.frequency.exponentialRampToValueAtTime(2400, now + 0.5);
  turbo.frequency.exponentialRampToValueAtTime(1200, now + 1.4);
  turboGain.gain.setValueAtTime(0.001, now);
  turboGain.gain.exponentialRampToValueAtTime(0.04, now + 0.4);
  turboGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
  turbo.connect(turboGain);
  turboGain.connect(master);

  osc1.start(now);
  osc2.start(now);
  turbo.start(now);

  osc1.stop(now + 1.8);
  osc2.stop(now + 1.8);
  turbo.stop(now + 1.8);
}

// 2. Car Horn Beep for Remote GPS Locator
export function playHornSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = "triangle";
  osc2.type = "sawtooth";
  osc1.frequency.setValueAtTime(410, now); // Standard dual horn frequency
  osc2.frequency.setValueAtTime(510, now);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.setValueAtTime(0.15, now + 0.25);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.28);

  // Second beep
  gain.gain.setValueAtTime(0.15, now + 0.38);
  gain.gain.setValueAtTime(0.15, now + 0.65);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.7);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.75);
  osc2.stop(now + 0.75);
}

// 3. Remote Door Lock / Chirp
export function playLockChirp(isLock = true) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  if (isLock) {
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.setValueAtTime(2200, now + 0.05);
  } else {
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.setValueAtTime(1800, now + 0.05);
  }

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

