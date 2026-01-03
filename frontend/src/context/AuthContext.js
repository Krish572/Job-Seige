import { createContext } from "react";

export const AuthContext = createContext({
    showSignin : false,
    setShowSignin : () => {},
    isnew : false,
    setIsnew : () => {}
})