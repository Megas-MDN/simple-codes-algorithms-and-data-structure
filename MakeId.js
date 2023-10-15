const bigString =
  'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const makeId = (numChars = 4, numStrings = 4, bigString = bigString) => {
  const getRandomChar = (bigStr) =>
    bigStr[Math.floor(Math.random() * bigStr.length)];

  const makeChars = () =>
    Array(numChars)
      .fill('')
      .map((_el) => getRandomChar(bigString))
      .join('');

  return Array.from({ length: numStrings }, makeChars).join('-');
};

export default makeId;
