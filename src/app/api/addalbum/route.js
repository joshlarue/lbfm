import pool from '../../db/pool';
import sha256 from 'sha256';

export async function POST(req, res) {
  const formData = await req.formData();
  const albumLink = formData.get("album_link");
  const spotifyAlbumId = albumLink.split('https://open.spotify.com/album/')[1].split('?')[0];

  const AUTH_URL = 'https://accounts.spotify.com/api/token';
  const API_URL = 'https://api.spotify.com/v1';

  // acquire access token from spotify
  const authResponse = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
  });
  const authResponseJson = await authResponse.json();
  const spotifyAccessToken = authResponseJson['access_token'];

  // fetch album info from spotify
  const albumResponse = await fetch(`${API_URL}/albums/${spotifyAlbumId}`, {
    headers: new Headers({
      'Authorization': `Bearer ${spotifyAccessToken}`
    })
  });
  const albumResponseJson = await albumResponse.json();
  
  // use album info to populate the following fields for insertion
  const releaseDate = albumResponseJson['release_date'];
  const albumTitle = albumResponseJson['name'].replace(/'/gi, "''");
  const albumId = sha256(albumTitle);
  const artistName = albumResponseJson['artists'][0]['name'].replace(/'/gi, "''");
  const artistId = sha256(artistName);
  const albumImg = albumResponseJson['images'][0]['url'];
  const albumTracks = albumResponseJson['tracks']['items'];
  const randomAvgRating = Math.floor(Math.random() * 5) + 1

  try {
    const connection = pool.getConnection();

    // insert artist info if they do not already exist in the DB
    (await connection).execute(`
      INSERT IGNORE INTO artists
      (artist_name, artist_id)
      VALUES ('${artistName}', '${artistId}');
    `);

    // insert album info if album does not exist
    (await connection).execute(`
      INSERT IGNORE INTO albums
      (album_title, date_released, album_id, album_image, artist_id, avg_rating)
      VALUES ('${albumTitle}', '${releaseDate}', '${albumId}', '${albumImg}', '${artistId}', ${randomAvgRating});
    `);
    
    // insert info into album_artist bridging table if info does not already exist
    (await connection).execute(`
      INSERT IGNORE INTO album_artists
      (artist_id, album_id)
      VALUES ('${artistId}', '${albumId}');
    `);


    // this loop checks to ensure track numbers are not doubled up in the case of dual/triple disc albums e.g. Mr. Morale on Spotify
    // after track numbers are checked/fixed for doubles, curSong is inserted if it does not already exist in the DB
    let trackNums = [];
    for (let i = 0; i < albumTracks.length; i++) {
      const curSong = albumTracks[i];

      // replaces single quotes with two single quotes ('') to escape them for the DB
      const songId = sha256(curSong['name'].replace(/'/gi, "''"));

      // 
      let trackNumber = curSong['track_number'];
      for (let j = 0; j < trackNums.length; j++) {
        if (trackNums[j] == trackNumber) {
          trackNumber = trackNums[j]+1;
        }
      }
      trackNums.push(trackNumber);

      // insert song into db if songs do not exist
      (await connection).execute(`
        INSERT IGNORE INTO songs
        (song_title, track_number, artist_id, album_id, song_id)
        VALUES ('${curSong['name'].replace(/'/gi, "''")}', '${trackNumber}', '${artistId}', '${albumId}', '${songId}');
      `);
    }
    
    return new Response(JSON.stringify({"albumId": albumId}), {status: 200});
  } catch {
    console.error("NOOO!");
    return new Response(JSON.stringify("Massive L"), {status: 500});
  }
}