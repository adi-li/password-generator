import { createJSONStorage } from 'jotai/utils';

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const jsonStorage = createJSONStorage(() => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }
  return noopStorage;
});
