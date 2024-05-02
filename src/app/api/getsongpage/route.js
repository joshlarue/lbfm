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
      SELECT DISTINCT album_title, song_title, artist_name, album_image, CONVERT(date_released, DATE) AS date_released, a.album_id, AVG(album_rating) AS avg_rating
      FROM albums a, songs s
      LEFT JOIN album_reviews ar ON a.album_id = ar.album_id
      JOIN artists USING(artist_id)
      WHERE s.album_id = a.album_id
      GROUP BY a.album_id
      ORDER BY avg_rating DESC
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