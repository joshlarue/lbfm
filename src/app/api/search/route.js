'use server'
import { connect } from 'net';
import pool from '../../db/pool';
import { serialize } from 'v8';

export async function POST(req, res) {
  const formData = await req.formData();
  const query = formData.get("query");
  const searchType = formData.get("search_type");

  const connection = await pool.getConnection();

  try {
    // inits response to be returned as an error in case the switch fails
    let response = new Response({status: 500});
    let result;

    // queries DB based on the type of search selected on frontend
    switch (searchType) {
      case 'albums':
        result = await connection.query(`
          SELECT a.album_title, a.album_id
          FROM albums a
          WHERE a.album_title LIKE '%${query}%'
          GROUP BY a.album_title, a.album_id;
        `);
        const albums = result[0];

        response = new Response(JSON.stringify({albums}), {status: 200});
        break;

      case 'songs':
        result = await connection.query(`
          SELECT s.song_title, a.album_id
          FROM songs s, albums a
          WHERE s.song_title LIKE '%${query}%'
          AND s.album_id = a.album_id
          GROUP BY s.song_title, a.album_id;
        `);
        const songs = result[0];

        response = new Response(JSON.stringify({songs}), {status: 200});
        break;

      case 'users':
        // currently must have at least one rating to show up in search results
        result = await connection.query(`
          SELECT username, COUNT(ar.user_id)
          FROM users u, album_reviews ar
          WHERE username LIKE '${query}%'
          AND ar.user_id = u.user_id
          GROUP BY username;
        `);

        // appends returned usernames to list with a parallel list containing the number of reviews they have created
        let returnedUsernames = [];
        let numUserRatings = [];
        for (let i = 0; i < result[0].length; i++) {
          returnedUsernames.push(result[0][i]['username']);
          numUserRatings.push(result[0][i]['COUNT(ar.user_id)']);
        }

        response = new Response(JSON.stringify({returnedUsernames, numUserRatings}), {status: 200});
        break;
    }

    connection.release();
    return response;
  } catch (error) {
    connection.release();
    console.error("Error searching users", error);
    return new Response({status: 500});
  }
}