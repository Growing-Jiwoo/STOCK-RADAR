import storage from './localStorage';

const token = {
  get: (tokenType: string) => {
    if (!storage.isSupported) return '';
    return storage.get<string>(tokenType);
  },

  set: (tokenType: string, newTokenValue: string) => {
    if (storage.isSupported) {
      storage.set(tokenType, newTokenValue);
    }
  },

  clean: (tokenType: string) => {
    if (storage.isSupported) {
      storage.remove(tokenType);
    }
  },
};

export default token;
