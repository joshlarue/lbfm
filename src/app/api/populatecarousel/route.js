'use server'
const mysql = require('mysql2');

export async function GET(request) {
  let connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  });
  connection.connect();

  const getData = async (query) => {
    connection.query(query, function (error, result, fields) {
      if (error) throw error;;
      return result;
    });
  }
  // result is returning undefined
  let result = await getData('SELECT * from albums');
  connection.end();
  console.log(result);
  

  return new Response(result);
}