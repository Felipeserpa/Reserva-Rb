import React from 'react';
import { StatusProvider } from '../statusContext/StatusContext';

export const ClientStatusProvider = ({ children }) => {
  return <StatusProvider>{children}</StatusProvider>;
};
