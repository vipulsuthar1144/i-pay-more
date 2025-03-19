import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("UseLocalStorage getValue :: " + key, error);
      return initialValue;
    }
  });

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = typeof window !== "undefined" ? localStorage.getItem(key) : null;
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error("UseLocalStorage sync error :: " + key, error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("storage")); // 🔹 Trigger storage change event manually
    } catch (error) {
      console.error("UseLocalStorage setValue :: " + key, error);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(new Event("storage")); // 🔹 Trigger update
    } catch (error) {
      console.error(`UseLocalStorage removeItem error :: ${key}`, error);
    }
  };

  return [storedValue, setValue, removeItem] as const;
};

export default useLocalStorage;
