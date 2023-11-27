import storage from './localStorage';

export const handleLimitedClickStorage = (
  storageKey: string,
  maxViews: number
) => {
  const handleClick = (key: string, value: string) => {
    const storedData: string | null = storage.get(storageKey);
    const previousViews: Record<string, string> = storedData
      ? JSON.parse(storedData)
      : {};
    const newData: Record<string, string> = { ...previousViews, [key]: value };
    const keys = Object.keys(newData);

    if (keys.length > maxViews) {
      const oldestKey = keys.shift();
      if (oldestKey) {
        delete newData[oldestKey];
      }
    }
    storage.set(storageKey, JSON.stringify(newData));
  };

  return handleClick;
};
