import React, { ReactNode } from "react";

import { UserProvider } from "./user";
import { AuthProvider } from "./auth";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <UserProvider>
    <AuthProvider>{children}</AuthProvider>
  </UserProvider>
);
