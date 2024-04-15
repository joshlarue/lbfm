import Image from "next/image"
import { useState } from "react";

export default function Stars(props) {
  const [filled, setFilled] = useState()
  const starImg = <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 0L9.375 9.375H0L7.8125 15.625L4.6875 25L12.5 18.75L20.3125 25L17.1875 15.625L25 9.375H15.625L12.5 0Z" fill={filled}/>
                  </svg>

  const createStars = (numStars) => {
    let stars = [];
    setFilled("#F28F3B");
    for (let i = 0; i < numStars && i < 5; i++) {
      stars.push(<Image src={starImg} key={stars.length} />)
    }
    if (stars.length < 5) {
      setFilled("#000000");
      stars.push(<Image src={starImg} key={stars.length} />)
    }

    return stars;
  }

  let stars = createStars(3);
  
  return (
    <>
      {stars}
    </>
  )
}