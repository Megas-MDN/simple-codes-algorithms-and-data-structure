import assert from 'assert';

const arrTest = [
  0,
  -1,
  [5, 3],
  [1, 3],
  [-5, [4, ['z', 1], 6, [3], 1], 5],
  [2, 5],
  -3,
  'k',
];

export const flatAll = (arr = [], index = 0) =>
  index >= arr.length
    ? arr
    : Array.isArray(arr[index])
    ? flatAll([...arr].flat(), index)
    : flatAll(arr, index + 1);

const arrExpect = [0, -1, 5, 3, 1, 3, -5, 4, 'z', 1, 6, 3, 1, 5, 2, 5, -3, 'k'];
console.log(flatAll(arrTest).length === arrExpect.length); //
assert.deepEqual(flatAll(arrTest), arrExpect);
