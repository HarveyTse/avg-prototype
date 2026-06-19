/**
 * 音频管理器 - 背景音乐 + 音效
 * 支持 BGM 淡入淡出、音效播放、音量控制
 */
class AudioManager {
  constructor() {
    this.bgm = null;
    this.bgmVolume = 0.7;
    this.sfxVolume = 0.8;
    this.isMuted = false;
    this.currentBgm = null;
    
    // 音效池
    this.sfxPool = {};
  }

  init() {
    // 创建 BGM 元素
    this.bgm = new Audio();
    this.bgm.loop = true;
    this.bgm.volume = this.bgmVolume;
  }

  setBgmVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgm) this.bgm.volume = this.bgmVolume;
  }

  setSfxVolume(vol) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  // 播放背景音乐
  playBgm(src, fadeTime = 1000) {
    if (!this.bgm || this.currentBgm === src) return;
    
    this.currentBgm = src;
    
    if (this.bgm.src && !this.bgm.paused) {
      // 淡出当前音乐
      this.bgm.style.transition = `opacity ${fadeTime/2}ms`;
      setTimeout(() => {
        this.bgm.src = src;
        this.bgm.volume = 0;
        this.bgm.play().catch(() => {});
        this._fadeIn(this.bgm, fadeTime/2);
      }, fadeTime/2);
    } else {
      this.bgm.src = src;
      this.bgm.play().catch(() => {});
    }
  }

  // 停止背景音乐
  stopBgm(fadeTime = 500) {
    if (!this.bgm || this.bgm.paused) return;
    this._fadeOut(this.bgm, fadeTime);
    this.currentBgm = null;
  }

  // 播放音效
  playSfx(src, volume = 1) {
    const audio = new Audio(src);
    audio.volume = this.sfxVolume * volume;
    audio.play().catch(() => {});
    // 播放完自动清理
    audio.onended = () => audio.src = '';
    return audio;
  }

  // 淡入效果
  _fadeIn(audio, duration) {
    const steps = 20;
    const stepTime = duration / steps;
    const targetVolume = this.bgmVolume;
    let current = 0;
    
    const timer = setInterval(() => {
      current++;
      audio.volume = (current / steps) * targetVolume;
      if (current >= steps) clearInterval(timer);
    }, stepTime);
  }

  // 淡出效果
  _fadeOut(audio, duration) {
    const steps = 20;
    const stepTime = duration / steps;
    const startVolume = audio.volume;
    let current = 0;
    
    const timer = setInterval(() => {
      current++;
      audio.volume = startVolume * (1 - current / steps);
      if (current >= steps) {
        clearInterval(timer);
        audio.pause();
      }
    }, stepTime);
  }

  mute() {
    this.isMuted = true;
    if (this.bgm) this.bgm.volume = 0;
  }

  unmute() {
    this.isMuted = false;
    if (this.bgm) this.bgm.volume = this.bgmVolume;
  }
}

window.AudioManager = AudioManager;
