import React, { createContext, useContext, useState } from 'react';

type YearEdition = '2025' | '2027';

interface YearContextType {
  year: YearEdition;
  setYear: (year: YearEdition) => void;
}

const YearContext = createContext<YearContextType>({
  year: '2027',
  setYear: () => {},
});

export function YearProvider({ children }: { children: React.ReactNode }) {
  const [year, setYear] = useState<YearEdition>('2027');

  return (
    <YearContext.Provider value={{ year, setYear }}>
      {children}
    </YearContext.Provider>
  );
}

export function useYear() {
  return useContext(YearContext);
}
