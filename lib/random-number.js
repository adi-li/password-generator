module.exports = (min = 0, max = 1) => {
  if (max <= min) {
    throw new Error('`max` should be larger than `min`');
  }
  return Math.round(Math.random() * (max - min)) + min;
};
