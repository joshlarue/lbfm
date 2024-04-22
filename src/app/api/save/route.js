'use server'
import pool from '../../db/pool';

export async function POST(req, res) {
  const request = await req.json();

  // square brackets turn request into an array so map can work :)
  const songOrder = request.map(song => song.track_number);
  let stringSongOrder = songOrder.join(",");

  try {
    const connection = await pool.getConnection();

    // get album title, artist, image, and avg album rating
    connection.execute(`
                    INSERT INTO album_review (songs_ranking)
                    VALUES ("${stringSongOrder}");
                  `);

    connection.release();
    return new Response(JSON.stringify(1, {status: 200}));
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}