/**
 * 存档系统 - localStorage 存档/读档
 * 对应原版的 saveProfile / saveGameToLocalStorage
 */
class StorageManager {
  constructor(prefix = 'avg_prototype_') {
    this.prefix = prefix;
    this.maxSlots = 8;
    this.autoSaveKey = this.prefix + 'auto';
    this.settingsKey = this.prefix + 'settings';
  }

  save(slot, data) {
    const key = this.prefix + 'slot_' + slot;
    const payload = {
      ...data,
      timestamp: Date.now(),
      date: new Date().toLocaleString('zh-CN')
    };
    try {
      localStorage.setItem(key, JSON.stringify(payload));
      return true;
    } catch (e) {
      console.error('存档失败:', e);
      return false;
    }
  }

  load(slot) {
    const key = this.prefix + 'slot_' + slot;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('读档失败:', e);
      return null;
    }
  }

  delete(slot) {
    localStorage.removeItem(this.prefix + 'slot_' + slot);
  }

  autoSave(data) {
    return this.save('auto', data);
  }

  loadAutoSave() {
    return this.load('auto');
  }

  getSlotInfo(slot) {
    const data = this.load(slot);
    if (!data) return null;
    return {
      slot,
      sceneName: data.sceneName || '未知',
      chapterName: data.chapterName || '',
      date: data.date || '',
      variables: data.variables || {}
    };
  }

  getAllSlots() {
    const slots = [];
    for (let i = 1; i <= this.maxSlots; i++) {
      slots.push(this.getSlotInfo(i));
    }
    return slots;
  }

  hasAnySave() {
    for (let i = 1; i <= this.maxSlots; i++) {
      if (this.load(i)) return true;
    }
    return this.loadAutoSave() !== null;
  }

  saveSettings(settings) {
    try {
      localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    } catch (e) {}
  }

  loadSettings() {
    try {
      const raw = localStorage.getItem(this.settingsKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
}

window.StorageManager = StorageManager;
