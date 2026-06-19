/**
 * 应用入口 - 游戏主控制器
 */
class Game {
  constructor() {
    this.vars = new VariableStore();
    this.storage = new StorageManager();
    this.renderer = new Renderer();
    this.audio = new AudioManager();
    this.engine = new CommandEngine(this.renderer, this.vars);
    this.settings = { textSpeed: 5, autoSpeed: 5, bgmVol: 7, sfxVol: 7 };

    this.audio.init();
    this._bindEvents();
    this._loadSettings();
    this._initTitleScreen();
  }

  _bindEvents() {
    document.getElementById('btn-new-game').addEventListener('click', () => {
      this.audio.playClick();
      this.newGame();
    });
    document.getElementById('btn-continue').addEventListener('click', () => {
      this.audio.playClick();
      this.continueGame();
    });
    document.getElementById('btn-about').addEventListener('click', () => {
      this.audio.playClick();
      this.showAbout();
    });
    document.getElementById('btn-auto').addEventListener('click', (e) => {
      this.audio.playClick();
      this.toggleAuto(e.target);
    });
    document.getElementById('btn-skip').addEventListener('click', (e) => {
      this.audio.playClick();
      this.toggleSkip(e.target);
    });
    document.getElementById('btn-menu').addEventListener('click', () => {
      this.audio.playClick();
      this.showMenu();
    });
    document.getElementById('menu-save').addEventListener('click', () => {
      this.audio.playClick();
      this.showSavePanel('save');
    });
    document.getElementById('menu-load').addEventListener('click', () => {
      this.audio.playClick();
      this.showSavePanel('load');
    });
    document.getElementById('menu-settings').addEventListener('click', () => {
      this.audio.playClick();
      this.showSettings();
    });
    document.getElementById('menu-title').addEventListener('click', () => {
      this.audio.playClick();
      this.backToTitle();
    });
    document.getElementById('menu-close').addEventListener('click', () => {
      this.audio.playClick();
      this.hideMenu();
    });
    document.getElementById('save-close').addEventListener('click', () => {
      this.audio.playClick();
      this.hideSavePanel();
    });
    document.getElementById('settings-close').addEventListener('click', () => {
      this.audio.playClick();
      this.hideSettings();
    });

    // 音量控制
    document.getElementById('setting-text-speed').addEventListener('input', (e) => {
      this.settings.textSpeed = parseInt(e.target.value);
      this.renderer.setTextSpeed(this.settings.textSpeed);
      this.storage.saveSettings(this.settings);
    });
    document.getElementById('setting-auto-speed').addEventListener('input', (e) => {
      this.settings.autoSpeed = parseInt(e.target.value);
      this.storage.saveSettings(this.settings);
    });
    document.getElementById('setting-bgm').addEventListener('input', (e) => {
      this.settings.bgmVol = parseInt(e.target.value);
      this.audio.setBgmVolume(this.settings.bgmVol / 10);
      this.storage.saveSettings(this.settings);
    });
    document.getElementById('setting-sfx').addEventListener('input', (e) => {
      this.settings.sfxVol = parseInt(e.target.value);
      this.audio.setSfxVolume(this.settings.sfxVol / 10);
      this.storage.saveSettings(this.settings);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.toggleMenuByEsc();
    });

    // 引擎回调
    this.engine.onSceneChange = (scene) => this._onSceneChange(scene);
    this.engine.onVarsChange = (vars) => this.renderer.updateStats(vars);
    this.engine.onGameEnd = () => {
      this.renderer.hideStatusBar();
      this.audio.stopBgm(2000);
      document.querySelectorAll('.top-btn').forEach(b => b.classList.remove('active'));
    };
    this.engine.onShowTitle = () => this.backToTitle();
  }

  _onSceneChange(scene) {
    this.renderer.updateStats(this.vars.getAll());
    // 根据场景切换背景音乐
    if (scene && scene.bgm) {
      this.audio.playBgm(scene.bgm);
    }
  }

  _loadSettings() {
    const saved = this.storage.loadSettings();
    if (saved) {
      this.settings = { ...this.settings, ...saved };
      document.getElementById('setting-text-speed').value = this.settings.textSpeed;
      document.getElementById('setting-auto-speed').value = this.settings.autoSpeed;
      document.getElementById('setting-bgm').value = this.settings.bgmVol;
      document.getElementById('setting-sfx').value = this.settings.sfxVol;
    }
    this.renderer.setTextSpeed(this.settings.textSpeed);
    this.audio.setBgmVolume(this.settings.bgmVol / 10);
    this.audio.setSfxVolume(this.settings.sfxVol / 10);
  }

  _initTitleScreen() {
    const hasSave = this.storage.hasAnySave();
    document.getElementById('btn-continue').style.display = hasSave ? '' : 'none';
  }

  newGame() {
    document.getElementById('title-screen').classList.add('hidden');
    this.renderer.showStatusBar();
    this.vars = new VariableStore();
    this.engine.vars = this.vars;
    this.vars.init(STORY_DATA.config);
    this.renderer.updateStats(this.vars.getAll());
    this.engine.loadStory(STORY_DATA);
    this.engine.startScene('scene_001');
    this.audio.playBgm();
  }

  continueGame() {
    const data = this.storage.loadAutoSave();
    if (!data) { this.newGame(); return; }
    document.getElementById('title-screen').classList.add('hidden');
    this.renderer.showStatusBar();
    this.vars = new VariableStore();
    this.engine.vars = this.vars;
    this.vars.init(STORY_DATA.config);
    if (data.variables) this.vars.restore(data.variables);
    this.renderer.updateStats(this.vars.getAll());
    this.engine.loadStory(STORY_DATA);
    this.engine.restoreState(data);
    this.audio.playBgm();
  }

  showMenu() {
    this.engine.pause();
    document.getElementById('menu-overlay').classList.remove('hidden');
  }

  hideMenu() {
    document.getElementById('menu-overlay').classList.add('hidden');
    this.engine.resume();
  }

  toggleMenuByEsc() {
    const menu = document.getElementById('menu-overlay');
    if (menu.classList.contains('hidden')) this.showMenu();
    else this.hideMenu();
  }

  showSavePanel(mode) {
    document.getElementById('menu-overlay').classList.add('hidden');
    const title = document.getElementById('save-panel-title');
    const slotsContainer = document.getElementById('save-slots');
    title.textContent = mode === 'save' ? '存 档' : '读 档';
    slotsContainer.innerHTML = '';
    const slots = this.storage.getAllSlots();
    slots.forEach((slotInfo, idx) => {
      const slotNum = idx + 1;
      const div = document.createElement('div');
      div.className = 'save-slot';
      if (slotInfo) {
        div.innerHTML = `<div class="save-slot-info"><div class="slot-title">存档 ${slotNum} - ${slotInfo.sceneName}</div><div class="slot-detail">${slotInfo.date}</div></div>`;
      } else {
        div.innerHTML = `<div class="save-slot-empty">存档 ${slotNum} - 空</div>`;
      }
      div.addEventListener('click', () => {
        if (mode === 'save') { this._doSave(slotNum); this.showSavePanel('save'); }
        else if (slotInfo) this._doLoad(slotNum);
      });
      slotsContainer.appendChild(div);
    });
    document.getElementById('save-overlay').classList.remove('hidden');
  }

  hideSavePanel() {
    document.getElementById('save-overlay').classList.add('hidden');
    document.getElementById('menu-overlay').classList.remove('hidden');
  }

  _doSave(slot) {
    const state = this.engine.getState();
    this.storage.save(slot, state);
    this.storage.autoSave(state);
  }

  _doLoad(slot) {
    const data = this.storage.load(slot);
    if (!data) return;
    document.getElementById('save-overlay').classList.add('hidden');
    document.getElementById('menu-overlay').classList.add('hidden');
    this.renderer.showStatusBar();
    this.vars = new VariableStore();
    this.engine.vars = this.vars;
    this.vars.init(STORY_DATA.config);
    if (data.variables) this.vars.restore(data.variables);
    this.renderer.updateStats(this.vars.getAll());
    this.engine.loadStory(STORY_DATA);
    this.engine.restoreState(data);
  }

  showSettings() {
    document.getElementById('menu-overlay').classList.add('hidden');
    document.getElementById('settings-overlay').classList.remove('hidden');
  }

  hideSettings() {
    document.getElementById('settings-overlay').classList.add('hidden');
    document.getElementById('menu-overlay').classList.remove('hidden');
  }

  backToTitle() {
    this.engine.isRunning = false;
    this.engine.setAutoMode(false);
    this.engine.setSkipMode(false);
    document.getElementById('menu-overlay').classList.add('hidden');
    document.getElementById('save-overlay').classList.add('hidden');
    document.getElementById('settings-overlay').classList.add('hidden');
    this.renderer.clear();
    this.renderer.hideStatusBar();
    this.renderer.clearBackground();
    if (this.engine.currentScene) {
      const state = this.engine.getState();
      this.storage.autoSave(state);
    }
    this.audio.stopBgm(1000);
    document.getElementById('title-screen').classList.remove('hidden');
    this._initTitleScreen();
    document.querySelectorAll('.top-btn').forEach(b => b.classList.remove('active'));
  }

  toggleAuto(btn) {
    const isAuto = btn.classList.toggle('active');
    this.engine.setAutoMode(isAuto, 4000 - this.settings.autoSpeed * 300);
    if (isAuto) { document.getElementById('btn-skip').classList.remove('active'); this.engine.setSkipMode(false); }
  }

  toggleSkip(btn) {
    const isSkip = btn.classList.toggle('active');
    this.engine.setSkipMode(isSkip);
    if (isSkip) { document.getElementById('btn-auto').classList.remove('active'); this.engine.setAutoMode(false); }
  }

  showAbout() {
    alert(
      '凤鸣九霄 - 互动剧情原型\n\n' +
      '基于易次元架构分析的互动小说引擎\n' +
      '纯 HTML/CSS/JS，无需服务器\n\n' +
      '操作方式：\n' +
      '· 点击屏幕任意位置推进对话\n' +
      '· 出现 ▼ 时点击继续\n' +
      '· 自动：自动播放\n' +
      '· 快进：跳过已读\n' +
      '· 菜单：存档/设置'
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();

  // 光标光晕跟随（带延迟拖尾）
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    const ease = 0.12; // 延迟系数，越小越拖尾

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      glowX += (mouseX - glowX) * ease;
      glowY += (mouseY - glowY) * ease;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
  }
});
