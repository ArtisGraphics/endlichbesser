"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/localStorage";

interface EmpfehlungenContextProps {
  anzahlEmpfehlungen: number;
  setAnzahlEmpfehlungen: (value: number) => void;
}

const EmpfehlungenContext = createContext<EmpfehlungenContextProps | undefined>(
  undefined,
);

export const EmpfehlungenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // States mit lokalen Speicherwerten initialisieren
  const [anzahlEmpfehlungen, setAnzahlEmpfehlungen] = useState<number>(
    getLocalStorage("anzahlEmpfehlungen", 0),
  );

  // Automatische Speicherung in localStorage
  useEffect(() => {
    const data = {
      anzahlEmpfehlungen,
    };
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, [anzahlEmpfehlungen]);
  return (
    <EmpfehlungenContext.Provider
      value={{
        anzahlEmpfehlungen,
        setAnzahlEmpfehlungen,
      }}
    >
      {children}
    </EmpfehlungenContext.Provider>
  );
};

export const useEmpfehlungen = () => {
  const context = useContext(EmpfehlungenContext);
  if (!context)
    throw new Error(
      "useEmpfehlungen must be used within a EmpfehlungenProvider",
    );
  return context;
};
