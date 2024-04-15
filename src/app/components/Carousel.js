import CarouselItem from "./CarouselItem"

export default function Carousel(props) {

  const items = props.items.map(function(item) {
    return (
      <CarouselItem itemName={item.itemName} artistName={item.artistName} rating={item.rating} id={item.id} key={item.id} />
    )
  });


  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-text font-bold text-xl pl-5">{props.title}</h2>
        <div className="flex bg-primary w-full h-fit overflow-scroll rounded-md">
          {items}
        </div>
      </div>
    </>
  )
}