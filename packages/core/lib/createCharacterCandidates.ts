import {
  DEFAULT_SYMBOLS,
  DIGITS_SET,
  LOWERCASE_SET,
  UPPERCASE_SET,
} from './constants';

const union = <T>(setA: Set<T>, setB: Set<T>) => {
  for (const val of setB) {
    setA.add(val);
  }
};

export const createCharacterCandidates = ({
  upper = true,
  lower = true,
  digits = true,
  symbols = DEFAULT_SYMBOLS,
}: {
  upper?: boolean;
  lower?: boolean;
  digits?: boolean;
  symbols?: string;
} = {}) => {
  const chars = new Set<string>();
  if (upper) {
    union(chars, UPPERCASE_SET);
  }
  if (lower) {
    union(chars, LOWERCASE_SET);
  }
  if (digits) {
    union(chars, DIGITS_SET);
  }
  if (symbols) {
    union(chars, new Set(symbols));
  }
  return Array.from(chars.values()).join('');
};
