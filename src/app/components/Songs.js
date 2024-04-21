import { Reorder, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";

export default function Songs(props) {
  const [songs, setSongsOrder] = useState(props.songs);

  useEffect(() => {
    setSongsOrder(props.songs);
    console.log(songs);
  }, [props.songs]);

  return (
    <div className="w-full flex flex-col mt-3">
        <Reorder.Group axis="y" onReorder={setSongsOrder} values={songs}>
          <div className="w-[75%] flex flex-col gap-1 h-fit">
            {songs.map((song) => {
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