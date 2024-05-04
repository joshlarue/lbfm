import { Reorder, useMotionValue } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { ToSaveContext } from "../albums/[id]/page";

export default function Songs(props) {
  const { songs, setSongs, songOrder, setSongOrder, setSaved } = useContext(ToSaveContext);

  useEffect(() => {
    setSongOrder(songs.map((song) => song.track_number));
  }, []);
  
  const handleReorder = (e) => {
    setSongs(e);
    setSaved(false);
  }

  useEffect(() => {
    setSongOrder(songs.map((song) => song.track_number));
  }, [songs]);

  return (
    <div className="w-full flex flex-col mt-3">
      <p className="mt-5 mb-2 ml-3 text-xs">drag to rank</p>
      <p className="-mt-2 mb-1 ml-3 text-xs">🡣</p>
        <Reorder.Group axis="y" onReorder={handleReorder} values={songs}>
          <div className="w-[75%] flex flex-col gap-1 h-fit">
            {songs.map((song, index) => {
              return (
                  <Song 
                    song={song}
                    key={song.song_id}
                    index={index+1}
                  />
              )
            })}
          </div>
        </Reorder.Group>
      </div>
  )
}

function Song({song, index}) {
  const y = useMotionValue(0);

  return (
    <Reorder.Item
      style={{ y }}
      value={song}
      className="bg-base-dark p-2 rounded-tr-md rounded-br-md flex items-center shadow-sm justify-between">

      <p className="text-sm">{song.song_title}</p>
      <p className="text-s text-primary-light font-extrabold">{index}</p>
    </Reorder.Item>
  )
}