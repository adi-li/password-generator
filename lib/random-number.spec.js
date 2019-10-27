const randomNumber = require('./random-number');

const NUM_TRIALS = 100000;

const makeCounter = () => {
  const counter = {};
  return {
    incr: key => {
      if (!counter[key]) {
        counter[key] = 0;
      }
      counter[key] += 1;
    },
    get: key => counter[key],
    get isEvenlyDistributed() {
      const values = Object.values(counter);
      const expected = 1 / values.length;
      return values.every(value => {
        const prop = value / NUM_TRIALS;
        return Math.abs(expected - prop) <= 0.05;
      });
    },
  };
};

describe('random-number', () => {
  it('returns random numbers [0, 1] in evenly distributed probability', () => {
    const counter = makeCounter();
    for (let index = 0; index < NUM_TRIALS; index += 1) {
      counter.incr(randomNumber());
    }
    expect(counter.isEvenlyDistributed).toBeTruthy();
  });

  it('returns random numbers [10, 20] in evenly distributed probability', () => {
    const counter = makeCounter();
    for (let index = 0; index < NUM_TRIALS; index += 1) {
      counter.incr(randomNumber(10, 30));
    }
    expect(counter.isEvenlyDistributed).toBeTruthy();
  });

  it('throws error if `max` is not larger than `min`', () => {
    expect(() => randomNumber(10, 1)).toThrow(
      '`max` should be larger than `min`'
    );
  });
});
