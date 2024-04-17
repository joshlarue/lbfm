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
                    key={stars.length} 
                    width={props.width} 
                    alt={"star"} />)
    }
    for (stars.length; stars.length < 5;) {
      stars.push(<Image 
                  src={blankstar} 
                  key={stars.length} 
                  width={props.width} 
                  alt={"star"} />)
    }

    return stars;
  }

  let stars = createStars(numStars);
  
  return (
    <>
      <div className="flex" style={{gap: props.gap+"vw"}}>{stars}</div>
    </>
  )
}