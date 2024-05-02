'use server'
import bcrypt from 'bcrypt';
import pool from '../../../db/pool';
import sha256 from 'sha256';

export async function POST(req, res) {
  const formData = await req.formData();
  const connection = await pool.getConnection();

  const username = formData.get("username");
  const userId = sha256(username);
  const password = formData.get("password");

  try {
    let frontEndResponse;
    let userFound;

    let queryUser = await connection.query(`
      SELECT DISTINCT password FROM users
      WHERE user_id = '${userId}';
    `);
    let queryPassword;
    
    if (queryUser[0].length != 0) {
      queryPassword = queryUser[0][0]['password'];
    } else {
      userFound = false;
      frontEndResponse = new Response(JSON.stringify({ data: "user not found" }), {status: 500});
    }


    // if user and password was found
    if (userFound != false) {
      const passwordAuthenticated = () => {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, queryPassword, (err, result) => {
            if (err) {
              console.log(err);
              reject(false);
            } else if (result === true) {
              console.log("Password matches DB");
              resolve(true);
            } else if (result === false) {
              console.log(result);
              console.log("Password does not match DB");
              resolve(false);
            }
          })
        });
      }
  
      const auth = async () => {
        // baseline response to be returned in case auth fails
        let authResponse = new Response(JSON.stringify({ data: "inauthenticated" }), {status: 500});

        try {
          const isAuth = await passwordAuthenticated();
          console.log(isAuth);
          if (isAuth) {
            console.log("Authed");
            connection.release();
            authResponse = new Response(JSON.stringify({ data: "authenticated" }), {status: 200});
          } else {
            connection.release();
            authResponse = new Response(JSON.stringify({ data: "inauthenticated" }), {status: 500});
          }
          return authResponse;
        } catch (e) {
          console.error("Error during password authentication");
          connection.release();
          authResponse = Response(JSON.stringify({ data: "error during authentication" }), {status: 500});
          return authResponse;
        }
      }
  
      // returns response from auth function to frontend
      // if frontendresponse is null (not responded to because of failed user)
      const response = await auth();
      frontEndResponse = new Response(JSON.stringify({ data: await response.json() }), {status: response.status});
    }

    return frontEndResponse;
  } catch (error) {
    console.error("Error logging in", error);
    connection.release();
    return new Response(JSON.stringify({ data: "error logging in" }), {status: 500});
  }
}
