'use client'
import Stars from "@/app/components/Stars";
import Songs from "@/app/components/Songs";
import Album from "@/app/components/Album";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page(albumId) {
  let id = albumId.params.id;
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  // use album ID to populate album page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getalbum/'+id, {method: "GET"});
        const responseData = await response.json();

        setAlbum(responseData[0]);
        setSongs(responseData);

      } catch (error) {
        console.error("Error fetching albums: " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-left">
        <div className="w-full flex">
          <div className="flex flex-col w-[60%]">
            <div className="p-3 flex flex-col gap-1">
              <p>community rating</p>
              <Stars numStars={album.avg_rating} width={25} gap={1.5} />
            </div>
            <Album album={album} />

          </div>
          <div className="flex flex-col w-full items-left mt-[10vh] mx-[5vw] gap-1">
            <p className="text-sm">have your say. drag the songs to rank them.</p>
          </div>
        </div>
        <Songs songs={songs} />

      </div>

    </>
  )
}