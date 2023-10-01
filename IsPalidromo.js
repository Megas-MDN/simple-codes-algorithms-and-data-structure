import Deque from './Dequeue.js';

function palidromo(str = '') {
  const deque = new Deque();
  let isEqual = true;
  let first, last;

  for (let i = 0; i < str.length; i++) {
    deque.addBack(str[i]);
  }
  while (deque.size() > 1 && isEqual) {
    first = deque.removeFront();
    last = deque.removeBack();
    if (first !== last) return (isEqual = false);
  }
  return isEqual;
}

console.log(palidromo('kayak'));
console.log('kayak'.split('').reverse().join('') === 'kayak');
