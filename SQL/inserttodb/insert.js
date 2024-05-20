"use server";
const sha256 = require("sha256");
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

const AUTH_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

// acquire access token from spotify
let spotifyAccessToken;
const getCredentials = async () => {
  const authResponse = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
  });
  const authResponseJson = await authResponse.json();
  spotifyAccessToken = authResponseJson["access_token"];
  return spotifyAccessToken;
};

const playlistId = "2ZqjemHmfmmpVomtt85Vd3";

const dataFetchRunner = async () => {
  const connection = await pool.getConnection();
  const spotifyAccessToken = await getCredentials();
  for (let i = 0; i < 100; i++) {
    const playlistResponse = await fetch(
      // fetch 50 tracks from the playlist at a time
      `${API_URL}/playlists/${playlistId}/tracks?offset=${
        (i + 1) * 50
      }&limit=50`,
      {
        headers: new Headers({
          Authorization: `Bearer ${spotifyAccessToken}`,
        }),
      }
    );
    const playlistResponseJson = await playlistResponse.json();
    for (let j = 0; i < playlistResponseJson["items"].length; i++) {
      const dbAlbumId = sha256(
        playlistResponseJson["items"][j]["track"]["album"]["name"]
      );
      const dbArtistId = sha256(
        playlistResponseJson["items"][j]["track"]["album"]["artists"][0]["name"]
      );
      const albumExistsResponse = connection.query(`
        SELECT album_id FROM albums
        WHERE album_id = '${dbAlbumId}';
      `);
      const artistExistsResponse = connection.query(`
        SELECT artist_id FROM artists
        WHERE artist_id = '${dbArtistId}';
      `);

      let [insertAlbum, insertArtist] = [false, false];
      if (albumExistsResponse[0] === undefined) insertAlbum = true;
      if (artistExistsResponse[0] === undefined) insertArtist = true;

      if (insertAlbum || insertArtist) {
        const spotifyAlbumId = playlistResponseJson["items"][i]["track"][
          "album"
        ]["href"].split("https://api.spotify.com/v1/albums/")[1];

        getAlbumAndInsert(spotifyAlbumId, insertAlbum, insertArtist);
      }
    }
  }
  connection.destroy();
};

dataFetchRunner();

async function getAlbumAndInsert(spotifyAlbumId, insertArtist, insertAlbum) {
  const connection = pool.getConnection();
  // fetch album info from spotify
  const albumResponse = await fetch(`${API_URL}/albums/${spotifyAlbumId}`, {
    headers: new Headers({
      Authorization: `Bearer ${spotifyAccessToken}`,
    }),
  });
  const albumResponseJson = await albumResponse.json();

  // use album info to populate the following fields for insertion
  const releaseDate = albumResponseJson["release_date"];
  const albumTitle = albumResponseJson["name"].replace(/'/gi, "''");
  const albumId = sha256(albumTitle);
  const artistName = albumResponseJson["artists"][0]["name"].replace(
    /'/gi,
    "''"
  );
  const artistId = sha256(artistName);
  const albumImg = albumResponseJson["images"][0]["url"];
  const albumTracks = albumResponseJson["tracks"]["items"];
  const randomAvgRating = Math.floor(Math.random() * 5) + 1;

  try {
    if (insertArtist) {
      // insert artist info if they do not already exist in the DB
      (await connection).execute(`
      INSERT INTO artists
      (artist_name, artist_id)
      VALUES ('${artistName}', '${artistId}');
    `);
      console.log("Successfully inserted artist");
    }

    if (insertAlbum) {
      // insert album info if album does not exist
      (await connection).execute(`
      INSERT INTO albums
      (album_title, date_released, album_id, album_image, artist_id, avg_rating)
      VALUES ('${albumTitle}', '${releaseDate}', '${albumId}', '${albumImg}', '${artistId}', ${randomAvgRating});
    `);

      // insert info into album_artist bridging table if info does not already exist
      (await connection).execute(`
      INSERT INTO album_artists
      (artist_id, album_id)
      VALUES ('${artistId}', '${albumId}');
    `);

      // this loop checks to ensure track numbers are not doubled up in the case of dual/triple disc albums e.g. Mr. Morale on Spotify
      // after track numbers are checked/fixed for doubles, curSong is inserted if it does not already exist in the DB
      let trackNums = [];
      for (let i = 0; i < albumTracks.length; i++) {
        const curSong = albumTracks[i];

        // replaces single quotes with two single quotes ('') to escape them for the DB
        const songId = sha256(curSong["name"].replace(/'/gi, "''"));

        let trackNumber = curSong["track_number"];
        for (let j = 0; j < trackNums.length; j++) {
          if (trackNums[j] === trackNumber) {
            trackNumber = trackNums[j] + 1;
          }
        }
        trackNums.push(trackNumber);

        // insert song into db if songs do not exist
        (await connection).execute(`
        INSERT IGNORE INTO songs
        (song_title, track_number, artist_id, album_id, song_id)
        VALUES ('${curSong["name"].replace(
          /'/gi,
          "''"
        )}', '${trackNumber}', '${artistId}', '${albumId}', '${songId}');
      `);
      }
      console.log("Successfully inserted album_artists and songs!");
      connection.destroy();
    }
  } catch {
    console.error("Massive error! Good thing I 'caught' it!");
  }
}
