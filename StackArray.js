export default class Stack {
  #items;
  constructor() {
    this.#items = [];
  }

  push(...elements) {
    this.#items.push(...elements);
  }

  pop() {
    const element = this.#items.pop();
    return element;
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  clear() {
    this.#items = [];
  }

  size() {
    return this.#items.length;
  }

  peek() {
    return this.#items[this.size() - 1];
  }
  toString(separator = '') {
    return this.#items.join(`${separator}`);
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
