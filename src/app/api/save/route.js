'use server'
import pool from '../../db/pool';

export async function POST(req, res) {
  const request = await req.json();

  // square brackets turn request into an array so map can work :)
  const songOrder = request[2].map(song => song.track_number);
  let stringSongOrder = songOrder.join(",");

  const album_id = request[0].album_id;
  const album_rating = request[1];

  try {
    const connection = await pool.getConnection();

    // get album title, artist, image, and avg album rating
    connection.execute(`
                    INSERT IGNORE INTO album_review (album_id, album_rating, songs_ranking)
                    VALUES ("${album_id}", ${album_rating}, "${stringSongOrder}");
                  `);

    connection.release();
    return new Response(JSON.stringify(1, {status: 200}));
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}