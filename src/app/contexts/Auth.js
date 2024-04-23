'use client'
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  return <AuthContext.Provider value={ {loggedIn, setLoggedIn, userId, setUserId} }>{children}</AuthContext.Provider>
}