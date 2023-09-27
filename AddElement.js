const arr = [
  {
    item: 'Text 1',
    order: 1,
  },
  {
    item: 'Text 2',
    order: 2,
  },
  {
    item: 'Text 3',
    order: 2,
  },
];

const reOrderArr = (myArr) =>
  myArr.map((el, i) => {
    el.order = i + 1;
    return el;
  });

export const addElement = (arrN, index) => {
  const nArr = [...arrN];
  nArr.splice(index, 0, {
    item: '',
  });
  return reOrderArr(nArr);
};

console.log(addElement(arr, 1));
console.log(addElement(arr, 2));
console.log(addElement(arr, 0));
