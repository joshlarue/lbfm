import Image from "next/image"
import { useState } from "react";
import star from '@/app/assets/star.svg';
import blankstar from '@/app/assets/blankstar.svg';

export default function Stars(props) {
  let numStars = props.numStars;

  const createStars = (numStars) => {
    let stars = [];
    for (let i = 0; i < numStars && i < 5; i++) {
      stars.push(<Image 
                    src={star} 
                    key={stars.length} />)
    }
    for (stars.length; stars.length < 5;) {
      stars.push(<Image 
                  src={blankstar} 
                  key={stars.length} />)
    }


    return stars;
  }

  let stars = createStars(numStars);
  
  return (
    <>
      <div className="w-full h-[100vh]">{stars}</div>
    </>
  )
}