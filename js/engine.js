/**
 * 命令解释器 + 场景管理器
 * 对应原版的 AvgEngine 命令系统
 *
 * 支持的命令类型：
 * - text: 显示对话/旁白
 * - bg: 切换背景
 * - option: 创建选项分支
 * - condition: 条件分支
 * - jump: 跳转场景
 * - set: 设置变量
 * - modify: 修改变量
 * - wait: 等待
 * - transition: 过渡效果
 * - ui: 显示UI
 * - end: 结束场景
 * - title: 回到标题
 */
class CommandEngine {
  constructor(renderer, variables) {
    this.renderer = renderer;
    this.vars = variables;
    this.storyData = null;
    this.currentScene = null;
    this.currentChapter = null;
    this.commandIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
    this._skipMode = false;
    this._autoMode = false;
    this._autoTimer = null;
    this.onSceneChange = null;
    this.onGameEnd = null;
    this.onShowTitle = null;
  }

  loadStory(storyData) {
    this.storyData = storyData;
  }

  async startScene(sceneId) {
    const scene = this.storyData.scenes[sceneId];
    if (!scene) {
      console.error('场景不存在:', sceneId);
      return;
    }

    this.currentScene = scene;
    this.commandIndex = 0;
    this.isRunning = true;

    if (this.onSceneChange) {
      this.onSceneChange(scene);
    }

    await this._executeCommands(scene.commands);
  }

  async _executeCommands(commands) {
    let i = 0;
    while (i < commands.length && this.isRunning) {
      if (this.isPaused) {
        await new Promise(r => {
          const check = () => {
            if (!this.isPaused) r();
            else setTimeout(check, 50);
          };
          check();
        });
      }

      const cmd = commands[i];
      const result = await this._executeCommand(cmd);

      if (result === false) break;
      if (typeof result === 'number') {
        i = result;
      } else {
        i++;
      }
    }
  }

  async _executeCommand(cmd) {
    switch (cmd.type) {
      case 'bg':
        this.renderer.setBackground(cmd.src, cmd.transition || 'fade');
        if (cmd.wait) await this._wait(cmd.wait);
        break;

      case 'gradient':
        this.renderer.setGradientBg(cmd.colors);
        if (cmd.wait) await this._wait(cmd.wait);
        break;

      case 'text':
        if (cmd.speaker) {
          await this.renderer.showDialog(cmd.speaker, cmd.text);
        } else {
          await this.renderer.showNarration(cmd.text);
        }
        if (!this._skipMode) {
          await this._waitForClick();
        }
        break;

      case 'narration':
        await this.renderer.showNarration(cmd.text);
        if (!this._skipMode) {
          await this._waitForClick();
        }
        break;

      case 'option': {
        const processed = this._processOptions(cmd.options);
        const available = processed.filter(o => !o.locked);
        if (available.length === 0) {
          await this.renderer.showNarration('没有任何可以做的选择...');
          if (!this._skipMode) await this._waitForClick();
          break;
        }
        const choice = await this.renderer.showOptions(processed);
        const selected = processed[choice];
        if (selected.actions) {
          for (const action of selected.actions) {
            await this._executeCommand(action);
          }
        }
        if (selected.jump) {
          return this._jumpToScene(selected.jump);
        }
        break;
      }

      case 'condition': {
        const met = this._evaluateCondition(cmd);
        if (met && cmd.then) {
          for (const c of cmd.then) {
            const r = await this._executeCommand(c);
            if (r !== undefined) return r;
          }
        } else if (!met && cmd.else) {
          for (const c of cmd.else) {
            const r = await this._executeCommand(c);
            if (r !== undefined) return r;
          }
        }
        break;
      }

      case 'set':
        this.vars.set(cmd.name, cmd.value);
        if (this.onVarsChange) this.onVarsChange(this.vars.getAll());
        break;

      case 'modify':
        this.vars.modify(cmd.name, cmd.op, cmd.value);
        if (this.onVarsChange) this.onVarsChange(this.vars.getAll());
        break;

      case 'jump':
        return this._jumpToScene(cmd.target);

      case 'transition':
        await this.renderer.transitionFade(cmd.duration || 800);
        break;

      case 'wait':
        await this._wait(cmd.duration);
        break;

      case 'ui':
        if (cmd.action === 'show') {
          this._showUI(cmd.target);
        }
        break;

      case 'end':
        this.isRunning = false;
        if (cmd.text) {
          let text = cmd.text;
          // 替换变量占位符 {varName}
          text = text.replace(/\{(\w+)\}/g, (match, name) => {
            const val = this.vars.get(name);
            return val !== undefined ? Math.round(val) : match;
          });
          await this.renderer.showNarration(text);
          await this._waitForClick();
        }
        if (this.onGameEnd) this.onGameEnd();
        return false;

      case 'title':
        this.isRunning = false;
        this.renderer.clear();
        if (this.onShowTitle) this.onShowTitle();
        return false;

      case 'clear':
        this.renderer.clear();
        break;

      case 'chapterTitle': {
        this.renderer.hideDialog();
        this.renderer.hideOptions();
        await this.renderer.showNarration(cmd.text);
        await this._wait(2500);
        await this.renderer.transitionFade(600);
        break;
      }

      case 'delay':
        await this._wait(cmd.duration || 500);
        break;

      case 'exec':
        if (cmd.fn) {
          const result = cmd.fn(this.vars, this.storyData);
          if (result && typeof result.then === 'function') await result;
        }
        break;

      default:
        console.warn('未知命令类型:', cmd.type);
    }
  }

  _processOptions(options) {
    return options.map(opt => {
      const processed = { ...opt };

      if (opt.condition) {
        processed.locked = !this._evaluateCondition(opt.condition);
        processed.lockReason = opt.lockReason || '条件不满足';
      }

      if (opt.minVar) {
        const val = this.vars.get(opt.minVar);
        if (val === undefined || val < opt.minValue) {
          processed.locked = true;
          processed.lockReason = opt.lockReason || `${opt.minVar} 需要达到 ${opt.minValue}`;
        }
      }

      return processed;
    });
  }

  _evaluateCondition(cond) {
    if (typeof cond === 'function') {
      return cond(this.vars);
    }
    if (cond.type === 'and') {
      return cond.conditions.every(c => this._evaluateCondition(c));
    }
    if (cond.type === 'or') {
      return cond.conditions.some(c => this._evaluateCondition(c));
    }
    if (cond.type === 'not') {
      return !this._evaluateCondition(cond.condition);
    }
    if (cond.variable !== undefined) {
      return this.vars.compare(cond.variable, cond.op || '==', cond.value);
    }
    return false;
  }

  _jumpToScene(target) {
    if (typeof target === 'function') {
      const result = target(this.vars);
      if (result) return this._jumpToScene(result);
      return false;
    }

    if (!this.storyData.scenes[target]) {
      console.error('跳转目标不存在:', target);
      return false;
    }

    this.currentScene = this.storyData.scenes[target];
    this.commandIndex = 0;

    if (this.onSceneChange) {
      this.onSceneChange(this.currentScene);
    }

    this._executeCommands(this.currentScene.commands);
    return false;
  }

  async _waitForClick() {
    return new Promise(resolve => {
      const handler = (e) => {
        if (e.target.closest('.option-btn') || e.target.closest('.top-btn') ||
            e.target.closest('.menu-btn') || e.target.closest('#menu-overlay') ||
            e.target.closest('#save-overlay') || e.target.closest('#settings-overlay')) {
          return;
        }

        if (this.renderer.isTyping) {
          this.renderer.completeTyping();
          return;
        }

        document.removeEventListener('click', handler);
        document.removeEventListener('keydown', keyHandler);
        resolve();
      };

      const keyHandler = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handler(e);
        }
      };

      document.addEventListener('click', handler);
      document.addEventListener('keydown', keyHandler);
    });
  }

  _wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  _showUI(target) {
    const overlays = {
      menu: 'menu-overlay',
      save: 'save-overlay',
      settings: 'settings-overlay'
    };
    const id = overlays[target];
    if (id) document.getElementById(id)?.classList.remove('hidden');
  }

  setSkipMode(on) {
    this._skipMode = on;
  }

  setAutoMode(on, delay = 2000) {
    this._autoMode = on;
    if (on) {
      this._autoTimer = setInterval(() => {
        if (!this.renderer.isTyping) {
          document.dispatchEvent(new MouseEvent('click'));
        }
      }, delay);
    } else {
      clearInterval(this._autoTimer);
      this._autoTimer = null;
    }
  }

  pause() { this.isPaused = true; }
  resume() { this.isPaused = false; }

  getCurrentSceneId() {
    if (!this.storyData || !this.currentScene) return null;
    for (const [id, scene] of Object.entries(this.storyData.scenes)) {
      if (scene === this.currentScene) return id;
    }
    return null;
  }

  getState() {
    return {
      sceneId: this.getCurrentSceneId(),
      sceneName: this.currentScene?.name || '',
      chapterName: this.currentChapter || '',
      variables: this.vars.snapshot()
    };
  }

  restoreState(state) {
    if (state.variables) {
      this.vars.restore(state.variables);
    }
    if (state.sceneId) {
      this.startScene(state.sceneId);
    }
  }
}

window.CommandEngine = CommandEngine;
