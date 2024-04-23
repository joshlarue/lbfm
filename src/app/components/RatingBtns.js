import { useState, useEffect, useContext } from "react";
import { ToSaveContext } from "../albums/[id]/page";

export default function RatingBtns() {
  const { pressedNumber, setPressedNumber, setSaved, albumRating } = useContext(ToSaveContext);
  
  const handlePressed = (rating) => {
    setPressedNumber(rating);
    setSaved(false);
  }

  // send rating to backend to be inserted into user review

  return (
    <div className="w-full flex justify-between border-[1px] border-primary-light rounded-md">
      <button onClick={() => handlePressed(1)} className={`rounded-tl-md rounded-bl-md flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressedNumber === 1 ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>1</button>
      <button onClick={() => handlePressed(2)} className={`flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressedNumber === 2 ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>2</button>
      <button onClick={() => handlePressed(3)} className={`flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressedNumber === 3 ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>3</button>
      <button onClick={() => handlePressed(4)} className={`flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressedNumber === 4 ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>4</button>
      <button onClick={() => handlePressed(5)} className={`rounded-tr-md rounded-br-md flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressedNumber === 5 ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>5</button>
    </div>
  )
}