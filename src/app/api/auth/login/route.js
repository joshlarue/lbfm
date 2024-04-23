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
      let isAuth;
      bcrypt.compare(password, queryPassword, (err, result) => {
        if (result === true) {
          console.log("Password matches DB");
          isAuth = true;
        } else {
          console.log(err);
          isAuth = false;
        }
      });
      return isAuth;
    }

    if (() => passwordAuthenticated()) {
      console.log("Authed");
      return new Response(
        JSON.stringify({ data: "authenticated" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ data: "inauthenticated" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error logging in", error);
    return new Response(
      JSON.stringify({ data: "error logging in" }),
      {
        status: 500,
      }
    );
  } finally {
    connection.release();
  }
}