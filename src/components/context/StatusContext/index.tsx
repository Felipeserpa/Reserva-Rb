// StatusContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type StatusContextType = {
  isOnline: boolean;
  toggleStatus: () => void;
};

const StatusContext = createContext<StatusContextType | undefined>(undefined);

type StatusProviderProps = {
  children: ReactNode;
};

export const StatusProvider: React.FC<StatusProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);

  const toggleStatus = () => {
    setIsOnline((prev) => !prev);
  };

  return (
    <StatusContext.Provider value={{ isOnline, toggleStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};

