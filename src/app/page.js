'use client'
import { useEffect, useState, useLayoutEffect, createContext } from "react";
import Carousel from "./components/Carousel";
import Image from "next/image";
import { redirect } from "next/navigation"; 
import { AuthProvider, useAuth } from "./contexts/Auth";
import { parseCookies } from "./actions/parseCookies";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  const [display, setDisplay] = useState([]);
  const { loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('user_id')) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    try {
      const response = fetch('/api/populatecarousel', {cache: 'no-store'});
      
      response.then((response) => {
        const responseJson = response.json();
        responseJson.then((data) => {
          setDisplay(
            <>
              <Carousel items={data.slice(0, 7)} title={"hot albums"} />
              <Carousel items={data.slice(7, 14)} title={"trending songs"} />
              <Carousel items={data.slice(14, 21)} title={"for you"} />
            </>
          );
        })
      });
    } catch (error) {
      console.error("Error fetching albums: " + error);
    }
  }

  const handleLogOut = () => {
    Cookies.remove('user_id');
    router.push('/login');
  }
  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex flex-col gap-10 p-3">
        {display}
        <button onClick={handleLogOut} className="p-2 bg-base-dark font-bold text-primary-light">log out</button>
      </div>
      <Link href="/addalbum" className="fixed bottom-10 right-10 bg-base-dark text-4xl rounded-full p-3 px-4">+</Link>
    </>
  );
}