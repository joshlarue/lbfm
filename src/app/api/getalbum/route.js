'use server'
import pool from '../../db/pool';

export async function GET(req, res) {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * from albums WHERE album_id='+req.id+';');
    connection.release();
    return new Response(JSON.stringify(results), {status: 200});
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}