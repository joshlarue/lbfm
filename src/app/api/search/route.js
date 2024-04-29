'use server'
import { connect } from 'net';
import pool from '../../db/pool';

export async function POST(req, res) {

  const formData = await req.formData();
  console.log(formData);
  const username = formData.get("query");
  console.log(username);
  const connection = await pool.getConnection();

  try {
    
    // currently must have at least one rating to show up in search results
    let result = await connection.query(`
                    SELECT username, COUNT(ar.user_id) FROM users u, album_reviews ar
                    WHERE username LIKE '${username}%'
                    AND ar.user_id = u.user_id
                    GROUP BY username;
                    `);
    console.log(result);
    // appends returned usernames to list
    let returnedUsernames = [];
    let numUserRatings = [];
    for (let i = 0; i < result[0].length; i++) {
      returnedUsernames.push(result[0][i]['username']);
      numUserRatings.push(result[0][i]['COUNT(ar.user_id)']);
    }
    console.log(returnedUsernames, numUserRatings);

    connection.release();
    return new Response(JSON.stringify({returnedUsernames, numUserRatings}), {status: 200});
  } catch (error) {
    connection.release();
    console.error("Error searching users", error);
    return new Response({status: 500});
  }
}