'use server'
import pool from '../../db/pool';

export async function POST(req, res) {
  const requestJson = await req.json();

  // populates fields based on save request from frontend
  const userId = requestJson[3];
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
    let reviewExists = false;
    for (let i = 0; i < result[0].length; i++) {
      if (result[0][i].album_id == albumId) {
        reviewExists = true;
        break;
      }
    }

    if (reviewExists) {
      await connection.execute(`
        UPDATE album_reviews
        SET album_rating = ${albumRating}, songs_ranking = '${stringSongOrder}'
        WHERE album_id = '${albumId}'
        AND user_id = '${userId}';
      `)
    } else {
      await connection.execute(`
        INSERT INTO album_reviews (album_id, album_rating, songs_ranking, user_id)
        VALUES ('${albumId}', ${albumRating}, '${stringSongOrder}', '${userId}');
      `);
    }

    connection.release();
    return new Response(JSON.stringify(1, {status: 200}));
  } catch (error) {
    connection.release();
    console.error("Error saving albums", error);
    return new Response({status: 500});
  }
}
