import React, { ReactNode } from "react";

import { UserProvider } from "./user";
import { AuthProvider } from "./auth";
import { LeadProvider } from "./lead";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <UserProvider>
    <AuthProvider>
      <LeadProvider>{children}</LeadProvider>
    </AuthProvider>
  </UserProvider>
);
