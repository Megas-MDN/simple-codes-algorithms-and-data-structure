export default class Sety {
  #items;
  constructor() {
    this.#items = {};
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

  union(otherSet) {
    const unionSet = new Set();
    unionSet.add(...this.values());
    unionSet.add(...otherSet.values());
    return unionSet;
  }

  intersection(otherSet) {
    const intersection = new Set();
    const [setToInterate, setToCompare] =
      otherSet.size() < this.size() ? [otherSet, this] : [this, otherSet];
    intersection.add(
      ...setToInterate.values().filter((item) => setToCompare.has(item))
    );
    return intersection;
  }

  diff(otherSet) {
    const diffSet = new Set();
    diffSet.add(...this.values().filter((item) => !otherSet.has(item)));
    return diffSet;
  }

  isSubSetOf(otherSet) {
    if (this.size() > otherSet.size()) return false;
    const allIn = this.values().every((item) => otherSet.has(item));
    return !!allIn;
  }
}

const testSet = () => {
  const set = new Set();
  set.add(1);
  set.add(2);
  /*
  set.add(1, 2, 3, 4, 5, 6, 7);
  console.log('Values --> ', set.values(), '<---');
  console.log('Has --> ', set.has(2), '<---');
  console.log('Has --> ', set.has(20), '<---');
  console.log('delete', set.delete(6));
  console.log('delete', set.delete(2));
  console.log('Size', set.size());
  set.log();
  console.log('Values --> ', set.values(), '<---');
  const b = new Set();
  b.add(10, 20, 5, 1);
  const c = set.union(b);
  c.log();
  const d = set.intersection(b);
  d.log();
  const e = b.intersection(set);
  e.log();
  e.add(7);
  const f = e.diff(d);
  f.log();
  console.log(f.isSubSetOf(e), 'True expected');
  console.log(f.isSubSetOf(d), 'False expected');*/
  console.log('Array -->', [...set]);
};

testSet();
