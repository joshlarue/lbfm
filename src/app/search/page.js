'use client'
import Header from "../components/Header";
import search from '../assets/search.svg';
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Search() {
  const [itemDisplay, setItemDisplay] = useState();
  const [query, setQuery] = useState();
  const [searchType, setSearchType] = useState('albums');

  const updateQuery = (e) => {
    setQuery(e.target.value);
  }

  const sendQuery = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("query", query);
    formData.append("search_type", searchType);
    const response = await fetch('/api/search/', {method: 'POST', body: formData});

    switch (searchType) {
      case 'users':
        // contains returned usernames from substring
        const userArray = await response.json();
        console.log(userArray);
        setItemDisplay(userArray.returnedUsernames.map((user, index) => {
          return <User user={user} numRatings={userArray.numUserRatings[index]} />
        }));
        break;
      case 'albums':
        const albumArray = await response.json();
        console.log(albumArray);
        setItemDisplay(albumArray.albums.map((album) => {
          return <Album albumTitle={album['album_title']} albumId={album['album_id']} />
        }))
        break;
    }

  }

  return (
    <>
    <div className="w-full h-full flex flex-col p-5 bg-base-dark rounded-b-lg">
      <div className="w-full flex flex-col items-center">
        <form onSubmit={sendQuery} onChange={updateQuery}>
          <input className='text-base-dark w-[80vw] h-10 bg-primary-light rounded-full flex justify-center p-5' />
        </form>
        <header className="w-full py-5 flex justify-end items-center">
          <div className="flex h-[80%] w-full justify-center">
            <div className="flex flex-col justify-center items-center gap-3">
            <span className="">search type:</span>
              <div className="flex gap-3 justify-center items-center">
                <button onClick={() => setSearchType('albums')} className={`flex justify-center items-center text-base-dark font-bold rounded-lg px-3 py-1 ${searchType == 'albums' ? "bg-secondary" : "bg-primary-light"}`}>
                  albums
                </button>
                <button onClick={() => setSearchType('songs')} className={`flex justify-center items-center text-base-dark font-bold rounded-lg px-3 py-1 ${searchType == 'songs' ? "bg-secondary" : "bg-primary-light"}`}>
                  songs
                </button>
                <button onClick={() => setSearchType('users')} className={`flex justify-center items-center text-base-dark font-bold rounded-lg px-3 py-1 ${searchType == 'users' ? "bg-secondary" : "bg-primary-light"}`}>
                  users
                </button>
                <button className={`flex justify-center items-center bg-primary-light text-base-dark font-bold rounded-lg px-3 py-1`}>
                  <Link href="/">home</Link>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
    <div className="w-[80%] self-end flex flex-col items-end pt-5 gap-3">
      {itemDisplay}
    </div>
    </>
  );
}

// TODO: get user profile pics up in here
function User({user, numRatings}) {
  return (
    <Link href={'/user/'+user} className="p-3 bg-base-dark w-full flex justify-end rounded-l-lg font-bold">
      <div className="w-full justify-between flex">
        <div className="flex font-normal">
          <span className="pr-1"># of albums rated:</span>
          <span className="text-accent font-bold">{numRatings}</span>
        </div>
        <div>
          {user}
        </div>
      </div>
    </Link>
  )
}

function Album({albumTitle, albumId}) {
  return (
    <Link href={'/albums/'+albumId} className="p-3 bg-base-dark w-full flex justify-end rounded-l-lg font-bold">
      <div className="w-full justify-end flex">
        <div className="text-right">
          {albumTitle}
        </div>
      </div>
    </Link>
  )
}