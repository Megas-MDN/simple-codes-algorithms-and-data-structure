export default class Dictionary {
  #table;
  constructor() {
    this.#table = {};
  }

  #toStringKey(item) {
    switch (true) {
      case item === null:
        return 'null';
      case item === undefined:
        return 'undefined';
      case item === NaN:
        return 'NaN';
      case typeof item === 'object':
        return JSON.stringify(item);
      default:
        return `${item}`;
    }
  }

  set(key, value) {
    const strKey = this.#toStringKey(key);
    this.#table[strKey] = { [key]: value };
    return { [strKey]: value };
  }

  remove(key) {
    const strKey = this.#toStringKey(key);
    delete this.#table[strKey];
  }

  hasKey(key) {
    const strKey = this.#toStringKey(key);
    return Boolean(this.#table[strKey]);
  }

  get(key) {
    const strKey = this.#toStringKey(key);
    return this.#table[strKey];
  }

  clear() {
    this.#table = {};
  }

  size() {
    return Object.keys(this.#table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  keys() {
    return Object.keys(this.#table);
  }

  values() {
    return Object.values(this.#table);
  }

  entries() {
    return Object.entries(this.#table);
  }

  toString(separator = '') {
    return this.values().join(separator);
  }

  forEach(callback) {
    const values = this.values();
    for (let i = 0; i < this.size(); i++) {
      callback(values[i], i);
    }
  }

  map(callback) {
    const values = this.values();
    const newArr = [];
    for (let i = 0; i < this.size(); i++) {
      newArr[i] = callback(values[i], i);
    }
    return newArr;
  }

  reduce(callback, acc) {
    const values = this.values();
    let [myAcc, i] =
      acc === null || acc === undefined ? [values[0], 1] : [acc, 0];
    for (; i < this.size(); i++) {
      myAcc = callback(myAcc, values[i], i);
    }
    return myAcc;
  }

  filter(callback) {
    const values = this.values();
    const arr = [];
    for (let i = 0; i < this.size(); i++) {
      const called = callback(values[i], i);
      if (called) arr.push(values[i]);
    }
    return arr;
  }

  every(callback) {
    const values = this.values();
    for (let i = 0; i < this.size(); i++) {
      const called = callback(values[i], i);
      if (!called) return false;
    }
    return true;
  }

  some(callback) {
    const values = this.values();
    for (let i = 0; i < this.size(); i++) {
      const called = callback(values[i], i);
      if (called) return true;
    }
    return false;
  }
}

console.log(`--> ${JSON.stringify({})}`);
