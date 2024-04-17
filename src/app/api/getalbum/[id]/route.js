'use server'
import pool from '../../../db/pool';

export async function GET(req, res) {
  // get the id of album from slug
  let albumId = req.url.split('/')[req.url.split('/').length-1];
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * from albums WHERE album_id='+albumId+';');
    connection.release();
    return new Response(JSON.stringify(results), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}