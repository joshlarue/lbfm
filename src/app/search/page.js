'use client'
import Header from "../components/Header";
import search from '../assets/search.svg';
import Image from "next/image";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState();
  const updateQuery = (e) => {
    setQuery(e.target.value);
  }
  const sendQuery = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("query", query);
    const response = await fetch('http://localhost:3000/api/search/', {method: 'POST', body: formData});

    // contains returned usernames from substring
    console.log(await response.json());
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <form onSubmit={sendQuery} onChange={updateQuery}>
          <input className='w-[80vw] mt-5 h-10 bg-primary-light rounded-full flex justify-end p-5' />
        </form> 
        <Header searchHeader={true} />
      </div>
    </>
  );
}