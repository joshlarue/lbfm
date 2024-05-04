'use client'
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(10);
  const [songsToDisplay, setSongsToDisplay] = useState();

  useEffect(() => {
    getAlbums();
  }, [lowerLimit]);

  const getAlbums = async () => {
    let formData = new FormData();
    formData.append("lower_limit", lowerLimit);
    formData.append("upper_limit", upperLimit);
    const response = await fetch('/api/getsongpage', {body: formData, method: 'POST'});
    const responseJson = await response.json();
    console.log(responseJson);
    setSongsToDisplay(responseJson.songPageResults.map((song) => {
      return <Song img={song.album_image} artist={song.artist_name} date={song.date_released} title={song.song_title} numRankings={song.num_rankings} ranking={song.avg_ranking} id={song.album_id} />
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
      <Header highlight={'songs'}/>
      <div className="w-full flex justify-center bg-base-dark py-5 mb-5">
        <h2 className="text-xl font-bold text-secondary">discover song people are rating</h2>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-5">
        {songsToDisplay}
      </div>
      <div className="w-full flex justify-between mt-5 px-3">
        <button onClick={handlePrevPage} type='button' className="bg-base-dark px-3 py-2 rounded-lg">previous page</button>
        <button onClick={handleNextPage} type='button' className="bg-base-dark px-3 py-2 rounded-lg">next page</button>
      </div>
    </>
  );
}

function Song({id, img, title, artist, date, numRankings, ranking}) {
  return (
    <Link href={`/albums/${id}`} className="flex gap-5 bg-primary-light rounded-r-lg shadow-md">
      <div className="bg-primary w-[50vw] h-[50vw] rounded-r-lg relative">
        <Image src={img} className="object-cover rounded-r-lg shadow-md" fill='true' />
      </div>
      <div className="flex flex-col flex-shrink w-[40vw] py-2">
        <div className="text-md text-base-dark font-bold">{title}</div>
        <div className="text-sm font-bold text-base pb-1">{artist}</div>
        <div className="text-sm text-base pb-2">{date.slice(0, 10)}</div>
        <div className="text-sm text-base-dark">{ranking == null ? '' : <>average ranking: <span className="font-bold">{parseFloat(ranking).toFixed(1)}</span></>}</div>
        <div className="text-sm"><span className="text-base-dark"># of rankings: </span><span className="text-base-dark font-bold">{numRankings}</span></div>
      </div>
    </Link>
  );
}