import { atomWithStorage, selectAtom } from 'jotai/utils';
import type { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
import { jsonStorage } from './storage';

type AdvancedConfiguration = { mode: 'advanced'; chars: string };
type LiteConfiguration = {
  mode: 'lite';
  upper: boolean;
  lower: boolean;
  digits: boolean;
  symbols: string;
};

export type Configuration = {
  length: number;
  count: number;
} & (AdvancedConfiguration | LiteConfiguration);

export const configurationAtom = atomWithStorage<Configuration>(
  'password-generator-configuration',
  {
    mode: 'lite',
    length: 20,
    count: 10,
    upper: true,
    lower: true,
    digits: true,
    symbols: '@$#~+-*=_',
  },
  jsonStorage as SyncStorage<Configuration>,
);

export const lengthAtom = selectAtom(configurationAtom, ({ length }) => length);
export const countAtom = selectAtom(configurationAtom, ({ count }) => count);

const pick =
  <K extends keyof LiteConfiguration>(key: K) =>
  (config: Configuration) =>
    config.mode === 'lite' ? config[key] : undefined;

export const uppercaseAtom = selectAtom(configurationAtom, pick('upper'));
export const lowercaseAtom = selectAtom(configurationAtom, pick('lower'));
export const digitAtom = selectAtom(configurationAtom, pick('digits'));
export const symbolsAtom = selectAtom(configurationAtom, pick('symbols'));
