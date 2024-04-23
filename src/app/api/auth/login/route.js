'use server'
import bcrypt from 'bcrypt';
import pool from '../../../db/pool';
import sha256 from 'sha256';

export async function POST(req, res) {
  const formData = await req.formData();
  const connection = await pool.getConnection();

  const username = formData.get("username");
  const user_id = sha256(username);
  const password = formData.get("password");

  try {
    let queryUser = await connection.query(`
                                          SELECT DISTINCT password FROM users
                                          WHERE user_id = '${user_id}';
                                          `);
    const queryPassword = queryUser[0][0]['password'];

    const passwordAuthenticated = () => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, queryPassword, (err, result) => {
          if (err) {
            console.log(err);
            reject(false);
          } else if (result === true) {
            console.log("Password matches DB");
            resolve(true);
          } else {
            console.log("Password does not match DB");
            resolve(false);
          }
        })
      });
    }

    const auth = async () => {
      try {
        const isAuth = await passwordAuthenticated();
        if (isAuth) {
          console.log("Authed");
          connection.release();
          return new Response(
            JSON.stringify({ data: "authenticated" }),
            {
              status: 200,
            }
          );
        } else {
          connection.release();
          return new Response(
            JSON.stringify({ data: "inauthenticated" }),
            {
              status: 500,
            }
          );
        }
      } catch (e) {
        console.error("Error during password authentication");
        connection.release();
        return new Response(
          JSON.stringify({ data: "error during authentication" }),
          {
            status: 500,
          }
        );
      }
    }

    // returns response from auth function to frontend
    const response = await auth();
    return new Response(
      JSON.stringify({ data: await response.json() }),
      {
        status: 200,
      }
    );
    
  } catch (error) {
    console.error("Error logging in", error);
    connection.release();
    return new Response(
      JSON.stringify({ data: "error logging in" }),
      {
        status: 500,
      }
    );
  }
}