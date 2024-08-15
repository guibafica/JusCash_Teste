import React, { ReactNode } from "react";
import { UserProvider } from "./user";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);
