const calcFactor = (num) => (num <= 2 ? num : num * calcFactor(num - 1));

console.log(calcFactor(5));
console.log(calcFactor(4));
console.log(calcFactor(3));
console.log(calcFactor(2));
console.log(calcFactor(1));
export default calcFactor;

const fibo = (n) => {
  if (n <= 0) return 0;
  if (n <= 2) return 1;
  return fibo(n - 2) + fibo(n - 1);
};

console.log(fibo(25));
