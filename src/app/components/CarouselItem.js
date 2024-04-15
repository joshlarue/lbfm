export default function CarouselItem(props) {
  return (
    <>
      <div className="flex flex-col w-fit p-5">
            <div className="w-[20vh] min-h-[20vh] bg-base rounded-lg"></div>
            <div className="flex justify-between p-2">
              <div className="flex flex-col w-full">
                <p className="text-lg w-[20vh] truncate">{props.itemName}</p>
                <div className="flex w-[95%] justify-between">
                  <p className="text-sm w-[80%] truncate">{props.artistName}</p>
                  <p className="text-sm text-accent font-extrabold">{props.rating}</p>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}