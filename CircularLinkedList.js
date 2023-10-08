export class DoublyNode {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

const defaultIsEquals = (a, b) => a === b;

export default class CircularLinkedList {
  #fnEquals;
  #Nod;
  #count;
  #head;
  #tail;

  constructor(fnEquals = defaultIsEquals, Nod = DoublyNode) {
    this.#fnEquals = fnEquals;
    this.#Nod = Nod;
    this.#count = 0;
    this.#head = null;
    this.#tail = null;
  }

  #insertFirst(element) {
    const node = new this.#Nod(element);
    this.#count++;
    if (this.#count === 1) {
      node.prev = node;
      node.next = node;
      this.#head = node;
      this.#tail = node;
      return node.element;
    }
    node.prev = this.#tail;
    this.#head.prev = node;
    node.next = this.#head;
    this.#head = node;
    return node.element;
  }

  #insertLast(element) {
    if (this.#count === 0) return this.#insertFirst(element);
    const node = new this.#Nod(element);
    node.next = this.#head;
    node.prev = this.#tail; // extail
    this.#tail.next = node; // extail
    this.#tail = node; // coroacao
    this.#head.prev = this.#tail;
    this.#count++;
    return node.element;
  }

  #isValidIndex(index) {
    return index >= 0 && index <= this.#count;
  }

  #finder(callback) {
    let curr = this.#head;
    for (let i = 0; i < this.#count; i++) {
      if (callback(curr, i)) return [curr, i];
      curr = curr.next;
    }
    return [null, -1];
  }

  #reduce(callback, acc) {
    let curr = this.#head;
    let myAcc = acc;
    for (let i = 0; i < this.#count; i++) {
      myAcc = callback(myAcc, curr, i);
      curr = curr.next;
    }
    return myAcc;
  }

  #loopByTail(index) {
    let curr = this.#tail;
    for (let i = this.#count - 1; i >= 0; i--) {
      if (i === index) return curr;
      curr = curr.prev;
    }
    throw new Error(`index :: ${index} blowup the loop`);
  }

  #loopByHead(index) {
    let curr = this.#head;
    for (let i = 0; i < this.#count; i++) {
      if (i === index) return curr;
      curr = curr.next;
    }
    throw new Error(`index :: ${index} blowup the loop`);
  }

  getElementByIndex(index) {
    const halfCount = Math.ceil(this.#count / 2);
    if (index > halfCount) return this.#loopByTail(index);
    return this.#loopByHead(index);
  }

  insert(element, index = this.#count) {
    if (!this.#isValidIndex(index)) return null;
    if (index === 0) return this.#insertFirst(element);
    if (index === this.#count) return this.#insertLast(element);
    const node = new this.#Nod(element);
    const current = this.getElementByIndex(index);
    node.prev = current.prev;
    node.next = current;
    current.prev = node;
    this.#count++;
    return node.element;
  }

  remove(index = this.#count - 1) {
    if (!this.#isValidIndex(index)) return null;
    const elementToRemove = this.getElementByIndex(index);
    this.#count--;
    if (this.#count === 0) {
      [this.#head, this.#tail] = [null, null];
      return elementToRemove.element;
    }

    const prevElement = elementToRemove.prev;
    const nextElement = elementToRemove.next;
    if (index === 0) this.#head = nextElement;
    if (index === this.#count) this.#tail = prevElement;
    prevElement.next = nextElement;
    nextElement.prev = prevElement;
    return elementToRemove.element;
  }

  getLast() {
    return this.#tail.element;
  }

  getFirst() {
    return this.#head.element;
  }

  toString(separator = '') {
    return this.#reduce((acc, curr, i) => {
      const str =
        acc + `${curr.element}` + (i === this.#count - 1 ? '' : `${separator}`);
      return str;
    }, '');
  }

  findElement(element) {
    return this.#finder((curr) => this.#fnEquals(element, curr.element))[0];
  }

  removeElement(element) {
    const [curr, index] = this.#finder((curr) =>
      this.#fnEquals(element, curr.element)
    );
    if (index < 0) return null;
    return this.remove(index);
  }

  #linkElements(curr, prev, next) {
    curr.prev = prev;
    prev.next = curr;
    curr.next = next;
    next.prev = curr;
  }

  #reHeadTail(curr, index) {
    if (index === 0) this.#head = curr;
    if (index === this.#count - 1) this.#tail = curr;
  }

  #headTailCase(c1, c2, prevC1, nextC1, prevC2, nextC2) {
    c1.next = prevC1;
    prevC1.prev = c1;
    c1.prev = prevC2;
    prevC2.next = c1;
    c2.prev = nextC2;
    nextC2.next = c2;
    c2.next = nextC1;
    nextC1.prev = c2;
  }

  #proximalCase(c1, c2, prevC1, nextC1, prevC2, nextC2) {
    c1.prev = nextC1;
    nextC1.next = c1;
    c1.next = nextC2;
    nextC2.prev = c1;
    c2.prev = prevC1;
    prevC1.next = c2;
    c2.next = prevC2;
    prevC2.prev = c2;
  }

  #switchNode(curr1, curr2, index1, index2) {
    const prevCurr1 = curr1.prev;
    const nextCurr1 = curr1.next;
    const prevCurr2 = curr2.prev;
    const nextCurr2 = curr2.next;
    if (
      (index1 === 0 && index2 === this.#count - 1) ||
      (index2 === 0 && index1 === this.#count - 1)
    ) {
      this.#headTailCase(
        curr1,
        curr2,
        prevCurr1,
        nextCurr1,
        prevCurr2,
        nextCurr2
      );
    } else if (Math.abs(+index1 - +index2) === 1) {
      this.#proximalCase(
        curr1,
        curr2,
        prevCurr1,
        nextCurr1,
        prevCurr2,
        nextCurr2
      );
    } else {
      this.#linkElements(curr1, prevCurr2, nextCurr2);
      this.#linkElements(curr2, prevCurr1, nextCurr1);
    }
    this.#reHeadTail(curr2, index1);
    this.#reHeadTail(curr1, index2);
  }

  switchIndex(i, j) {
    if (!this.#isValidIndex(i)) return null;
    if (!this.#isValidIndex(j)) return null;
    const [curr1, index1] = this.#finder((_curr, idx) => +idx === +i);
    const [curr2, index2] = this.#finder((_curr, idx) => +idx === +j);
    this.#switchNode(curr1, curr2, index1, index2);
  }

  switchElements(el1, el2) {
    const [curr1, index1] = this.#finder((curr) =>
      this.#fnEquals(el1, curr.element)
    );
    const [curr2, index2] = this.#finder((curr) =>
      this.#fnEquals(el2, curr.element)
    );
    this.#switchNode(curr1, curr2, index1, index2);
  }

  size() {
    return this.#count;
  }
}

const testClass = () => {
  const circularList = new CircularLinkedList();
  console.log('--> ', circularList.toString(' - ')); //-->  ''
  console.log('Insert --> ', circularList.insert(100)); // Insert --> 100
  console.log('--> ', circularList.toString(' - ')); //-->  100
  console.log('Insert --> ', circularList.insert(20)); // Insert --> 20
  console.log('--> ', circularList.toString(' - ')); //-->  100 - 20
  console.log('Insert --> ', circularList.insert(10)); // Insert --> 10
  console.log('--> ', circularList.toString(' - ')); //-->  100 - 20
  console.log('Insert --> ', circularList.insert(5)); // Insert --> 5
  console.log('--> ', circularList.toString(' - ')); //-->  100 - 20 - 10 - 5
  console.log('getFirst --> ', circularList.getFirst()); // getFirst --> 100
  console.log('getLast --> ', circularList.getLast()); // getLast --> 5
  console.log('Insert --> ', circularList.insert(4)); // Insert --> 4
  console.log('Insert --> ', circularList.insert(3)); // Insert --> 3
  console.log('Insert --> ', circularList.insert(2)); // Insert --> 2
  console.log('Insert --> ', circularList.insert(1)); // Insert --> 1
  console.log('Insert --> ', circularList.insert(55)); // Insert --> 55
  console.log('--> ', circularList.toString(' - ')); //->  100 - 20 - 10 - 5 - 4 - 3 - 2 - 1 - 55
  console.log(
    'removeElement --> ',
    circularList.insert(circularList.removeElement(100))
  ); // removeElement --> 100
  console.log(
    'removeElement --> ',
    circularList.insert(circularList.removeElement(20))
  ); // removeElement --> 20
  console.log(
    'removeElement --> ',
    circularList.insert(circularList.removeElement(55))
  ); // removeElement --> 100
  // console.log('--> ', circularList.toString(' - ')); //-->  100 - 20
  console.log('remove --> ', circularList.remove(6)); // remove --> 100
  console.log('--> ', circularList.toString(' - ')); //-->  10 - 5 - 4 - 3 - 2 - 1 - 20 - 55

  circularList.switchElements(10, 55);
  console.log('--> ', circularList.toString(' - ')); //-->  10 - 5 - 4 - 3 - 2 - 1 - 20 - 55

  circularList.switchIndex(0, circularList.size() - 1);
  console.log('--> ', circularList.toString(' - ')); //-->  10 - 5 - 4 - 3 - 2 - 1 - 20 - 55

  circularList.switchIndex(0, 1);
  console.log('--> ', circularList.toString(' - ')); //-->  10 - 5 - 4 - 3 - 2 - 1 - 20 - 55

  circularList.switchIndex(0, 5);
  console.log('--> ', circularList.toString(' - ')); //-->  10 - 5 - 4 - 3 - 2 - 1 - 20 - 55
};

testClass();
