const storage = {
  isSupported:
    typeof window.localStorage !== 'undefined' && window.localStorage !== null,

  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
      return null;
    } catch (error) {
      return null;
    }
  },

  set: (key: string, item: string) => {
    const value = JSON.stringify(item);
    localStorage.setItem(key, value);
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default storage;
