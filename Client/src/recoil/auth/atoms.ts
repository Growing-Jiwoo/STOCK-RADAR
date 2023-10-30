import { atom } from 'recoil';

export const usernameState = atom<string | null>({
  key: 'usernameState',
  default: null,
});
