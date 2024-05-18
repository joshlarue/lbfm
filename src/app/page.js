'use client'
import { useEffect, useState, useLayoutEffect, createContext } from "react";
import dynamic from 'next/dynamic';
import Carousel from "./components/Carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  const [display, setDisplay] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    try {
      const response = fetch('/api/populatecarousel', {
        method: 'POST',
        headers: {"userId": Cookies.get("user_id")}
      });
      response.then((response) => {
        const responseJson = response.json();
        responseJson.then((data) => {
          console.log("data!", data);
          setDisplay(
            <>
              <Carousel items={data[0]} title={"top rated albums by community"} />
              <Carousel items={data[1]} title={"albums you haven't rated"} />
              <Carousel items={data[2]} title={"albums you've rated"} />
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