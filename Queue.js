export default class Queue {
  #count = 0;
  #first = 0;
  #items = {};
  constructor() {}

  enqueue(...elements) {
    elements.forEach((element) => {
      this.#items[this.#count] = element;
      this.#count++;
    });
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const element = this.#items[this.#first];
    delete this.#items[this.#first];
    this.#first++;
    return element;
  }

  peek() {
    return this.#items[this.#first];
  }

  size() {
    return this.#count - this.#first;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#count = 0;
    this.#items = {};
    this.#first = 0;
  }

  toString(separator = '') {
    return Object.values(this.#items).join(separator);
  }
}

function testQueue() {
  const queue = new Queue();

  console.log('isEmpty ', queue.isEmpty()); // isEmpty true
  queue.enqueue(1, 2, 3); // 1,2,3 queue
  console.log('peek ', queue.peek()); // 1 peak
  console.log('size ', queue.size()); // size 3
  console.log('toString ', queue.toString(' - ')); // toString 1 - 3 - 3
  const q1 = queue.dequeue(); // dequeue 1
  const q2 = queue.dequeue(); // dequeue 2
  console.log('size ', queue.size()); // size 1
  console.log('isEmpty ', queue.isEmpty()); // isEmpty false
  const q3 = queue.dequeue();
  console.log(q1, q2, q3, '<---'); // 1,2,3 <----
  console.log('isEmpty ', queue.isEmpty()); // isEmpty true
  console.log(Object.getOwnPropertyNames(queue), '<-- get props --> []');
}

// testQueue();
