'use client'
import { CookiesProvider } from "react-cookie"

export default function App({children}) {
  return (
    <>
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </>
  );
}