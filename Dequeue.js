export default class Deque {
  #count = 0;
  #first = 0;
  #items = [];
  constructor() {}

  addFront(...elements) {
    [...elements].reverse().forEach((el) => {
      this.#items[this.#first] = el;
      this.#first--;
    });
  }

  addBack(...elements) {
    elements.forEach((el) => {
      this.#items[this.#count] = el;
      this.#count++;
    });
  }

  size() {
    return Math.abs(this.#count) - Math.abs(this.#first);
  }

  isEmpty() {
    return this.size() === 0;
  }

  removeFront() {
    if (this.isEmpty()) return;
    const element = this.#items[this.#first];
    delete this.#items[this.#first];
    this.#first++;
    return element;
  }

  removeBack() {
    if (this.isEmpty()) return;
    const element = this.#items[this.#count - 1];
    delete this.#items[this.#count - 1];
    this.#count--;
    return element;
  }

  peekFront() {
    return this.#items[this.#first + 1];
  }

  peekBack() {
    return this.#items[this.#count - 1];
  }

  toString(separator = '') {
    return Object.values(this.#items).join(`${separator}`);
  }

  clear() {
    this.#count = 0;
    this.#first = 0;
    this.#items = [];
  }
}

function testDeque() {
  const deque = new Deque();

  console.log(deque.isEmpty()); // true
  deque.addBack(1, 2, 3);
  console.log(deque.toString(' ')); // 1 2 3
  deque.addFront(1, 2, 3);
  console.log('toString ', deque.toString(' - ')); // 1 - 2 - 3 - 1 - 2 - 3
  console.log('size ', deque.size()); // 6
  const d1 = deque.removeBack();
  const d2 = deque.removeBack();
  console.log('Empty', deque.isEmpty()); // false
  console.log(deque.toString(' ')); // 1 2 3 1
  console.log(d1, d2);
  console.log(first);
}

// testDeque();
