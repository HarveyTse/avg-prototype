/**
 * 应用入口 - 游戏主控制器
 * 对应原版的 AvgGame 主控
 */
class Game {
  constructor() {
    this.vars = new VariableStore();
    this.storage = new StorageManager();
    this.renderer = new Renderer();
    this.engine = new CommandEngine(this.renderer, this.vars);
    this.settings = {
      textSpeed: 5,
      autoSpeed: 5,
      bgmVol: 7,
      sfxVol: 7
    };

    this._bindEvents();
    this._loadSettings();
    this._initTitleScreen();
  }

  _bindEvents() {
    // 标题按钮
    document.getElementById('btn-new-game').addEventListener('click', () => this.newGame());
    document.getElementById('btn-continue').addEventListener('click', () => this.continueGame());
    document.getElementById('btn-about').addEventListener('click', () => this.showAbout());

    // 顶部按钮
    document.getElementById('btn-auto').addEventListener('click', (e) => this.toggleAuto(e.target));
    document.getElementById('btn-skip').addEventListener('click', (e) => this.toggleSkip(e.target));
    document.getElementById('btn-menu').addEventListener('click', () => this.showMenu());

    // 菜单按钮
    document.getElementById('menu-save').addEventListener('click', () => this.showSavePanel('save'));
    document.getElementById('menu-load').addEventListener('click', () => this.showSavePanel('load'));
    document.getElementById('menu-settings').addEventListener('click', () => this.showSettings());
    document.getElementById('menu-title').addEventListener('click', () => this.backToTitle());
    document.getElementById('menu-close').addEventListener('click', () => this.hideMenu());

    // 存档关闭
    document.getElementById('save-close').addEventListener('click', () => this.hideSavePanel());

    // 设置关闭
    document.getElementById('settings-close').addEventListener('click', () => this.hideSettings());

    // 设置滑块
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
      this.storage.saveSettings(this.settings);
    });
    document.getElementById('setting-sfx').addEventListener('input', (e) => {
      this.settings.sfxVol = parseInt(e.target.value);
      this.storage.saveSettings(this.settings);
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.toggleMenuByEsc();
      }
    });

    // 引擎回调
    this.engine.onSceneChange = (scene) => {
      this._updateUI();
    };

    this.engine.onVarsChange = (vars) => {
      this.renderer.updateStats(vars);
    };

    this.engine.onGameEnd = () => {
      this._showEndScreen();
    };

    this.engine.onShowTitle = () => {
      this.backToTitle();
    };
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
  }

  _initTitleScreen() {
    const hasSave = this.storage.hasAnySave();
    const btnContinue = document.getElementById('btn-continue');
    btnContinue.style.display = hasSave ? '' : 'none';
  }

  newGame() {
    document.getElementById('title-screen').classList.add('hidden');
    this.renderer.showStatusBar();

    // 初始化变量
    this.vars = new VariableStore();
    this.engine.vars = this.vars;
    this.vars.init(STORY_DATA.config);
    this.renderer.updateStats(this.vars.getAll());

    this.engine.loadStory(STORY_DATA);
    this.engine.startScene('scene_001');
  }

  continueGame() {
    const data = this.storage.loadAutoSave();
    if (!data) {
      this.newGame();
      return;
    }

    document.getElementById('title-screen').classList.add('hidden');
    this.renderer.showStatusBar();

    this.vars = new VariableStore();
    this.engine.vars = this.vars;
    this.vars.init(STORY_DATA.config);
    if (data.variables) this.vars.restore(data.variables);
    this.renderer.updateStats(this.vars.getAll());

    this.engine.loadStory(STORY_DATA);
    this.engine.restoreState(data);
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
    if (menu.classList.contains('hidden')) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }

  showSavePanel(mode) {
    document.getElementById('menu-overlay').classList.add('hidden');
    const overlay = document.getElementById('save-overlay');
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
        div.innerHTML = `
          <div class="save-slot-info">
            <div class="slot-title">存档 ${slotNum} - ${slotInfo.sceneName}</div>
            <div class="slot-detail">${slotInfo.date}</div>
          </div>
        `;
      } else {
        div.innerHTML = `
          <div class="save-slot-empty">存档 ${slotNum} - 空</div>
        `;
      }

      div.addEventListener('click', () => {
        if (mode === 'save') {
          this._doSave(slotNum);
          this.showSavePanel('save');
        } else {
          if (slotInfo) {
            this._doLoad(slotNum);
          }
        }
      });

      slotsContainer.appendChild(div);
    });

    overlay.classList.remove('hidden');
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

    // 自动存档
    if (this.engine.currentScene) {
      const state = this.engine.getState();
      this.storage.autoSave(state);
    }

    document.getElementById('title-screen').classList.remove('hidden');
    this._initTitleScreen();

    document.querySelectorAll('.top-btn').forEach(b => b.classList.remove('active'));
  }

  toggleAuto(btn) {
    const isAuto = btn.classList.toggle('active');
    this.engine.setAutoMode(isAuto, 4000 - this.settings.autoSpeed * 300);
    if (isAuto) {
      document.getElementById('btn-skip').classList.remove('active');
      this.engine.setSkipMode(false);
    }
  }

  toggleSkip(btn) {
    const isSkip = btn.classList.toggle('active');
    this.engine.setSkipMode(isSkip);
    if (isSkip) {
      document.getElementById('btn-auto').classList.remove('active');
      this.engine.setAutoMode(false);
    }
  }

  _updateUI() {
    const scene = this.engine.currentScene;
    if (scene) {
      this.renderer.updateStats(this.vars.getAll());
    }
  }

  _showEndScreen() {
    this.renderer.hideStatusBar();
    document.querySelectorAll('.top-btn').forEach(b => b.classList.remove('active'));
  }

  showAbout() {
    alert(
      '凤鸣九霄 - 互动剧情原型\n\n' +
      '这是一个学习参考项目，模仿易次元互动小说架构。\n\n' +
      '技术栈：纯 HTML/CSS/JS，命令解释器 + 场景管理器\n' +
      '剧情为原创内容，仅供学习交流。\n\n' +
      '操作方式：\n' +
      '- 点击屏幕推进对话\n' +
      '- 点击选项做出选择\n' +
      '- Auto: 自动播放\n' +
      '- Skip: 快进\n' +
      '- Menu: 打开菜单/存档'
    );
  }
}

// 启动
document.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
