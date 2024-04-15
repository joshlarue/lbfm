'use client'
import Stars from "@/app/components/Stars";
import { ST } from "next/dist/shared/lib/utils";

// used before I have DB connected
const firstCarousel = [
  {
    itemName: "For All the Dogs",
    artistName: "Drake",
    rating: 4.1,
    id: 1,
    songs: 10,
  },
  {
    itemName: "Punisher",
    artistName: "Phoebe Bridgers",
    rating: 4.9,
    id: 2,
    songs: 10,
  },
  {
    itemName: "Hardcore Heaven",
    artistName: "Alice Gas",
    rating: 4.7,
    id: 3,
    songs: 10,
  },
]

const secondCarousel = [
  {
    itemName: "Midnight Echoes",
    artistName: "Luna Noir",
    rating: 4.5,
    id: 4,
  },
  {
    itemName: "Dreamscape Symphony",
    artistName: "Celeste Moon",
    rating: 4.3,
    id: 5,
    songs: 10,
  },
  {
    itemName: "Neon Reverie",
    artistName: "Nova Pulse",
    rating: 4.8,
    id: 6,
    songs: 10,
  },
]

const thirdCarousel = [
  {
    itemName: "Stardust Serenade",
    artistName: "Aurora Sky",
    rating: 4.6,
    id: 7,
    songs: 10,
  },
  {
    itemName: "Luminescent Dreams",
    artistName: "Nova Celestia",
    rating: 4.3,
    id: 8,
    songs: 10,
  },
  {
    itemName: "Ethereal Echoes",
    artistName: "Luna Solstice",
    rating: 4.7,
    id: 9,
    songs: 10,
  },    
]
const Albums = [firstCarousel, secondCarousel, thirdCarousel];



export default function Page(albumId) {
  let id = albumId.params.id;
  // use album ID to populate album page
  const findAlbum = () => {
    for (let i = 0; i < Albums.length; i++) {
      for (let j = 0; j < Albums[i].length; j++) {
        if (Albums[i][j].id == id) {
          return Albums[i][j];
        }
      }
    }
  }

  let album = findAlbum();

  return (
    <>
      <div className="w-full flex">
        <div className="flex flex-col w-[60%]">
          <div className="p-3 flex flex-col gap-1">
            <p>community rating</p>
            <Stars numStars={album.rating} width={25} gap={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-[60vw] h-[60vw] bg-primary rounded-tr-md rounded-br-md"></div>
            <div className="flex flex-col p-3">
              <h3 className="">{album.itemName}</h3>
              <p className="text-sm">{album.artistName}</p>
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