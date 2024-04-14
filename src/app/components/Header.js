import search from '../assets/search.svg';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      <header className="w-full h-[15vh] flex justify-center items-center">
        <div className="flex h-[80%] w-[95%] justify-between">
          <div className="flex justify-center items-center">logo</div>
          <div className="flex flex-col justify-center items-end gap-3">
            <div className="w-full h-7 bg-primary-light rounded-full flex justify-end pr-3">
              <Image src={search} />
            </div>
            <div className="flex gap-3">
              <button className="flex justify-center items-center bg-secondary text-base font-bold rounded-lg px-3 py-1">albums</button>
              <button className="flex justify-center items-center bg-secondary text-base font-bold rounded-lg px-3 py-1">songs</button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}