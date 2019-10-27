const randomString = require('./random-string');

describe('random-string', () => {
  it('returns random string inside a certain characters set', () => {
    const length = 5;
    const str = randomString(length, 'abc');
    expect(str).toHaveLength(length);
    for (let index = 0; index < str.length; index += 1) {
      const char = str[index];
      expect(char).toMatch(/[abc]/);
    }
  });

  it('throws error if no character in the set', () => {
    expect(() => randomString(2, '')).toThrow(
      'Need at least one character for string generation.'
    );
  });

  it('return empty string if want to generate a string with length 0 or less', () => {
    const str = randomString(0, '');
    expect(str).toEqual('');
  });
});
