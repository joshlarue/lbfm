"use server";
import pool from "../../../db/pool";

export async function POST(req, res) {
  // get the id of album from slug
  // could change to formdata
  const albumId = req.url.split("/")[req.url.split("/").length - 1];
  const formData = await req.formData();
  const user_id = formData.get("userId");
  try {
    const connection = await pool.getConnection();

    // get album title, artist, image, and avg album rating
    const [albumResults] = await connection.query(`
      SELECT DISTINCT album_title, artist_name, album_image, AVG(album_rating) AS avg_rating, a.album_id
      FROM albums a, album_artists aa, songs s
      LEFT JOIN album_reviews ar USING(album_id)
      JOIN artists art USING(artist_id)
      WHERE a.album_id = aa.album_id
      AND a.artist_id = aa.artist_id
      AND aa.artist_id = art.artist_id
      AND s.album_id = a.album_id
      AND a.album_id = '${albumId}'
      GROUP BY a.album_id;
    `);

    // will have to change to select by user
    const [userRankingDB] = await connection.query(`
      SELECT songs_ranking from album_reviews
      WHERE album_id = '${albumId}'
      AND user_id = '${user_id}';
    `);

    const [userAlbumRatingDB] = await connection.query(`
      SELECT album_rating from album_reviews
      WHERE album_id = '${albumId}'
      AND user_id = '${user_id}';
    `);

    const [songResults] = await connection.query(`
      SELECT DISTINCT song_title, song_id, s.avg_rating, track_number
      FROM albums al, songs s
      WHERE s.album_id = al.album_id
      AND al.album_id = '${albumId}'
      ORDER BY track_number ASC;
    `);

    const numberOfSongs = songResults.length;

    let userRanking;
    try {
      userRanking = userRankingDB[0]["songs_ranking"].split(",");
      for (let i = 0; i < userRanking.length; i++) {
        userRanking[i] = parseInt(userRanking[i]);
      }

      // custom sorting algorithm
      // negative value means a should come before b
      // positive value indicates a should come after b
      // zero indicates a and b are equal
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      songResults.sort((a, b) => {
        const indexA = userRanking.indexOf(a.track_number);
        const indexB = userRanking.indexOf(b.track_number);
        return indexA - indexB;
      });
    } catch (e) {
      // creates ascending default ranking if user ranking does not exist
      console.log("No song rankings for this album yet!");
      let defaultSongRanking = [];
      for (let i = 1; i < numberOfSongs + 1; i++) {
        defaultSongRanking.push(i);
      }
      userRanking = defaultSongRanking;

      // different custom sorting algorithm
      songResults.sort((a, b) => {
        const indexA = defaultSongRanking.indexOf(a.track_number);
        const indexB = defaultSongRanking.indexOf(b.track_number);
        return indexA - indexB;
      });
    }

    connection.release();
    return new Response(
      JSON.stringify([
        albumResults,
        songResults,
        userRanking,
        userAlbumRatingDB,
      ]),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({ status: 500 });
  }
}

