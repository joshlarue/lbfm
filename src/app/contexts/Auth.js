'use client'
import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get('user_id')) {
      router.push('/login');
    }
  }, []);

  return <AuthContext.Provider>{children}</AuthContext.Provider>
}