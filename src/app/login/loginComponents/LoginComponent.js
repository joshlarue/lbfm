import { useContext } from "react";
import { UserEntryPageContext } from "../page";

export default function Login() {
  const { handleSubmit, handleEmailChange, handleUserNameChange, handlePasswordChange, setLoginPage, error } = useContext(UserEntryPageContext);
  return (
    <div className="w-full h-[75vh] flex flex-col justify-center items-end gap-10 pr-[5vw]">
      <h1 className="text-lg font-bold text-base-dark bg-primary-light rounded-md p-3 shadow-md">log in to your LBFM account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-end gap-3">
        <div className="flex flex-col gap-1">
          {/* <label className="text-primary-light" htmlFor="username">username</label> */}
          <input onChange={handleUserNameChange} className="bg-base-dark p-2 shadow-sm rounded-md" id="username" name="username" placeholder="username" />
        </div>
        <div className="flex flex-col gap-1">
          {/* <label htmlFor="password" className="text-primary-light">password</label> */}
          <input onChange={handlePasswordChange} className="bg-base-dark p-2 shadow-sm rounded-md" id="password" name="password" type="password" placeholder="password"/>
        </div>
        <button className="bg-secondary px-4 py-2 text-base font-bold rounded-md shadow-md" type="submit">log in</button>
      </form>
      <button onClick={() => setLoginPage(false)} className="bg-base-dark text-primary-light px-4 py-2 font-bold rounded-md shadow-md text-xs">sign up instead</button>
      {error != '' ?<div className="flex flex-col justify-center items-center bg-accent text-base font-bold p-2 rounded-md gap-3 shadow-md"><p className="text-right w-[75vw]">{error}</p></div>:null}
    </div>
  );
}