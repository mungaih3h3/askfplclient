import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getStorageValue<T>(key: string, defaultValue: T): T {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved === null) return defaultValue;
  return JSON.parse(saved);
}

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() =>
    getStorageValue<T>(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
