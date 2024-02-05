import React from 'react';
import { StatusProvider } from '../statusContext/StatusContext';

export const AdminStatusProvider = ({ children }) => {
  return <StatusProvider>{children}</StatusProvider>;
};
