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

  const findUserExists = (userList) => {
    for (let i = 0; i < userList[0].length; i++) {
      if (userList[0][i].username == (username) || userList[0][i].email == (email)) {
        return true;
      } else {
        return false;
      }
    }
  }

  const validatePass = () => {
    console.log(password.length);
    console.log(email, username);
    let validationStatus = new Response(JSON.stringify({data: "validation passed"}), {status: 200});
    if (password.length <= 8 || typeof password == 'undefined' || password == 'password') {
      console.log(password);
      validationStatus = new Response(JSON.stringify({data: "password too short"}), {status: 500});
    }
    if (username == 'undefined' || email == 'undefined') {
        validationStatus = new Response(JSON.stringify({data: "fill out all fields"}), {status: 500});
      }
    return validationStatus;
  }

  const passValidated = validatePass();
  console.log(passValidated.status);

  const createUser = async () => {
    let userResponse = new Response(JSON.stringify({data: "User successfully created"}), {status: 200});
    if (passValidated.status === 500) {
      userResponse = new Response(JSON.stringify({data: "Password validation failed"}, {status: 500}));
    } else {
      // call DB to create a user
      try {
        const connection = await pool.getConnection();

        let userList = await connection.query(`
                                              SELECT username, email FROM users
                                              WHERE username = '${username}'
                                              OR email = '${email}';
                                                `);

        if (findUserExists(userList)) {
          userResponse = new Response(JSON.stringify({data: "User already exists"}), {status: 500});
        } else {
          let result = await connection.query(`
                                          INSERT INTO users (user_id, password, username, email)
                                          VALUES ('${user_id}', '${hashedPassword}', '${username}', '${email}');
                                          `);
          connection.release();
          console.log("successfully created user");
          userResponse = new Response(JSON.stringify({data: "successfully created user"}), {status: 200});
        }
      } catch (error) {
        console.error("Error creating user", error);
        userResponse = new Response(JSON.stringify({data: "Error creating user"}), {status: 500});
      }
    }
    return userResponse;
  }

  const userCreated = await createUser();
  let userCreatedRes = await userCreated.json();

  return new Response(JSON.stringify({data: userCreatedRes}), {status: userCreated.status});
}