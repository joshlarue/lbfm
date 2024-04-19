'use client'
import Stars from "@/app/components/Stars";
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
            <div className="flex flex-col gap-1">
              <div className="w-[60vw] bg-primary relative rounded-tr-md rounded-br-md shadow-md">
                <div className="w-[60vw] h-[60vw] bg-primary relative rounded-tr-md rounded-br-md"><Image src={album.album_image} fill='true' className="shadow-md object-cover rounded-tr-md rounded-br-md" alt={album.album_title} /></div>
                <div className="flex flex-col p-3">
                  <h3 className="w-[50vw]">{album.album_title}</h3>
                  <p className="text-sm">{album.artist_name}</p>
                  <p>{album.date}</p>
                </div>
              </div>

            </div>
          </div>
          <div className="flex flex-col w-full items-left mt-[10vh] mx-[5vw] gap-1">
            <p className="text-sm">have your say. drag the songs to rank them.</p>
          </div>
        </div>
      <div className="w-full flex flex-col mt-3">
        <div className="w-[60%] flex flex-col gap-1">
          {songs.map((song, index) => {
            return <div className="bg-[#242024] p-2 rounded-tr-md rounded-br-md flex items-center shadow-sm justify-between" key={index}><p className="text-sm">{song.song_title}</p><p className="text-s text-accent font-extrabold">{song.avg_rating}</p></div>
          })}
        </div>
      </div>
      </div>

    </>
  )
}