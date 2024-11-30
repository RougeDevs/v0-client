import { atom } from 'jotai';

// Utility function to load initial value from sessionStorage
const getSessionStorageValue = (key: string, initialValue: null) => {
  if (typeof window === 'undefined') return initialValue; // To handle SSR
  const savedValue = sessionStorage.getItem(key);
  return savedValue ? JSON.parse(savedValue) : initialValue;
};

// Custom atom that syncs with sessionStorage
export const userAtom = atom(
    null
);

export const contributorsAtom=atom(
  null
)
