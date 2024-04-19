import CarouselItem from "./CarouselItem"

export default function Carousel(props) {

  const reader = new FileReader();
  const items = props.items.map((item) => {
    let blob = new Blob(item.album_image['data']);
    let album_image;
    reader.onload = () => {
      album_image = reader.result;
    }
    reader.readAsDataURL(blob);
    reader.abort();
    return (
      <CarouselItem itemName={item.album_title} artistName={item.artist_name} albumImage={album_image} rating={item.avg_rating} id={item.album_id} key={item.album_id} alt={item.album_title} />
    )
  });


  return (
    <>
      <div className="flex flex-col gap-3 w-full shadow-md">
        <h2 className="text-text font-bold text-xl pl-5">{props.title}</h2>
        <div className="flex bg-primary w-full min-h-fit overflow-scroll rounded-md">
          {items}
        </div>
      </div>
    </>
  )
}