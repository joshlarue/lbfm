'use client'
import { useEffect, useState, useLayoutEffect, createContext } from "react";
import Carousel from "./components/Carousel";
import Image from "next/image";
import { redirect } from "next/navigation";
import Login from "./components/Login";

export const Auth = createContext();

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [albums, setAlbums] = useState([]);
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/populatecarousel', {method: "GET"});
        const responseData = await response.json();

        setAlbums(responseData);
        let firstCarouselData = responseData.slice(0, 7);
        let secondCarouselData = responseData.slice(7, 14);
        let thirdCarouselData = responseData.slice(14, 21);
        console.log(firstCarouselData);
        console.log(secondCarouselData);
        console.log(thirdCarouselData);
        
        setDisplay(
          <>
            <Carousel items={firstCarouselData} title={"hot albums"} />
            <Carousel items={secondCarouselData} title={"trending songs"} />
            <Carousel items={thirdCarouselData} title={"for you"} />
          </>


        );

      } catch (error) {
        console.error("Error fetching albums: " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Auth.Provider value={{setLoggedIn}}>
        {
          loggedIn ?
            <div className="w-full min-h-screen flex flex-col gap-10 p-3">
              {display}
            </div>
          : 
          <>
            <Login />
            <div className="w-full min-h-screen flex flex-col gap-10 p-3">
              {display}
            </div>
          </>
        }
      </Auth.Provider>
    </>
  );
}
