export const fnToStr = (item) => {
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
};

export default class HashTable {
  #toStrFn;
  #table;
  constructor(toStrFn = fnToStr) {
    this.#toStrFn = toStrFn;
    this.#table = {};
  }

  #loseloseHash(key) {
    if (typeof key === 'number') return key;
    const str = this.#toStrFn(key);
    console.log(str);
    const hash = str.split('').reduce((acc, el, i) => {
      const newAcc = acc + +el.charCodeAt() * (i % 2 === 0 ? i + 2 : 0);
      return newAcc;
    }, 0);
    return hash;
  }

  put(key, value) {
    if (key === null || key === undefined) return false;
    if (value === null || value === undefined) return false;
    const hashKey = this.#loseloseHash(key);
    this.#table[hashKey] = value;
    return hashKey;
  }

  remove(key) {
    if (!(this.#loseloseHash(key) in this.#table)) return null;
    const item = this.#table[this.#loseloseHash(key)];
    delete this.#table[this.#loseloseHash(key)];
    return item;
  }

  get(key) {
    return this.#table[this.#toStrFn(key)];
  }
  log() {
    console.table(this.#table);
  }
}

(() => {
  const table = new HashTable();
  table.put('abc', 'outro@test.com');
  table.put('key', 'teste@test.com');
  table.log();
})();
