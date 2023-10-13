export default class Set {
  #items;
  constructor() {
    this.#items = {};
  }

  #keyStr(key) {
    return JSON.stringify(key);
  }

  has(el) {
    return Object.prototype.hasOwnProperty.call(this.#items, el);
  }

  add(...els) {
    els.forEach((el) => {
      if (!this.has(el)) {
        this.#items[el] = el;
      }
    });
    return true;
  }

  delete(el) {
    if (!this.has(el)) return false;
    delete this.#items[el];
    return true;
  }
  clear() {
    this.#items = {};
  }
  size() {
    return Object.keys(this.#items).length;
  }

  values() {
    return Object.values(this.#items);
  }

  log() {
    console.log(JSON.stringify(this.#items, null, 2));
  }
}

const testSet = () => {
  const set = new Set();
  set.add(1, 2, 3, 4, 5, 6, 7);
  console.log('Values --> ', set.values(), '<---');
  console.log('Has --> ', set.has(2), '<---');
  console.log('Has --> ', set.has(20), '<---');
  console.log('delete', set.delete(6));
  console.log('delete', set.delete(2));
  console.log('Size', set.size());
  set.log();
  console.log('Values --> ', set.values(), '<---');
};

testSet();
