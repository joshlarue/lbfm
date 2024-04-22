import { Reorder, useMotionValue } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { ToSaveContext } from "../albums/[id]/page";

export default function Songs(props) {
  const { songOrder, setSongOrder } = useContext(ToSaveContext);

  // useEffect(() => {
  //   setSongsOrder(props.songs);
  // }, [props.songs]);
  const handleReorder = (e) => {
    setSongOrder(e);
  }
  return (
    <div className="w-full flex flex-col mt-3">
        <Reorder.Group axis="y" onReorder={handleReorder} values={songOrder}>
          <div className="w-[75%] flex flex-col gap-1 h-fit">
            {songOrder.map((song) => {
              return (
                  <Song 
                    song={song}
                    key={song.song_id}
                  />
              )
            })}
          </div>
        </Reorder.Group>
      </div>
  )
}

function Song(props) {
  const y = useMotionValue(0);

  return (
    <Reorder.Item
      style={{ y }}
      value={props.song}
      className="bg-base-dark p-2 rounded-tr-md rounded-br-md flex items-center shadow-sm justify-between">

      <p className="text-sm">{props.song.song_title}</p>
      <p className="text-s text-accent font-extrabold">{props.song.avg_rating}</p>
    </Reorder.Item>
  )
}