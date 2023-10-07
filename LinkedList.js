const fnCompare = (a, b) => a === b;

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  #head;
  #count;
  #equalsFn;
  #Nod;
  constructor(equalsFn = fnCompare, Nod = Node) {
    this.#count = 0;
    this.#head = null;
    this.#equalsFn = equalsFn;
    this.#Nod = Nod;
  }

  #getIndexAt(index) {
    let curr = this.#head;
    let prev = null;
    for (let i = 0; i < index; i++) {
      prev = curr;
      curr = curr.next;
    }
    return { prev, curr };
  }

  insertAt(element, index) {
    if (index < 0 || index > this.#count) return null;
    const node = new this.#Nod(element);
    if (index === 0) {
      this.#head = node;
    } else {
      const { curr, prev } = this.#getIndexAt(index);
      prev.next = node;
      node.next = curr;
    }
    this.#count++;
    return node;
  }

  push(element) {
    return this.insertAt(element, this.#count);
  }

  removeAt(index) {
    if (index < 0 || index >= this.#count) return null;
    const { prev, curr } = this.#getIndexAt(index);
    if (index === 0) {
      this.#head = prev;
    } else {
      prev.next = curr.next;
    }
    this.#count--;
    return curr;
  }
  pop() {
    return this.removeAt(this.#count - 1);
  }

  indexOf(element) {
    let curr = this.#head;
    let prev = null;
    for (let i = 0; i < this.#count; i++) {
      if (this.#equalsFn(element, curr.element)) return i;
      prev = curr;
      curr = prev.next;
    }
    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.#count === 0;
  }
  size() {
    return this.#count;
  }
  getHead() {
    if (this.isEmpty()) return null;
    return JSON.parse(JSON.stringify(this.#head?.element));
  }
  toString(separator = '') {
    if (this.isEmpty()) return '';
    let str = '';
    let curr = this.#head;
    let prev = null;
    for (let i = 0; i < this.#count; i++) {
      str +=
        i + 1 >= this.#count
          ? `${curr.element}`
          : `${curr.element}${separator}`;
      prev = curr;
      curr = prev.next;
    }
    return str;
  }
}

const link = new LinkedList();
link.push(10);
link.push(9);
link.push(8);
link.push(6);

console.log(link.toString(' <<< '));
link.insertAt(7, 3);
console.log(link.toString(' <<< '));
link.remove(9);
console.log(link.toString(' <<< '));
link.pop();
console.log(link.toString(' <<< '));
link.insertAt(9, 1);
console.log(link.toString(' <<< '));
console.log(link.getHead());
