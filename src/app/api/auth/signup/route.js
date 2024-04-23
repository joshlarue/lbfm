'use server'
import bcrypt from 'bcrypt';
import pool from '../../../db/pool';
import sha256 from 'sha256';

export async function POST(req, res) {
  const formData = await req.formData();

  const username = formData.get("username");
  const user_id = sha256(username);
  const email = formData.get("email");
  const password = formData.get("password");
  const hashedPassword = await bcrypt.hash(password, 10);
  if (username == 'undefined' || email == 'undefined' || password == 'undefined') {
    if (password.length < 8) {
      return new Response(JSON.stringify({data: "password too short"}), {status: 500, body: "password too short"});
    } else {
      return new Response(-2, {status: 500});
    }
  } else {
    // call DB to create a user
    try {
      const connection = await pool.getConnection();

      let userList = await connection.query(`
                                            SELECT username, email FROM users
                                            WHERE username = '${username}'
                                            OR email = '${email}';
                                              `);
      const findUserExists = (userList) => {
        for (let i = 0; i < userList[0].length; i++) {
          if (userList[0][i].username == (username) || userList[0][i].email == (email)) {
            return true;
          } else {
            return false;
          }
          
        }
      }
      if (findUserExists(userList)) {
        console.log("User already exists");
        return new Response(0, {status: 500});
      } else {
        let result = await connection.query(`
                                        INSERT INTO users (user_id, password, username, email)
                                        VALUES ('${user_id}', '${hashedPassword}', '${username}', '${email}');
                                        `);
        connection.release();
        console.log("successfully created user");
        return new Response(1, {status: 200});
      }
    } catch (error) {
      console.error("Error creating user", error);
      return new Response({status: 500});
    }
  }
}