import { createContext, useState, useContext, ReactNode } from "react";

// Define el tipo UserContext
type UserContext = {
  email: string;
  admin: boolean;
  firstName: string;
  lastName: string;
  userData: string;
  sessionKey: string;
  userID: string;
};

// Define un nuevo tipo que extienda UserContext con setUserContext
type AppContextType = {
  userContext: UserContext | undefined;
  setUserContext: React.Dispatch<React.SetStateAction<UserContext | undefined>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children } : { children: ReactNode }) {
  const [userContext, setUserContext] = useState<UserContext | undefined>(undefined);

  return (
    <AppContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
