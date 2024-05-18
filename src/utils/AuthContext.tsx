import React, { createContext, useState } from 'react';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userdetailFk: number | null; // Allow null for optional values
  token: string | null; // Allow null for optional values
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userdetailFk: null,
  token: null,
});