'use server'
import Cookies from 'js-cookie';
import pool from '../../db/pool';
import 'fs-extra';

export async function POST(req, res) {
  const userId = `'${req.headers.get("userid")}'`;
  try {
    const connection = await pool.getConnection();
    // get top rated albums from community
    const topRatedAlbums = await connection.query(`
      SELECT DISTINCT album_title, artist_name, album_image, AVG(ar.album_rating) AS avg_rating, a.album_id 
      FROM albums a
      LEFT JOIN album_reviews ar ON a.album_id = ar.album_id
      JOIN artists art USING (artist_id)
      GROUP BY a.album_id
      ORDER BY avg_rating DESC
      LIMIT 0, 10;
    `);

    // get rated albums by user
    const albumsRatedByUser = await connection.query(`
      SELECT DISTINCT album_title, artist_name, album_image, AVG(ar.album_rating) AS avg_rating, a.album_id 
      FROM albums a
      LEFT JOIN album_reviews ar ON a.album_id = ar.album_id
      JOIN artists art USING (artist_id)
      WHERE ar.user_id = ${userId}
      GROUP BY a.album_id
      ORDER BY avg_rating DESC
      LIMIT 0, 10;
    `);

    // get albums not yet rated
    const notYetRatedAlbums = await connection.query(`
      SELECT DISTINCT album_title, artist_name, album_image, AVG(ar.album_rating) AS avg_rating, a.album_id 
      FROM albums a
      LEFT JOIN album_reviews ar ON a.album_id = ar.album_id
      JOIN artists art USING (artist_id)
      WHERE ar.user_id != ${userId}
      GROUP BY a.album_id
      ORDER BY avg_rating DESC
      LIMIT 0, 10;
    `);

    connection.release();
    return new Response(JSON.stringify([topRatedAlbums[0], notYetRatedAlbums[0], albumsRatedByUser[0]]), {status: 200});

  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}