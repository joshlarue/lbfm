import { serialize } from 'cookie'
import { isAuthenticated } from '@/app/Auth';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  const session = await getSession(req)

  const request = await req.body.json();
  const pass = request.split("&password=")[2];
  const email = request.split("email=").split("&")[1];

  if (pass === "hello" && email == "guest@jahsauce.cloud") {
    const sessionData = req.body;
    const encryptedSessionData = encrypt(sessionData);
  
    const cookie = serialize('session', encryptedSessionData, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
    isAuthenticated = true;
    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ message: 'Successfully set cookie!' });
    console.log("yessir");
  } else {
    res.status(403);
  }
  
}