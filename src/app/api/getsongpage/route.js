'use server'
import pool from '../../db/pool';

export async function POST(req, res) {
  const formData = await req.formData();
  const userId = formData.get("userId");
  const lowerLimit = formData.get("lower_limit");
  const upperLimit = formData.get("upper_limit");

  try {
    const connection = await pool.getConnection();

    // TODO: rank song results based on average song ranking
    const response = await connection.query(`
      SELECT DISTINCT album_title, song_title, song_id, track_number, artist_name, album_image, CONVERT(a.date_released, DATE) AS date_released, a.album_id, AVG(album_rating) AS avg_rating,  COUNT(ar.album_id) AS num_rankings
      FROM albums a, songs s
      LEFT JOIN album_reviews ar USING(album_id)
      JOIN artists USING(artist_id)
      WHERE s.album_id = a.album_id
      GROUP BY a.album_id, song_title, artist_name, song_id, track_number
      ORDER BY avg_rating DESC
      LIMIT ${lowerLimit}, ${upperLimit};
    `);
    let songPageResults = response[0];
    
    // songPageResults = await songPageResults.map(async (song) => {
    //   const songRankingsResponse = await connection.query(`
    //     SELECT songs_ranking
    //     FROM album_reviews
    //     WHERE album_id = '${song.album_id}'
    //   `);
    //   connection.release();
    //   let songRanking;
    //   for (let i = 0; i < songRankingsResponse.length; i++) {
    //     for (let j = 0; j < songRankingsResponse[i].length; j++) {
    //       for (let k = 0; k < songRankingsResponse[i][j].length; k++) {
    //         console.log(songRankingsResponse[i][j].songs_ranking[k]);
    //       }
    //       if (song.track_number == songRankingsResponse[i][j].songs_ranking) {
    //         songRanking = j;
    //         break;
    //       }
    //     }
    //   }
    //   song['song_ranking'] = songRanking;
    //   console.log(song);
    // });

    connection.release();
    return new Response(JSON.stringify({songPageResults}), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}