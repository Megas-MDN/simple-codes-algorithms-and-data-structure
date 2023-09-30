import Stack from './StackObj.js';

const baseConverter = (decimal = 0, base = 2) => {
  if (base > 36 || base < 2) return '';

  const stack = new Stack();
  const digs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const calcDecimalToBinary = (num) => {
    if (num < base) return stack.push(num);
    stack.push(num % base);
    return calcDecimalToBinary(parseInt(num / base));
  };

  calcDecimalToBinary(decimal);

  const binString = (str = '') => {
    if (stack.isEmpty()) return str;
    str += `${digs[stack.pop()]}`;
    return binString(str);
  };

  return binString();
};

console.log(baseConverter(100345, 35)); // 2bw0
console.log(baseConverter(100345, 16)); // 187f9
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(4095, 16)); // FFF
console.log(baseConverter(196, 16)); // C4
console.log(baseConverter(208, 17)); // C4
console.log(baseConverter(244, 20)); // C4
