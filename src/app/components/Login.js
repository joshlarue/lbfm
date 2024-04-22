'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '../page';

export default function Login() {
  const { setLoggedIn } = useContext(Auth);
  const router = useRouter();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePass = (e) => {
    setPass(e.target.value);
  }

  async function handleSubmit() {

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pass }),
    })

    if (response.ok) {
      setLoggedIn(true);
    } else {
      // Handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full min-h-[100vh] fixed z-50 top-0 left-0 bottom-0 right-0 bg-base flex flex-col gap-3 justify-center items-center'>
      <input onChange={handleChangeEmail} type="email" name="email" placeholder="Email" required className='bg-base-dark p-2 rounded-md'/>
      <input onChange={handleChangePass} type="password" name="password" placeholder="Password" required className='bg-base-dark p-2 rounded-md' />
      <button onSubmit={handleSubmit} type="submit">Login</button>
    </form>
  )
}