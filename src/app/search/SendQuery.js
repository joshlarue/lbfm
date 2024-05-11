'use server'

export const SendQuery = async (e, {setItemDisplay, query, searchType}) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("query", query);
  formData.append("search_type", searchType);
  const response = await fetch('/api/search/', {method: 'POST', body: formData});

  switch (searchType) {
    case 'users':
      // contains returned usernames from substring
      const userArray = await response.json();
      console.log(userArray);
      setItemDisplay(userArray.returnedUsernames.map((user, index) => {
        return <User user={user} numRatings={userArray.numUserRatings[index]} />
      }));
      break;
    // would be cool to show avg album rating
    case 'albums':
      const albumArray = await response.json();
      console.log(albumArray);
      setItemDisplay(albumArray.albums.map((album) => {
        return <Album albumTitle={album['album_title']} albumId={album['album_id']} />
      }));
      break;
    // would be cool to show avg ranking of song
    // and when linking to album, highlight song
    // and show which album song is from
    case 'songs':
      const songArray = await response.json();
      console.log(songArray);
      setItemDisplay(songArray.songs.map((song) => {
        return <Song songTitle={song['song_title']} albumId={song['album_id']} />
      }))
      break;
  }
}

// TODO: get user profile pics up in here
function User({user, numRatings}) {
  return (
    <Link href={'/user/'+user} className="p-3 bg-base-dark w-full flex justify-end rounded-l-lg font-bold">
      <div className="w-full justify-between flex">
        <div className="flex font-normal">
          <span className="pr-1"># of albums rated:</span>
          <span className="text-accent font-bold">{numRatings}</span>
        </div>
        <div>
          {user}
        </div>
      </div>
    </Link>
  )
}

function Album({albumTitle, albumId}) {
  return (
    <Link href={'/albums/'+albumId} className="p-3 bg-base-dark w-full flex justify-end rounded-l-lg font-bold">
      <div className="w-full justify-end flex">
        <div className="text-right">
          {albumTitle}
        </div>
      </div>
    </Link>
  )
}

function Song({songTitle, albumId}) {
  return (
    <Link href={'/albums/'+albumId} className="p-3 bg-base-dark w-full flex justify-end rounded-l-lg font-bold">
      <div className="w-full justify-end flex">
        <div className="text-right">
          {songTitle}
        </div>
      </div>
    </Link>
  )
}