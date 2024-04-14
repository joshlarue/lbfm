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


  return (
    <>
      <div className="w-full min-h-screen">
        <Carousel title="hot albums" items={firstCarousel} />
      </div>
    </>
  );
}
