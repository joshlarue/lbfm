'use server'
import Cookies from 'js-cookie';
import pool from '../../db/pool';
import 'fs-extra';

export async function POST(req, res) {
  const user_id = Cookies.get('user_id');
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(`
      SELECT DISTINCT album_title, artist_name, album_image, AVG(ar.album_rating) AS avg_rating, a.album_id 
      FROM albums a
      LEFT JOIN album_reviews ar ON a.album_id = ar.album_id
      JOIN artists art USING (artist_id)
      GROUP BY a.album_id
      LIMIT 0, 21;
    `);
    connection.release();
    return new Response(JSON.stringify(results), {status: 200});

  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}