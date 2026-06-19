/**
 * 音频管理器 - 使用 Web Audio API 生成古风氛围音
 * 无需外部音乐文件，纯算法生成
 */
class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.bgmVolume = 0.7;
    this.sfxVolume = 0.8;
  }

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.connect(this.masterGain);
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio API 不可用');
    }
  }

  _resumeCtx() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  setBgmVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain) this.bgmGain.gain.value = this.bgmVolume * 0.15;
  }

  setSfxVolume(vol) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxGain) this.sfxGain.gain.value = this.sfxVolume * 0.3;
  }

  // 播放古风氛围 BGM（五声音阶 + 和声）
  playBgm() {
    if (!this.ctx || this.isPlaying) return;
    this._resumeCtx();
    this.isPlaying = true;

    // 五声音阶频率 (宫商角徵羽)
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];

    // 持续低音垫底
    const drone = this.ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 130.81; // 低音 C
    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0.06;
    drone.connect(droneGain);
    droneGain.connect(this.bgmGain);
    drone.start();
    this.oscillators.push(drone);

    // 随机旋律音符
    const playNote = () => {
      if (!this.isPlaying) return;
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, this.ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.5);
      env.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3);

      osc.connect(env);
      env.connect(this.bgmGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 3.5);

      // 随机间隔 2-5 秒
      setTimeout(playNote, 2000 + Math.random() * 3000);
    };
    playNote();

    // 第二声部（高八度，更稀疏）
    const playMelody = () => {
      if (!this.isPlaying) return;
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)] * 2;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, this.ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.8);
      env.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 4);

      osc.connect(env);
      env.connect(this.bgmGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 4.5);

      setTimeout(playMelody, 4000 + Math.random() * 6000);
    };
    setTimeout(playMelody, 2000);
  }

  stopBgm() {
    this.isPlaying = false;
    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.oscillators = [];
  }

  // 音效：点击声
  playClick() {
    if (!this.ctx) return;
    this._resumeCtx();
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 800;
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.3, this.ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(env);
    env.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  // 音效：翻页声
  playPage() {
    if (!this.ctx) return;
    this._resumeCtx();
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    source.connect(filter);
    filter.connect(this.sfxGain);
    source.start();
  }

  // 音效：选择确认声
  playSelect() {
    if (!this.ctx) return;
    this._resumeCtx();
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(659.25, this.ctx.currentTime + 0.1);
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.2, this.ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(env);
    env.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // 音效：场景转换声
  playTransition() {
    if (!this.ctx) return;
    this._resumeCtx();
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(261.63, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(392, this.ctx.currentTime + 0.5);
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.15, this.ctx.currentTime);
    env.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
    osc.connect(env);
    env.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 1);
  }

  // 音效：属性变化声
  playStatChange(positive = true) {
    if (!this.ctx) return;
    this._resumeCtx();
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    if (positive) {
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.15);
    } else {
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 0.15);
    }
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.15, this.ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(env);
    env.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  mute() { if (this.masterGain) this.masterGain.gain.value = 0; }
  unmute() { if (this.masterGain) this.masterGain.gain.value = 1; }
}

window.AudioManager = AudioManager;
