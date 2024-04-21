import { useState, useContext } from "react";
import { ToSaveContext } from "../albums/[id]/page";

export default function SaveReviewBtn() {
  const { saved, setSaved } = useContext(ToSaveContext);

  const handleSaved = () => {
    setSaved(true);
  }

  return (
    <>
      <button onClick={() => handleSaved()} className={`w-full p-1 rounded-md bg-primary ${saved ? "bg-secondary text-base font-bold" : null}`}>{saved ? "saved" : "save"}</button>
    </>
  )
}