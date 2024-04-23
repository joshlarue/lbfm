import { useContext } from "react";
import { UserEntryPageContext } from "../page";

export default function Signup() {
  const { handleSubmit, handleEmailChange, handleUserNameChange, handlePasswordChange, setLoginPage, error } = useContext(UserEntryPageContext);

  return (
    <div className="w-full h-[75vh] flex flex-col justify-center items-end gap-10 pr-[5vw]">
      <h1 className="text-lg font-bold text-base-dark bg-primary-light rounded-md p-3 shadow-md">sign up for an LBFM account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-end gap-3">
        <div className="flex flex-col gap-1">
          {/* <label className="text-primary-light" htmlFor="username">username</label> */}
          <input onChange={handleUserNameChange} className="bg-base-dark p-2 shadow-sm rounded-md" id="username" name="username" placeholder="username" />
        </div>
        <div className="flex flex-col gap-1">
          {/* <label className="text-primary-light" htmlFor="email">email</label> */}
          <input onChange={handleEmailChange} className="bg-base-dark p-2 shadow-sm rounded-md" id="email" name="email" type="email" placeholder="email" />
        </div>
        <div className="flex flex-col gap-1">
          {/* <label htmlFor="password" className="text-primary-light">password</label> */}
          <input onChange={handlePasswordChange} className="bg-base-dark p-2 shadow-sm rounded-md" id="password" name="password" type="password" placeholder="password"/>
        </div>
        <button className="bg-secondary px-4 py-2 text-base font-bold rounded-md shadow-md" type="submit">sign up</button>
      </form>
      <button onClick={() => setLoginPage(true)} className="bg-base-dark px-4 py-2 text-primary-light font-bold rounded-md shadow-md text-xs">log in instead</button>

      {error?<div className="flex flex-col justify-center items-center bg-accent text-base font-bold p-2 rounded-md gap-3 shadow-md"><p className="text-right w-[75vw]">user exists or your input is invalid</p><p className="text-right w-[75vw] ">please ensure your password is over ten characters long</p></div>:null}
    </div>
  );
}