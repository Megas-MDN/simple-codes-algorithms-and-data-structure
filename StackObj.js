export default class Stack {
  #count = 0;
  #items = {};
  constructor() {
    this.#count = 0;
    this.#items = {};
  }

  push(...elements) {
    elements.forEach((el) => {
      this.#items[this.#count] = el;
      this.#count++;
    });
  }

  pop() {
    if (this.isEmpty()) return undefined;
    this.#count--;
    const element = this.#items[this.#count];
    delete this.#items[this.#count];
    return element;
  }

  isEmpty() {
    return this.#count === 0;
  }

  clear() {
    this.#items = {};
    this.#count = 0;
  }

  size() {
    return this.#count;
  }

  peek() {
    return this.#items[this.#count - 1];
  }

  toString(separator = '') {
    return Object.values(this.#items).join(`${separator}`);
  }
}

function testClassStack() {
  const stack = new Stack();

  console.log(Object.getOwnPropertyNames(stack), '<---'); // [ 'count', 'items' ] <---
  console.log('Ultimo el: ', stack.peek()); // undefined
  console.log('Vazia: ', stack.isEmpty()); // true
  stack.push(5, 8); //
  console.log(stack.size()); // 2
  stack.push(11);
  console.log('Vazia: ', stack.isEmpty()); // false
  console.log('Size: ', stack.size()); // 3
  console.log('Ultimo el: ', stack.peek()); // 11
  stack.push(15);
  console.log('Size: ', stack.size()); // 4
  console.log('toString: ', stack.toString('-')); // toString:  5-8-11-15
  const p1 = stack.pop();
  const p2 = stack.pop();
  console.log('Size: ', stack.size()); // 2
  console.log(p1, p2, 'Elementos removidos 15 e 11');
}

// testClassStack();
