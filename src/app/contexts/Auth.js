'use client'
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return <AuthContext.Provider value={ {loggedIn, setLoggedIn} }>{children}</AuthContext.Provider>
}