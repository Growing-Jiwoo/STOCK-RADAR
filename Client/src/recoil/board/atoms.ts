import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: {
    isOpen: false,
  },
});

export const commentIdState = atom({
  key: 'commentIdState',
  default: 0,
});
