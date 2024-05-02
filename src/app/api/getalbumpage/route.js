'use server'
import pool from '../../db/pool';

export async function POST(req, res) {
  const formData = await req.formData();
  const userId = formData.get("userId");
  const lowerLimit = formData.get("lower_limit");
  const upperLimit = formData.get("upper_limit");

  try {
    const connection = await pool.getConnection();

    // get album title, artist, image, and avg album rating
    const response = await connection.query(`
      SELECT DISTINCT album_title, artist_name, album_image, CONVERT(date_released, DATE) AS date_released, a.album_id, AVG(album_rating) AS avg_rating, COUNT(ar.album_id) AS num_reviews
      FROM albums a
      LEFT JOIN album_reviews ar ON a.album_id = ar.album_id
      JOIN artists USING(artist_id)
      GROUP BY a.album_id
      LIMIT ${lowerLimit}, ${upperLimit};
    `);
    const albumPageResults = response[0];

    connection.release();
    return new Response(JSON.stringify({albumPageResults}), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}