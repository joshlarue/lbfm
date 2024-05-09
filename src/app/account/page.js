'use client'
import Cookies from "js-cookie";
import { useState } from "react";

export default function Page() {
  const userId = Cookies.get('user_id');
  const [accountPhoto, setAccountPhoto] = useState(null);
  const handlePhotoChange = (e) => {
    setAccountPhoto(e.target.files[0]);
  }
  const handlePhotoSubmit = async () => {
    const formData = new FormData();
    formData.append('accountPhoto', accountPhoto);
    console.log(accountPhoto);
    try {
      const response = await fetch('/api/setaccountphoto', {method: 'POST', body: accountPhoto, headers: new Headers({'content-type': 'multipart/form-data'})});
      console.log(await response.json());
    } catch (error) {
      console.log("Error uploading account photo: ", error)
    }
    setAccountPhoto(null);
  }

  return (
    <>
      <label className="hover:cursor-pointer text-md rounded-lg bg-primary-light text-base-dark font-bold px-5 py-3" for="file-input">select a photo</label>
      <input onChange={handlePhotoChange} name="file-input" id="file-input" className="hidden" type='file' accept="image/png, image/jpeg"></input>
      <button onClick={handlePhotoSubmit} type="button">use photo as profile picture</button>
    </>
  );
}