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
    
    let result = await connection.query(`
                    SELECT username FROM users
                    WHERE username LIKE '${username}%';
                    `);

    // appends returned usernames to list
    let returnedUsernames = [];
    for (let i = 0; i < result[0].length; i++) {
      returnedUsernames.push(result[0][i]['username']);
    }
    console.log(returnedUsernames);

    connection.release();
    return new Response(JSON.stringify(returnedUsernames), {status: 200});
  } catch (error) {
    connection.release();
    console.error("Error searching users", error);
    return new Response({status: 500});
  }
}