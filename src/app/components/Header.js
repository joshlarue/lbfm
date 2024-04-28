import search from '../assets/search.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="w-full h-[15vh] flex justify-center items-center">
        <div className="flex h-[80%] w-[90%] justify-between">
          <Link href={'/'} className="flex justify-center items-center text-3xl font-extrabold">
            <span className='text-primary-light'>LB</span>
            <span className='text-accent'>FM</span>
          </Link>
          <div className="flex flex-col justify-center items-end gap-3">
            <Link href={'/search'} className='w-full h-7 bg-primary-light rounded-full flex justify-end pr-3'>
                <Image src={search} />
            </Link>
            <div className="flex gap-3">
              <button className="flex justify-center items-center bg-secondary text-base font-bold rounded-lg px-3 py-1">
                <Link href={'/albums'}>albums</Link>
              </button>
              <button className="flex justify-center items-center bg-secondary text-base font-bold rounded-lg px-3 py-1">
                <Link href={'/songs'}>songs</Link>
                </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}