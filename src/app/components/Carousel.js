import CarouselItem from "./CarouselItem"

export default function Carousel(props) {

  const items = props.items.map((item) => {
    return (
      <CarouselItem itemName={item.album_title} artistName={item.artist_name} rating={item.avg_rating} id={item.album_id} key={item.album_id} />
    )
  });


  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-text font-bold text-xl pl-5">{props.title}</h2>
        <div className="flex bg-primary w-full min-h-fit overflow-scroll rounded-md">
          {items}
        </div>
      </div>
    </>
  )
}