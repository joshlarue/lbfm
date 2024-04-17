'use client'
import { useEffect } from "react";
import Carousel from "./components/Carousel";
import Image from "next/image";

export default function Home() {
  let carouselItems;

  useEffect(() => {
    let curAlbum;
    for (let i = 0; i < 3; i++) {
      let carouselAlbums = null;
      for (let j = 0; j < 5; j++) {
        curAlbum = fetch('http://localhost:3000/albums/'+j);
        carouselAlbums.push(curAlbum);
      }
      switch(i) {
        case 0: carouselItems.push(<Carousel title="hot albums" items={carouselAlbums} />); break;
        case 1: carouselItems.push(<Carousel title="trending songs" items={carouselAlbums} />); break;
        case 2: carouselItems.push(<Carousel title="for you" items={carouselAlbums} />); break;
      }
    }

  }
  , [])

  return (
    <>
        <div className="w-full min-h-screen flex flex-col gap-10 p-3">
          {carouselItems}
        </div>
    </>
  );
}
