'use server'
import pool from '../../db/pool';

const query = 
`SELECT album_title, artist_name, avg_rating, al.album_id
FROM albums al, artists ar, album_artists aa
WHERE al.album_id = aa.album_id
AND al.artist_id = aa.artist_id
AND aa.artist_id = ar.artist_id;`

export async function GET(req, res) {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(query);
    connection.release();
    return new Response(JSON.stringify(results), {status: 200});

  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}