/**
 * 变量系统 - 管理游戏全局变量
 * 对应原版的 values / arrays / vars
 */
class VariableStore {
  constructor() {
    this.values = {};
    this.arrays = {};
    this.listeners = new Map();
  }

  init(config) {
    if (config.values) {
      for (const [key, def] of Object.entries(config.values)) {
        this.values[key] = def.default !== undefined ? def.default : (def.type === 'string' ? '' : 0);
      }
    }
    if (config.arrays) {
      for (const [key, def] of Object.entries(config.arrays)) {
        this.arrays[key] = Array.isArray(def.default) ? [...def.default] : [];
      }
    }
  }

  get(name) {
    if (name in this.values) return this.values[name];
    if (name in this.arrays) return this.arrays[name];
    return undefined;
  }

  set(name, value) {
    if (name in this.values) {
      this.values[name] = value;
    } else if (name in this.arrays) {
      this.arrays[name] = value;
    } else {
      this.values[name] = value;
    }
    this._emit(name, value);
  }

  modify(name, op, value) {
    const current = this.get(name);
    if (current === undefined) return;
    let result;
    switch (op) {
      case '+': case 'add': result = Number(current) + Number(value); break;
      case '-': case 'sub': result = Number(current) - Number(value); break;
      case '*': case 'mul': result = Number(current) * Number(value); break;
      case '/': case 'div': result = Number(current) / Number(value); break;
      case '=': case 'set': result = value; break;
      case '>': case 'max': result = Math.max(Number(current), Number(value)); break;
      case '<': case 'min': result = Math.min(Number(current), Number(value)); break;
      default: result = value;
    }
    this.set(name, result);
  }

  compare(name, op, value) {
    const current = this.get(name);
    if (current === undefined) return false;
    const a = current, b = value;
    switch (op) {
      case '==': case '=': return a == b;
      case '!=': return a != b;
      case '>': return Number(a) > Number(b);
      case '>=': return Number(a) >= Number(b);
      case '<': return Number(a) < Number(b);
      case '<=': return Number(a) <= Number(b);
      case 'contains': return String(a).includes(String(b));
      case 'includes': return Array.isArray(a) && a.includes(b);
      default: return false;
    }
  }

  arrayPush(name, value) {
    if (name in this.arrays) this.arrays[name].push(value);
  }

  arrayRemove(name, value) {
    if (name in this.arrays) {
      const idx = this.arrays[name].indexOf(value);
      if (idx !== -1) this.arrays[name].splice(idx, 1);
    }
  }

  onChange(name, fn) {
    if (!this.listeners.has(name)) this.listeners.set(name, []);
    this.listeners.get(name).push(fn);
  }

  _emit(name, value) {
    const fns = this.listeners.get(name) || [];
    fns.forEach(fn => fn(value, name));
    const allFns = this.listeners.get('*') || [];
    allFns.forEach(fn => fn(value, name));
  }

  snapshot() {
    return {
      values: JSON.parse(JSON.stringify(this.values)),
      arrays: JSON.parse(JSON.stringify(this.arrays))
    };
  }

  restore(snap) {
    if (snap.values) this.values = { ...snap.values };
    if (snap.arrays) this.arrays = JSON.parse(JSON.stringify(snap.arrays));
  }

  getAll() {
    return { ...this.values };
  }
}

window.VariableStore = VariableStore;
