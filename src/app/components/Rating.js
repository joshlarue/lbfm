export default function Rating({rating, ratingStyle}) {
  return (
    <>
      {
        rating == undefined ? null 
        : rating <= 1 ? <p className={`text-[#FF213F] ${ratingStyle}`}>{parseFloat(rating).toFixed(1)}</p>
        : rating <= 2 ? <p className={`text-[#FFAF1B] ${ratingStyle}`}>{parseFloat(rating).toFixed(1)}</p>
        : rating <= 3 ? <p className={`text-[#FFEA4A] ${ratingStyle}`}>{parseFloat(rating).toFixed(1)}</p>
        : rating <= 4 ? <p className={`text-[#acff97] ${ratingStyle}`}>{parseFloat(rating).toFixed(1)}</p>
        : rating <= 5 ? <p className={`text-[#52FF3B] ${ratingStyle}`}>{parseFloat(rating).toFixed(1)}</p>
        : null
      }
    </>
  );
}