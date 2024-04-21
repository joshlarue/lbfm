import { useState, useEffect } from "react";

export default function RatingBtns() {
  const [pressed, setPressed] = useState([false, false, false, false, false]);
  
  const handlePressed = (index) => {
    const newPressed = pressed.map((item, i) => i === index ? true : false);
    setPressed(newPressed);
  }

  // send rating to backend to be inserted into user review

  return (
    <div className="w-full flex justify-between border-[1px] border-primary-light rounded-md">
      <button onClick={() => handlePressed(0)} className={`rounded-tl-md rounded-bl-md flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressed[0] ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>1</button>
      <button onClick={() => handlePressed(1)} className={`flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressed[1] ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>2</button>
      <button onClick={() => handlePressed(2)} className={`flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressed[2] ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>3</button>
      <button onClick={() => handlePressed(3)} className={`flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressed[3] ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>4</button>
      <button onClick={() => handlePressed(4)} className={`rounded-tr-md rounded-br-md flex grow text-center items-center justify-center p-2 bg-base-dark text-xs border-primary-light ${pressed[4] ? 'bg-primary-light font-bold text-base':'bg-base-dark'}`}>5</button>
    </div>
  )
}