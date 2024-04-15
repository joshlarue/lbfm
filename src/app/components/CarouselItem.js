import Link from "next/link"

export default function CarouselItem(props) {
  return (
    <>
      <Link href={'/albums/' + props.id} className="flex flex-col w-fit p-5">
        <div className="w-[15vh] min-h-[15vh] bg-base rounded-lg"></div>
        <div className="flex justify-between py-2 w-[15vh]">
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm w-[15vh]">{props.itemName}</p>
            <div className="flex w-full justify-between">
              <p className="flex text-xs w-[80%] truncate">{props.artistName}</p>
              <p className="text-xs text-accent font-extrabold">{props.rating}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}