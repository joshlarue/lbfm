import Header from "../components/Header";

export default function Page() {
  return (
    <>
      <Header highlight={'albums'}/>
      <div className="w-full flex justify-center bg-base-dark py-5 mb-5">
        <h2 className="text-xl font-bold text-secondary">discover albums</h2>
      </div>
      <div className="w-full flex flex-col justify-center items-start">
        <Album />
      </div>
      <div className="w-full flex justify-center pt-5">
        <button type='button' className="bg-base-dark px-3 py-2 rounded-lg">next page</button>
      </div>
    </>
  );
}

function Album() {
  return (
    <div className="flex gap-5">
      <div className="bg-primary w-[50vw] h-[50vw] rounded-r-lg"></div>
      <div className="flex flex-col">
        <div className="">album title</div>
        <div className="">artist name</div>
        <div className="">release date</div>
        <div className="">number of reviews</div>
      </div>
    </div>
  );
}