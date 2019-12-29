const randomString = require('./lib/random-string');

const defaultOptions = {
  length: 20,
  upper: true,
  lower: true,
  digits: true,
  symbols: '@$#~+-*=_',
  count: 20,
  json: false,
};

const uppercaseSet = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const lowercaseSet = new Set('abcdefghijklmnopqrstuvwxyz');
const digitsSet = new Set('0123456789');

const isTruthy = val => val && val !== 'false' && val !== '0';

const union = (setA, setB) => {
  setB.forEach(val => {
    setA.add(val);
  });
};

const makeCharacterSet = ({ upper, lower, digits, symbols }) => {
  const chars = new Set();
  if (isTruthy(upper)) {
    union(chars, uppercaseSet);
  }
  if (isTruthy(lower)) {
    union(chars, lowercaseSet);
  }
  if (isTruthy(digits)) {
    union(chars, digitsSet);
  }
  if (symbols) {
    union(chars, new Set(symbols));
  }
  return Array.from(chars.values());
};

const makePasswords = ({ length, count, chars }) => {
  const times = Math.max(1, Math.min(1000, count));
  const passwords = [];
  for (let index = 0; index < times; index += 1) {
    passwords.push(randomString(length, chars));
  }
  return passwords;
};

module.exports = (req, res) => {
  const { length, count, json, ...charSetOption } = {
    ...defaultOptions,
    ...req.query,
  };
  const chars = makeCharacterSet(charSetOption);
  const passwords = makePasswords({ length, count, chars });
  if (isTruthy(json)) {
    res.json({ passwords });
    return;
  }
  res.setHeader('content-type', 'text/plain');
  res.send(passwords.join('\n'));
};
