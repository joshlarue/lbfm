'use server'
import { Cookies } from 'js-cookie';
import pool from '../../db/pool';
import 'fs-extra';

export async function GET(req, res) {
  const user_id = Cookies.get('user_id');
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(`SELECT DISTINCT album_title, artist_name, album_image, al.avg_rating, album_id 
                                              FROM albums al, artists ar 
                                              WHERE al.artist_id = ar.artist_id
                                              LIMIT 0, 21;`);
    connection.release();
    return new Response(JSON.stringify(results), {status: 200});

  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}