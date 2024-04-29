import Header from "../components/Header";
import search from '../assets/search.svg';
import Image from "next/image";

export default function Search() {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className='w-[80vw] mt-5 h-10 bg-primary-light rounded-full flex justify-end pr-3'>
          <Image src={search} />
        </div>
        <Header searchHeader={true} />
      </div>
    </>
  );
}