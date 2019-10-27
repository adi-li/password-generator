const randomNumber = require('./random-number');

module.exports = (length = 20, chars) => {
  const { length: charsLength } = chars;
  if (length < 1) {
    return '';
  }
  if (charsLength < 1) {
    throw new Error('Need at least one character for string generation.');
  }
  let str = '';
  for (let index = 0; index < length; index += 1) {
    str += chars[randomNumber(0, charsLength - 1)];
  }
  return str;
};
