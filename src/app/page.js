'use client'
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import Image from "next/image";

export default function Home() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/populatecarousel', {method: "GET"});
        if (!response.ok) {
          throw new Error("Network fetching did not work!");
        }
        const data = await response.json();
        console.log(data);
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums: " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
        <div className="w-full min-h-screen flex flex-col gap-10 p-3">

        </div>
    </>
  );
}
