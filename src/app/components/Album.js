import Image from "next/image";

export default function Album(props) {
  let album = props.album;
  return (
    <div className="flex flex-col gap-1">
      <div className="w-[60vw] bg-primary relative rounded-tr-md rounded-br-md shadow-md">
        <div className="w-[60vw] h-[60vw] bg-primary relative rounded-tr-md rounded-br-md"><Image src={album.album_image} fill='true' className="shadow-md object-cover rounded-tr-md rounded-br-md" alt={album.album_title} /></div>
        <div className="flex flex-col p-3">
          <h3 className="w-[50vw]">{album.album_title}</h3>
          <p className="text-sm">{album.artist_name}</p>
          <p>{album.date}</p>
        </div>
      </div>
    </div>
  )
}