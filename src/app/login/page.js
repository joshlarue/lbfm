'use client'
import { useState, createContext, useEffect } from "react";
import { FormEvent } from 'react';
import Login from "./loginComponents/login";
import SignUp from "./loginComponents/signup";

export const UserEntryPageContext = createContext(null);

export default function SignUpForm() {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [signup, setSignup] = useState(true);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (signup) {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      console.log(res.data);
      if (response.status == 500) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      console.log(res.data);

      if (response.status == 500) {
        setError(true);
      } else {
        setError(false);
      }
    }

  }

  return (
    <UserEntryPageContext.Provider value={{handleSubmit, handleEmailChange, handleUserNameChange, handlePasswordChange, setSignup, signup, error }}>
      {signup ? 
        <SignUp />
      :
        <Login />
      }
    </UserEntryPageContext.Provider>
  )
}