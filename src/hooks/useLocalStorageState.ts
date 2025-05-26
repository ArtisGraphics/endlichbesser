import { useState, useEffect } from "react";
import { getLocalStorage } from "@/utils/localStorage";

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => 
    getLocalStorage(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
} 