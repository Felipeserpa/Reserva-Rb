import { createContext, useContext, useState } from 'react';

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  const toggleStatus = () => {
    setIsOnline((prevStatus) => !prevStatus);
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
    throw new Error('useStatus deve ser usado dentro de um StatusProvider');
  }
  return context;
};
