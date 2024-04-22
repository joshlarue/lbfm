import { useState, useContext } from "react";
import { ToSaveContext } from "../albums/[id]/page";

export default function SaveReviewBtn() {
  const { saved, setSaved, songOrder } = useContext(ToSaveContext);

  const handleSaved = async () => {
    setSaved(true);
    await fetch('http://localhost:3000/api/save', {method: "POST", body: JSON.stringify(songOrder)});
  }

  return (
    <>
      <button onClick={() => handleSaved()} className={`w-full p-1 rounded-md bg-primary ${saved ? "bg-secondary text-base font-bold" : null}`}>{saved ? "saved" : "save"}</button>
    </>
  )
}