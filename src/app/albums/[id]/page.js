'use client'
import Stars from "@/app/components/Stars";

// used before I have DB connected
const firstCarousel = [
  {
    itemName: "For All the Dogs",
    artistName: "Drake",
    rating: "4.1",
    id: 1,
  },
  {
    itemName: "Punisher",
    artistName: "Phoebe Bridgers",
    rating: "4.9",
    id: 2,
  },
  {
    itemName: "Hardcore Heaven",
    artistName: "Alice Gas",
    rating: "4.7",
    id: 3,
  },
]

const secondCarousel = [
  {
    itemName: "Midnight Echoes",
    artistName: "Luna Noir",
    rating: "4.5",
    id: 4,
  },
  {
    itemName: "Dreamscape Symphony",
    artistName: "Celeste Moon",
    rating: "4.3",
    id: 5,
  },
  {
    itemName: "Neon Reverie",
    artistName: "Nova Pulse",
    rating: "4.8",
    id: 6,
  },
]

const thirdCarousel = [
  {
    itemName: "Stardust Serenade",
    artistName: "Aurora Sky",
    rating: "4.6",
    id: 7,
  },
  {
    itemName: "Luminescent Dreams",
    artistName: "Nova Celestia",
    rating: "4.4",
    id: 8,
  },
  {
    itemName: "Ethereal Echoes",
    artistName: "Luna Solstice",
    rating: "4.7",
    id: 9,
  },    
]
const Albums = [firstCarousel, secondCarousel, thirdCarousel];



export default function Page(albumId) {
  let id = albumId.params.id;
  // use album ID to populate album page
  for (let i = 0; i < Albums.length; i++) {
    for (let j = 0; j < Albums[i].length; j++) {
      if (Albums[i][j].id == id) {
        console.log(Albums[i][j]);
      }
    }
  }

  return (
    <>
      <div className="border-2 w-full">
        <div className="flex flex-col w-[50%]">
          <p>community rating</p>
          <Stars numStars={2} />
        </div>
      </div>
    </>
  )
}