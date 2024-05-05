'use server'
import pool from '../../db/pool';

export async function POST(req, res) {
  const requestJson = await req.json();

  // populates fields based on save request from frontend
  const userId = requestJson[3];
  const songOrder = requestJson[2];
  const stringSongOrder = requestJson[2].join(",");
  const albumId = requestJson[0].album_id;
  const albumRating = requestJson[1];

  try {
    const connection = await pool.getConnection();
    
    // finds user review in album_reviews if exists
    let result = await connection.query(`
      SELECT album_id FROM album_reviews
      WHERE album_id = '${albumId}'
      AND user_id = '${userId}';
    `);

    // determines if user review for this album already exists
    let ratingExists = false;
    for (let i = 0; i < result[0].length; i++) {
      if (result[0][i].album_id == albumId) {
        ratingExists = true;
        break;
      }
    }

    if (ratingExists) {
      await connection.execute(`
        UPDATE album_reviews
        SET album_rating = ${albumRating}, songs_ranking = '${stringSongOrder}'
        WHERE album_id = '${albumId}'
        AND user_id = '${userId}';
      `);

    } else {
      await connection.execute(`
        INSERT INTO album_reviews (album_id, album_rating, songs_ranking, user_id)
        VALUES ('${albumId}', ${albumRating}, '${stringSongOrder}', '${userId}');
      `);
    }

    for (let i = 1; i <= songOrder.length; i++) {
      const numRankingsQuery = await connection.query(`
        SELECT COUNT(user_id) AS num_rankings
        FROM song_rankings
        WHERE user_id = '${userId}'
        AND song_id = (SELECT song_id
                      FROM songs
                      WHERE album_id = '${albumId}'
                      AND track_number = ${i});
      `);
      const numRankings = numRankingsQuery[0][0].num_rankings;

      if (numRankings >= 1) {
        await connection.execute(`
          UPDATE song_rankings
          SET song_ranking = ${songOrder.indexOf(i)+1}
          WHERE song_id = (SELECT song_id
                            FROM songs
                            WHERE album_id = '${albumId}'
                            AND track_number = ${i})
          AND user_id = '${userId}';
        `);
      } else {
        await connection.execute(`
        INSERT INTO song_rankings (user_id, song_id, song_ranking)
        VALUES ('${userId}', (SELECT song_id
                            FROM songs
                            WHERE album_id = '${albumId}'
                            AND track_number = ${i}), ${songOrder.indexOf(i)+1});
        `);
      }
    }

    connection.release();
    return new Response(JSON.stringify(1, {status: 200}));
  } catch (error) {
    //connection.release();
    console.error("Error saving albums", error);
    return new Response({status: 500});
  }
}
