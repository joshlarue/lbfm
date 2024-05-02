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
    const albumPageResults = await connection.query(`
      SELECT DISTINCT album_title, artist_name, album_image, al.avg_rating, al.album_id, COUNT(ars.album_id)
      FROM albums al, artists ar, album_artists aa, album_reviews ars
      WHERE al.album_id = aa.album_id
      AND al.artist_id = aa.artist_id
      AND aa.artist_id = ar.artist_id
      AND ars.album_id = al.album_id
      LIMIT ${lowerLimit}, ${upperLimit};
    `);

    connection.release();
    return new Response(JSON.stringify({albumPageResults}), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}