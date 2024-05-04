'use client'
import { useState, useContext, useEffect } from "react";
import { ToSaveContext } from "../albums/[id]/page";
import sha256 from "sha256";
import Cookies from "js-cookie";

export default function SaveReviewBtn() {
  const { saved, setSaved, songOrder, pressedNumber, album } = useContext(ToSaveContext);
  const userId = Cookies.get('user_id');

  const handleSaved = async () => {
    setSaved(true);
    await fetch('/api/save', {method: "POST", body: JSON.stringify([album, pressedNumber, songOrder, userId])});
  }

  return (
    <>
      <button onClick={() => handleSaved()} className={`w-full p-1 rounded-md bg-primary ${saved ? "bg-secondary text-base font-bold" : null}`}>{saved ? "saved" : "save"}</button>
    </>
  )
}
