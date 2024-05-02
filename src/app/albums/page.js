'use client'
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(10);
  const [albumsToDisplay, setAlbumsToDisplay] = useState();

  useEffect(() => {
    getAlbums();
  }, [lowerLimit]);

  const getAlbums = async () => {
    let formData = new FormData();
    formData.append("lower_limit", lowerLimit);
    formData.append("upper_limit", upperLimit);
    const response = await fetch('/api/getalbumpage', {body: formData, method: 'POST'});
    const responseJson = await response.json();
    setAlbumsToDisplay(responseJson.albumPageResults.map((album) => {
      console.log(album.album_id);
      return <Album img={album.album_image} artist={album.artist_name} date={album.date_released} title={album.album_title} numReviews={album.num_reviews} rating={album.avg_rating} id={album.album_id} />
    }));
  };

  const handleNextPage = async () => {
    setLowerLimit(upperLimit+1);
    setUpperLimit(lowerLimit+10);
  }
  const handlePrevPage = async () => {
    setUpperLimit(lowerLimit-1);
    setLowerLimit(upperLimit-10);
  }

  return (
    <>
      <Header highlight={'albums'}/>
      <div className="w-full flex justify-center bg-base-dark py-5 mb-5">
        <h2 className="text-xl font-bold text-secondary">discover albums people are rating</h2>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-5">
        {albumsToDisplay}
      </div>
      <div className="w-full flex justify-between mt-5 px-3">
        <button onClick={handlePrevPage} type='button' className="bg-base-dark px-3 py-2 rounded-lg">previous page</button>
        <button onClick={handleNextPage} type='button' className="bg-base-dark px-3 py-2 rounded-lg">next page</button>
      </div>
    </>
  );
}

function Album({id, img, title, artist, date, numReviews, rating}) {
  return (
    <Link href={`/albums/${id}`} className="flex gap-5 bg-primary-light rounded-r-lg shadow-md">
      <div className="bg-primary w-[50vw] h-[50vw] rounded-r-lg relative">
        <Image src={img} className="object-cover rounded-r-lg shadow-md" fill='true' />
      </div>
      <div className="flex flex-col flex-shrink w-[40vw] py-2">
        <div className="text-md text-base-dark font-bold">{title}</div>
        <div className="text-sm">{artist}</div>
        <div className="text-sm">{date}</div>
        <div className="text-sm">number of reviews: {numReviews}</div>
        <div className="text-sm text-accent font-bold">{rating}</div>
      </div>
    </Link>
  );
}