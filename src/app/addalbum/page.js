'use client'
import Link from "next/link";
import Header from "../components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Add() {
  const router = useRouter();
  const [error, setError] = useState();
  const [spotifyLink, setSpotifyLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("album_link", spotifyLink);

    const res = await fetch("/api/addalbum", {method: "POST", body: formData});
    const response = await res.json();
    console.log(res);
    if (res.status === 200) {
      setError('');
      router.push(`/albums/${response.albumId}`);
    } else {
      setError("that didn't seem to work; try again?");
    }
  }

  const handleChange = (e) => {
    setSpotifyLink(e.target.value);
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="w-full flex flex-col h-[50vh] justify-center items-end gap-5 pr-5">
        <input onChange={handleChange} type='text' placeholder="spotify link to album" className="p-2 text-accent bg-base-dark rounded-lg"></input>
        <button type="submit" className="p-2 px-3 bg-secondary text-base-dark font-bold rounded-lg">add album</button>
        <Link href="/" className="-mt-2 p-2 px-3 bg-base-dark text-secondary font-bold rounded-lg">home</Link>
        {error !== '' ? <div className="bg-accent text-base-dark font-bold p-3 rounded-lg">{error}</div>: <></>}
      </form>
    </>
  )
}