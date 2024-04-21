'use server'
import pool from '../../../db/pool';

export async function GET(req, res) {
  // get the id of album from slug
  let albumId = req.url.split('/')[req.url.split('/').length-1];
  try {
    const connection = await pool.getConnection();

    // get album title, artist, image, and avg album rating
    const [albumResults] = await connection.query(`
                                            SELECT DISTINCT album_title, artist_name, album_image, al.avg_rating
                                            FROM albums al, artists ar, album_artists aa, songs s
                                            WHERE al.album_id = aa.album_id
                                            AND al.artist_id = aa.artist_id
                                            AND aa.artist_id = ar.artist_id
                                            AND s.album_id = al.album_id
                                            AND al.album_id = '${albumId}';
                                            `);

    const [songResults] = await connection.query(`
                                            SELECT DISTINCT song_title, song_id, s.avg_rating
                                            FROM albums al, songs s
                                            WHERE s.album_id = al.album_id
                                            AND al.album_id = '${albumId}';
                                            `);

    connection.release();
    return new Response(JSON.stringify([albumResults, songResults]), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}