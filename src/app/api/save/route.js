'use server'
import pool from '../../db/pool';

export async function POST(req, res) {

  const request = await req.json();
  console.log(request);

  // square brackets turn request into an array so map can work :)
  const stringSongOrder = request[2].join(",");

  const album_id = request[0].album_id;
  const album_rating = request[1];

  try {
    const connection = await pool.getConnection();
    
    let result = await connection.query(`
                    SELECT album_id FROM album_review
                    WHERE album_id = '${album_id}';
                  `);
    console.log(result);

    let reviewExists = false;
    for (let i = 0; i < result[0].length; i++) {
      if (result[0][i].album_id == `${album_id}`) {
        reviewExists = true;
        break;
      }
    }

    if (reviewExists) {
      connection.execute(`
                      UPDATE album_review
                      SET album_rating = ${album_rating}, songs_ranking = "${stringSongOrder}"
                      WHERE album_id = '${album_id}';
                      `)
    } else {
      connection.execute(`
                      INSERT INTO album_review (album_id, album_rating, songs_ranking)
                      VALUES ("${album_id}", ${album_rating}, "${stringSongOrder}");
                      `);
    }


    connection.release();
    return new Response(JSON.stringify(1, {status: 200}));
  } catch (error) {
    console.error("Error fetching albums", error);
    return new Response({status: 500});
  }
}