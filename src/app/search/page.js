'use client'
import Header from "../components/Header";
import search from '../assets/search.svg';
import Image from "next/image";
import { useState } from "react";

export default function Search() {
  const [userDisplay, setUserDisplay] = useState();
  const [query, setQuery] = useState();

  const updateQuery = (e) => {
    setQuery(e.target.value);
  }
  const sendQuery = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("query", query);
    const response = await fetch('/api/search/', {method: 'POST', body: formData});

    // contains returned usernames from substring
    const userArray = await response.json();
    console.log(userArray);
    setUserDisplay(userArray.returnedUsernames.map((user, index) => {
      return <User user={user} numRatings={userArray.numUserRatings[index]} />
    }));
  }

  return (
    <>
    <div className="w-full h-full flex flex-col p-5 bg-base-dark">
      <div className="w-full flex flex-col items-end">
        <form onSubmit={sendQuery} onChange={updateQuery}>
          <input className='w-[80vw] h-10 bg-primary-light rounded-full flex justify-end p-5' />
        </form> 
        <Header searchHeader={true} />
      </div>
    </div>
    <div className="w-[80%] self-end flex flex-col items-end pt-5 gap-3">
      {userDisplay}
    </div>
    </>
  );
}

// TODO: get user profile pics up in here
function User({user, numRatings}) {
  return (
    <div className="p-3 bg-base-dark w-full flex justify-end rounded-l-lg font-bold">
      <div className="w-full justify-between flex">
        <div className="flex font-normal">
          <span className="pr-1"># of albums rated:</span>
          <span className="text-accent font-bold">{numRatings}</span>
        </div>
        <div>
          {user}
        </div>
      </div>
    </div>
  )
}