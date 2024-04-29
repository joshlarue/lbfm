'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Header from "@/app/components/Header";

export default function Page(req) {
  const reqUserId = req.params.id;
  const userId = Cookies.get('user_id');

  // use album ID to populate album page
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("reqUserId", reqUserId);
        formData.append("userId", userId);

        const response = await fetch('/api/getuser/'+reqUserId, {method: "POST", body: formData});
        const responseData = await response.json();
        console.log(responseData);

      } catch (error) {
        console.error("Error fetching user: " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col gap-1">
        <div className="w-[60vw] bg-primary relative rounded-tr-md rounded-br-md shadow-md">
          <div className="w-[60vw] h-[60vw] bg-primary relative rounded-tr-md rounded-br-md"></div>
          <div className="flex flex-col p-3">
            <h3 className="w-[50vw] text-xl pb-1 font-bold">username</h3>
            <p className="text-sm">joined april 29, 2024</p>
            <p className="text-sm">7 ratings</p>
          </div>
        </div>
      </div>
    </>
  )
}
