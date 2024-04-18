'use server'
import pool from '../../../db/pool';


export async function GET(req, res) {
  // get the id of album from slug
  let albumId = req.url.split('/')[req.url.split('/').length-1];
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(`
                                            SELECT album_title, artist_name, song_title, al.avg_rating, s.avg_rating, al.album_id
                                            FROM albums al, artists ar, album_artists aa, songs s
                                            WHERE al.album_id = aa.album_id
                                            AND al.artist_id = aa.artist_id
                                            AND aa.artist_id = ar.artist_id
                                            AND s.album_id = al.album_id
                                            AND al.album_id = '${albumId}';
                                            `);
    console.log(results);
    connection.release();
    return new Response(JSON.stringify(results), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}