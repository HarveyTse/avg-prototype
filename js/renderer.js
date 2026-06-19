/**
 * 渲染器 - DOM 渲染对话、选项、背景、过渡效果
 * 对应原版的 dialogLayer / uiLayer / background
 */
class Renderer {
  constructor() {
    this.el = {
      bgCurrent: document.getElementById('bg-current'),
      bgNext: document.getElementById('bg-next'),
      bgOverlay: document.getElementById('bg-overlay'),
      dialogBox: document.getElementById('dialog-box'),
      speakerName: document.getElementById('speaker-name'),
      dialogText: document.getElementById('dialog-text'),
      narrationBox: document.getElementById('narration-box'),
      narrationText: document.getElementById('narration-text'),
      optionPanel: document.getElementById('option-panel'),
      optionList: document.getElementById('option-list'),
      transition: document.getElementById('transition-layer'),
      statusBar: document.getElementById('status-bar'),
      charLayer: document.getElementById('char-layer'),
    };

    this.typingTimer = null;
    this.isTyping = false;
    this.typingResolve = null;
    this.textSpeed = 40;
    this._lastBg = '';
  }

  setTextSpeed(speed) {
    this.textSpeed = Math.max(10, 80 - speed * 7);
  }

  /* ===== 背景 ===== */
  setBackground(src, transition = 'fade') {
    if (src === this._lastBg) return;
    this._lastBg = src;

    const next = this.el.bgNext;
    const curr = this.el.bgCurrent;

    // 预加载图片
    const img = new Image();
    img.onload = () => {
      next.style.backgroundImage = `url('${src}')`;

      if (transition === 'none') {
        curr.style.backgroundImage = `url('${src}')`;
        return;
      }

      next.style.opacity = '1';
      setTimeout(() => {
        curr.style.backgroundImage = `url('${src}')`;
        curr.style.opacity = '1';
        next.style.opacity = '0';
      }, 1000);
    };
    img.src = src;
  }

  setGradientBg(colors) {
    const grad = `linear-gradient(135deg, ${colors.join(', ')})`;
    this._lastBg = '';
    this.el.bgCurrent.style.backgroundImage = grad;
    this.el.bgNext.style.backgroundImage = grad;
    this.el.bgNext.style.opacity = '0';
    this.el.bgCurrent.style.opacity = '1';
  }

  clearBackground() {
    this._lastBg = '';
    this.el.bgCurrent.style.backgroundImage = '';
    this.el.bgNext.style.backgroundImage = '';
  }

  /* ===== 对话框 ===== */
  showDialog(speaker, text) {
    this.el.dialogBox.classList.remove('hidden');
    this.el.narrationBox.classList.add('hidden');
    this.el.speakerName.textContent = speaker || '';
    this.el.speakerName.style.display = speaker ? '' : 'none';
    return this._typeText(this.el.dialogText, text);
  }

  showNarration(text) {
    this.el.dialogBox.classList.add('hidden');
    this.el.narrationBox.classList.remove('hidden');
    return this._typeText(this.el.narrationText, text);
  }

  hideDialog() {
    this.el.dialogBox.classList.add('hidden');
    this.el.narrationBox.classList.add('hidden');
    this._stopTyping();
  }

  instantText(el, text) {
    this._stopTyping();
    el.innerHTML = text;
  }

  async _typeText(el, text) {
    this._stopTyping();
    return new Promise(resolve => {
      this.isTyping = true;
      this.typingResolve = resolve;
      el.innerHTML = '';
      let i = 0;
      const chars = text.split('');
      const tick = () => {
        if (i < chars.length) {
          el.innerHTML += chars[i] === '\n' ? '<br>' : chars[i];
          i++;
          this.typingTimer = setTimeout(tick, this.textSpeed);
        } else {
          this.isTyping = false;
          this.typingTimer = null;
          resolve();
        }
      };
      tick();
    });
  }

  completeTyping() {
    if (!this.isTyping) return false;
    clearTimeout(this.typingTimer);
    this.typingTimer = null;
    this.isTyping = false;
    const activeEl = this.el.dialogBox.classList.contains('hidden')
      ? this.el.narrationText
      : this.el.dialogText;
    activeEl.innerHTML = activeEl.innerHTML.replace(/<br>/g, '\n');
    const text = activeEl.textContent;
    activeEl.innerHTML = text;
    if (this.typingResolve) {
      this.typingResolve();
      this.typingResolve = null;
    }
    return true;
  }

  _stopTyping() {
    clearTimeout(this.typingTimer);
    this.typingTimer = null;
    this.isTyping = false;
    this.typingResolve = null;
  }

  /* ===== 选项 ===== */
  showOptions(options) {
    this.el.dialogBox.classList.add('hidden');
    this.el.narrationBox.classList.add('hidden');
    this.el.optionList.innerHTML = '';

    return new Promise(resolve => {
      options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn' + (opt.locked ? ' locked' : '');
        btn.textContent = opt.text;

        if (opt.locked) {
          btn.title = opt.lockReason || '条件不满足';
        } else {
          btn.addEventListener('click', () => {
            this.hideOptions();
            resolve(idx);
          });
        }

        this.el.optionList.appendChild(btn);
      });

      this.el.optionPanel.classList.remove('hidden');

      if (options.some(o => o.locked && !o.text.includes('【'))) {
        const locked = options.find(o => o.locked);
        if (locked && locked.lockReason) {
          const hint = document.createElement('div');
          hint.style.cssText = 'text-align:center;color:var(--color-text-dim);font-size:12px;margin-top:8px;font-family:var(--font-sans)';
          hint.textContent = '提示: ' + locked.lockReason;
          this.el.optionList.appendChild(hint);
        }
      }
    });
  }

  hideOptions() {
    this.el.optionPanel.classList.add('hidden');
  }

  /* ===== 过渡效果 ===== */
  async transitionFade(duration = 800) {
    this.el.transition.classList.remove('hidden', 'fade-black');
    void this.el.transition.offsetWidth;
    this.el.transition.classList.add('fade-black');
    await new Promise(r => setTimeout(r, duration));
    this.el.transition.classList.add('hidden');
    this.el.transition.classList.remove('fade-black');
  }

  /* ===== 状态栏 ===== */
  updateStats(vars) {
    const map = {
      favor: 'stat-favor',
      courage: 'stat-courage',
      wisdom: 'stat-wisdom',
      charm: 'stat-charm'
    };
    for (const [key, elId] of Object.entries(map)) {
      const el = document.getElementById(elId);
      if (el && key in vars) el.textContent = Math.round(vars[key]);
    }
  }

  showStatusBar() { this.el.statusBar.style.display = ''; }
  hideStatusBar() { this.el.statusBar.style.display = 'none'; }

  /* ===== 角色层 ===== */
  clearCharacters() {
    this.el.charLayer.innerHTML = '';
  }

  /* ===== 通用 ===== */
  clear() {
    this.hideDialog();
    this.hideOptions();
    this.clearCharacters();
  }
}

window.Renderer = Renderer;
