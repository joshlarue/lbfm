'use server'
import pool from '../../../db/pool';

export async function GET(req, res) {
  // get the id of album from slug
  let albumId = req.url.split('/')[req.url.split('/').length-1];
  try {
    const connection = await pool.getConnection();

    // get album title, artist, image, and avg album rating
    const [albumResults] = await connection.query(`
                                            SELECT DISTINCT album_title, artist_name, album_image, al.avg_rating, al.album_id
                                            FROM albums al, artists ar, album_artists aa, songs s
                                            WHERE al.album_id = aa.album_id
                                            AND al.artist_id = aa.artist_id
                                            AND aa.artist_id = ar.artist_id
                                            AND s.album_id = al.album_id
                                            AND al.album_id = '${albumId}';
                                            `);
    // will have to change to select by user
    const [userRankingDB] = await connection.query(`
                                              SELECT songs_ranking from album_review
                                              WHERE album_id = '${albumId}'
                                              ;`);



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
      userRanking = userRankingDB[0]['songs_ranking'].split(",");
      for (let i = 0; i < userRanking.length; i++) {
        userRanking[i] = parseInt(userRanking[i]);
      }

      // custom sorting algorithm
      // negative value means a should come before b
      // positive value indicates a should come after b
      // zero indicates a and b are equal
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      songResults.sort((a, b) => {
        let indexA = userRanking.indexOf(a.track_number);
        let indexB = userRanking.indexOf(b.track_number);
        return indexA - indexB;
      });
    } catch (e) {
      console.log("No song rankings for this album yet!");
      let defaultSongRanking = [];
      for (let i = 1; i < numberOfSongs+1; i++) {
        defaultSongRanking.push(i);
      }
      userRanking = defaultSongRanking;

      // custom sorting algorithm
      // negative value means a should come before b
      // positive value indicates a should come after b
      // zero indicates a and b are equal
      songResults.sort((a, b) => {
        let indexA = defaultSongRanking.indexOf(a.track_number);
        let indexB = defaultSongRanking.indexOf(b.track_number);
        return indexA - indexB;
      });
    }

    connection.release();
    return new Response(JSON.stringify([albumResults, songResults, userRanking]), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}