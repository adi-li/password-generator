import { createCharacterCandidates } from './createCharacterCandidates';

const randomString = (chars: string, randomBuffer: Uint32Array) => {
  const { length: charsLength } = chars;
  if (charsLength === 0) {
    throw new Error('chars should have at least one charactor inside it.');
  }
  crypto.getRandomValues(randomBuffer);
  return randomBuffer.reduce((acc, num) => acc + chars[num % charsLength], '');
};

type GeneratePasswordsOptions = {
  length: number;
  count: number;
} & (
  | { chars: string }
  | (Parameters<typeof createCharacterCandidates>[0] & { chars?: undefined })
);

export const generatePasswords = (options: GeneratePasswordsOptions) => {
  const { length, count } = options;
  const chars =
    'chars' in options && options.chars != null
      ? options.chars
      : createCharacterCandidates(options);

  if (length < 1) {
    throw new Error('password length cannot be negative number or zero');
  }
  if (!chars) {
    throw new Error('chars cannot be empty');
  }
  const times = Math.max(1, Math.min(1000, count));
  const passwords = new Array<string>(times);
  const randomBuffer = new Uint32Array(length);
  for (let index = 0; index < times; index += 1) {
    passwords[index] = randomString(chars, randomBuffer);
  }
  return passwords;
};
