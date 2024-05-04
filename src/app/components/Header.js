import search from '../assets/search.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Header(props) {
  return (
    <>
      {props.searchHeader ?
        <header className="w-full py-5 flex justify-end items-center">
          <div className="flex h-[80%] w-full justify-center">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="flex gap-3 justify-end">
                <button className="flex justify-center items-center bg-primary-light text-base font-bold rounded-lg px-3 py-1">
                  <Link href={'/albums'}>albums</Link>
                </button>
                <button className="flex justify-center items-center bg-primary-light text-base font-bold rounded-lg px-3 py-1">
                  <Link href={'/songs'}>songs</Link>
                </button>
                <button className="flex justify-center items-center bg-primary-light text-base font-bold rounded-lg px-3 py-1">
                  <Link href={'/users'}>users</Link>
                </button>
                <button className="flex justify-center items-center bg-primary-light text-base font-bold rounded-lg px-3 py-1">
                  <Link href={'/'}>home</Link>
                </button>
              </div>
            </div>
          </div>
        </header>
      : props.loginHeader ?
        <header className="w-full h-[15vh] flex justify-center items-center">
          <div className="flex h-[80%] w-[90%] justify-end">
            <Link href={'/login'} className="flex justify-center items-center text-3xl font-extrabold">
              <span className='text-primary-light'>LB</span>
              <span className='text-accent'>FM</span>
            </Link>
          </div>
        </header>
      :
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
                <button className={`flex justify-center items-center text-base-dark font-bold rounded-lg px-3 py-1 ${props.highlight == 'albums' ? 'bg-secondary' : 'bg-primary-light'}`}>
                  <Link href={'/albums'}>albums</Link>
                </button>
                <button className={`flex justify-center items-center text-base-dark font-bold rounded-lg px-3 py-1 ${props.highlight == 'songs' ? 'bg-secondary' : 'bg-primary-light'}`}>
                  <Link href={'/songs'}>songs</Link>
                </button>
                <button className={`flex justify-center items-center font-bold rounded-lg px-3 py-1 ${props.highlight == 'songs' || props.highlight == 'albums' ? 'bg-primary-light text-base-dark' : 'bg-base-dark text-primary-light box-border'}`}>
                  <Link href={'/'}>home</Link>
                </button>
              </div>
            </div>
          </div>
        </header>
      }
    </>
  )
}