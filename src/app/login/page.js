'use client'
import { useState, createContext, useEffect, useContext } from "react";
import { FormEvent } from 'react';
import LoginComponent from "./loginComponents/LoginComponent";
import SignupComponent from "./loginComponents/SignupComponent";
import { useAuth } from "../contexts/Auth";
import { redirect } from "next/navigation"; 
import { useRouter } from 'next/router';
import sha256 from "sha256";

export const UserEntryPageContext = createContext(null);

export default function SignUpForm() {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const { loggedIn, setLoggedIn, setUserId } = useAuth();

  if (loggedIn) {
    redirect("http://localhost:3000/");
  }

  // get user input
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(sha256(username));
    setUserId(sha256(username));
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (loginPage) {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      console.log(res.data);
      if (response.status == 500) {
        setError(true);
      } else {
        setLoggedIn(true);
        redirect("http://localhost:3000");
        setError(false);
      }
    } else {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      console.log(res.data.data);
      if (res.data.data === 'authenticated') {
        setLoggedIn(true);
      }

      if (response.status == 500) {
        setError(true);
      } else {
        setError(false);
      }
    }

  }

  return (
    <UserEntryPageContext.Provider value={{ handleSubmit, handleEmailChange, handleUserNameChange, handlePasswordChange, setLoginPage, setLoggedIn, error }}>
      {loginPage ? 
        <LoginComponent />
      :
        <SignupComponent />
      }
    </UserEntryPageContext.Provider>
  )
}