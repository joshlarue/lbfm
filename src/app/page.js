import Carousel from "./components/Carousel";
import Image from "next/image";


export default function Home() {

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


  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-10 p-3">
        <Carousel title="hot albums" items={firstCarousel} />
        <Carousel title="trending songs" items={secondCarousel} />
        <Carousel title="for you" items={thirdCarousel} />
      </div>
    </>
  );
}
