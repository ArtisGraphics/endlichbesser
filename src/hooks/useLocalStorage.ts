import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      
      if (item === null) {
        return initialValue;
      }
      
      // Parse stored json or if none return initialValue
      const parsed = JSON.parse(item);
      
      // Handle Date objects in the parsed data
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => {
          if (item.endDate) {
            item.endDate = new Date(item.endDate);
          }
          return item;
        }) as T;
      }
      
      return parsed;
    } catch (error) {
      // If error also return initialValue
      console.log(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
} 