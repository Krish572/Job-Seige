import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  showSignin: false,
  setShowSignin: () => {},
  isnew: false,
  setIsnew: () => {},
  isAuthenticted: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [showSignin, setShowSignin] = useState(false);
  const [isnew, setIsnew] = useState(false);
  const [isAuthenticted, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        showSignin,
        setShowSignin,
        isnew,
        setIsnew,
        isAuthenticted,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
