import { motion } from "framer-motion";
import { usePositionReorder } from './usePositionReorder';
import { useMeasurePosition } from './useMeasurePosition';
import { useState } from "react";

export default function Songs(props) {
  const [updatedList, updatePosition, updateOrder] = usePositionReorder(props.songs);

  return (
    <div className="w-full flex flex-col mt-3">
      <div className="w-[60%] flex flex-col gap-1 h-fit">
        {props.songs.map((song, index) => {
          console.log(song);
          return (
            <Song 
              song={song}
              key={song.name}
              index={index}
              updateOrder={updateOrder}
              updatePosition={updatePosition}
              name={song.name}
            />
          )
        })}
      </div>
    </div>
  )
}

function Song({updateOrder, updatePosition, index, song}) {
  const [isDragged, setIsDragged] = useState(false);
  const itemRef = useMeasurePosition(pos => updatePosition(index, pos));

  return (
    <div>
      <motion.div 
        drag="y"
        className="bg-[#242024] p-2 rounded-tr-md rounded-br-md flex items-center shadow-sm justify-between" 
        style={{zIndex: isDragged ? 2:1}}
        dragConstraints={{top: 0, bottom: 0}}
        dragElastic={1}
        ref={itemRef}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        animate={{scale: isDragged ? 1.05 : 1}}
        onViewportBoxUpdate={(_, delta) => {
          isDragged && updateOrder(index, delta.y.translate);
        }}
        >
        <p className="text-sm">{song.song_title}</p>
        <p className="text-s text-accent font-extrabold">{song.avg_rating}</p>
      </motion.div>
    </div>
  )
}