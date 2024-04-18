'use client'
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import Image from "next/image";

export default function Home() {
  const [albums, setAlbums] = useState([]);
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/populatecarousel', {method: "GET"});
        const responseData = await response.json();

        setAlbums(responseData);
        console.log(responseData[0]);
        
        setDisplay(<Carousel items={responseData} title={"hot albums"} />);

      } catch (error) {
        console.error("Error fetching albums: " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
        <div className="w-full min-h-screen flex flex-col gap-10 p-3">
          {display}
        </div>
    </>
  );
}
