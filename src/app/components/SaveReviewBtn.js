import { useState, useContext } from "react";
import { ToSaveContext } from "../albums/[id]/page";

const songs = [
  {
      "song_title": "Norman fucking Rockwell",
      "song_id": "b83696cdb76a4700f0062fedd7529153e4704fc75f3fa82146296e27dea6d7e7",
      "avg_rating": 1.6,
      "track_number": 1
  },
  {
      "song_title": "Mariners Apartment Complex",
      "song_id": "66c5bd74946b8fd65f53a48479992714a3e72ed9ec7d0334112ce3521bf5864e",
      "avg_rating": 1.8,
      "track_number": 2
  },
  {
      "song_title": "Venice Bitch",
      "song_id": "f238cecc880d85dabb7bd9577d1bd06e3d139b7545b4ce7f916238b37e376169",
      "avg_rating": 1.6,
      "track_number": 3
  },
  {
      "song_title": "Fuck it I love you",
      "song_id": "ddbdc4065b747466e3824b62d8d2368a8a0fff65dc028c55b491591920e4f17e",
      "avg_rating": 2.1,
      "track_number": 4
  },
  {
      "song_title": "Doin' Time",
      "song_id": "7750509935fe9171943a6c0b566014792d13ed00090ea71522cbebde5704a90d",
      "avg_rating": 2.3,
      "track_number": 5
  },
  {
      "song_title": "Love song",
      "song_id": "0cf70f7a611b5fde22c4a54611a28f87dc4ee1b7ebbb5f7bc43e425b2500310b",
      "avg_rating": 2,
      "track_number": 6
  },
  {
      "song_title": "Cinnamon Girl",
      "song_id": "076180c297161d62b36da24e471c885061d04b8b678a90c0378520abab294776",
      "avg_rating": 2,
      "track_number": 7
  },
  {
      "song_title": "How to disappear",
      "song_id": "688932de7fc41f8216e8d8028e1437d46e1f424a1951ca65477a27a3fa60b519",
      "avg_rating": 2.5,
      "track_number": 8
  },
  {
      "song_title": "California",
      "song_id": "cad0535decc38b248b40e7aef9a1cfd91ce386fa5c46f05ea622649e7faf18fb",
      "avg_rating": 2.2,
      "track_number": 9
  },
  {
      "song_title": "The Next Best American Record",
      "song_id": "53bdfa9a59eff4dc7d1ab640f84350042d30c1a1c8258e6593e7ed7163911012",
      "avg_rating": 2.2,
      "track_number": 10
  },
  {
      "song_title": "The greatest",
      "song_id": "e4b530e06256b37e1145b3ad48400d530f62534cdc19dad539493e85db23648e",
      "avg_rating": 2.4,
      "track_number": 11
  },
  {
      "song_title": "Bartender",
      "song_id": "3e627e8349af101cfbd9ae74931fbc67567983f9b28434a7fe93c553d9ae95a0",
      "avg_rating": 2.1,
      "track_number": 12
  },
  {
      "song_title": "Happiness is a butterfly",
      "song_id": "0328bdf1dcba7e14a4e29dd65042ea26d1ceec9806c694716eee20da4816b268",
      "avg_rating": 3.8,
      "track_number": 13
  },
  {
      "song_title": "hope is a dangerous thing for a woman like me to have - but I have it",
      "song_id": "072e0dc622eca503de49d28e140c86bc998f851e28a6b40acf105cd640038357",
      "avg_rating": 2.4,
      "track_number": 14
  }
]

export default function SaveReviewBtn() {
  const { saved, setSaved, songOrder } = useContext(ToSaveContext);

  const handleSaved = async () => {
    setSaved(true);
    await fetch('http://localhost:3000/api/save', {method: "POST", body: JSON.stringify(songOrder)});
  }

  return (
    <>
      <button onClick={() => handleSaved()} className={`w-full p-1 rounded-md bg-primary ${saved ? "bg-secondary text-base font-bold" : null}`}>{saved ? "saved" : "save"}</button>
    </>
  )
}