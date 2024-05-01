import pool from '../../db/pool';
import sha256 from 'sha256';

export async function POST(req, res) {
  const formData = await req.formData();
  const albumLink = formData.get("album_link");
  const spotifyAlbumId = albumLink.split('https://open.spotify.com/album/')[1].split('?')[0];

  const AUTH_URL = 'https://accounts.spotify.com/api/token';
  const BASE_URL = 'https://api.spotify.com/v1';

  const authResponse = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
  });

  const authResponseData = await authResponse.json();
  const spotifyAccessToken = authResponseData['access_token'];

  const headers = new Headers({
    'Authorization': `Bearer ${spotifyAccessToken}`
  });

  const albumRequest = await fetch(`${BASE_URL}/albums/${spotifyAlbumId}`, {headers: headers});
  const albumResponse = await albumRequest.json();
  const releaseDate = albumResponse['release_date'];
  const albumTitle = albumResponse['name'].replace(/'/gi, "''");
  const albumId = sha256(albumTitle);
  const artistName = albumResponse['artists'][0]['name'].replace(/'/gi, "''");
  const artistId = sha256(artistName);
  const albumImg = albumResponse['images'][0]['url'];
  const albumTracks = albumResponse['tracks']['items'];
  const randomAvgRating = Math.floor(Math.random() * 5) + 1

  let albumSongs = [];
  try {
    const connection = pool.getConnection();

    // insert artist info if they do not already exist in the DB
    (await connection).execute(`INSERT IGNORE INTO artists
                                (artist_name, artist_id)
                                VALUES ('${artistName}', '${artistId}')`);

    (await connection).execute(`INSERT IGNORE INTO albums
                                (album_title, date_released, album_id, album_image, artist_id, avg_rating)
                                VALUES ('${albumTitle}', '${releaseDate}', '${albumId}', '${albumImg}', '${artistId}', ${randomAvgRating});`);
                                
    (await connection).execute(`INSERT IGNORE INTO album_artists
                              (artist_id, album_id)
                              VALUES ('${artistId}', '${albumId}');`);


    for (let i = 0; i < albumTracks.length; i++) {
      const curSong = albumTracks[i];

      // replaces single quotes with two single quotes ('') to escape them for the DB
      const songId = sha256(curSong['name'].replace(/'/gi, "''"));

      (await connection).execute(`INSERT IGNORE INTO songs
                                (song_title, track_number, artist_id, album_id, song_id)
                                VALUES ('${curSong['name'].replace(/'/gi, "''")}', '${curSong['track_number']}', '${artistId}', '${albumId}', '${songId}');`);
    }
    return new Response(JSON.stringify({"albumId": albumId}), {status: 200});
  } catch {
    console.error("NOOO!");
    return new Response(JSON.stringify("Massive L"), {status: 500});
  }
}