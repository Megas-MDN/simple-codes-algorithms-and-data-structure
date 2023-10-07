export class DoublyNode {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

export default class CircularLinkedList {
  #fnEquals;
  #Nod;
  #count;
  #head;
  #tail;
  constructor(fnEquals, Nod = DoublyNode) {
    this.#fnEquals = fnEquals;
    this.#Nod = Nod;
    this.#count = 0;
    this.#head = null;
    this.#tail = null;
  }

  #insertFirst(element) {
    const node = new this.#Nod(element);
    this.#count++;
    if (this.#count === 0) {
      node.prev = node;
      node.next = node;
      this.#head = node;
      this.#tail = node;
      return node;
    }
    node.prev = this.#tail;
    this.#head.prev = node;
    node.next = this.#head;
    this.#head = node;
  }

  #insertLast(element) {
    if (this.#count === 0) return this.#insertFirst(element);
    const node = new this.#Nod(element);
    node.next = this.#head;
    node.prev = this.#tail;
    this.#tail.next = node;
    this.#tail = node;
    this.#count++;
    return node;
  }

  #isValidIndex(index) {
    return index >= 0 && index <= this.#count;
  }

  #loopByTail(index) {
    let curr = this.#tail;
    for (let i = this.#count - 1; i >= 0; i--) {
      if (i === index) return curr;
      curr = curr.prev;
    }
  }

  #loopByHead(index) {
    let curr = this.#head;
    for (let i = 0; i < this.#count; i++) {
      if (i === index) return curr;
      curr = curr.prev;
    }
  }

  getElementByIndex(index) {
    const halfCount = Math.ceil(this.#count / 2);
    if (index > halfCount) return this.#loopByTail(index);
    return this.#loopByHead(index);
  }

  insert(element, index) {
    if (!this.#isValidIndex(index)) return null;
    if (index === 0) return this.#insertFirst(element);
    if (index === this.#count) return this.#insertLast(element);
    const node = new this.#Nod(element);
    const current = this.getElementByIndex(index);
    node.prev = current.prev;
    node.next = current;
    current.prev = node;
    this.#count++;
    return node;
  }

  remove(index) {
    if (this.#isValidIndex(index)) return null;
    const elementToRemove = this.getElementByIndex(index);
    this.#count--;
    if (this.#count === 0) {
      [this.#head, this.#tail] = [null, null];
      return elementToRemove;
    }
    const prevElement = elementToRemove.prev;
    const nextElement = elementToRemove.next;
    if (index === 0) this.#head = prevElement;
    if (index === this.#count - 1) this.#tail = nextElement;
    prevElement.next = nextElement;
    nextElement.prev = prevElement;
    return elementToRemove;
  }
}
