'use client'
import Stars from "@/app/components/Stars";
import { useState, useEffect } from "react";

export default function Page(albumId) {
  let id = albumId.params.id;
  const [album, setAlbum] = useState({});
  // use album ID to populate album page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getalbum/'+id, {method: "GET"});
        const responseData = await response.json();
        
        setAlbum(responseData[0]);
      } catch (error) {
        console.error("Error fetching albums: " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="flex flex-col w-[60%]">
          <div className="p-3 flex flex-col gap-1">
            <p>community rating</p>
            <Stars numStars={album.avg_rating} width={25} gap={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-[60vw] h-[60vw] bg-primary rounded-tr-md rounded-br-md"></div>
            <div className="flex flex-col p-3">
              <h3 className="">{album.album_title}</h3>
              <p className="text-sm">{album.artist_name}</p>
              <p>{album.date}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-left mt-[10vh] ml-[5vw] gap-1">
          <p>have your say</p>
          <Stars numStars={2} width={20} gap={1} />
        </div>
      </div>
    </>
  )
}