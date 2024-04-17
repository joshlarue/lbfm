'use server'
const mysql = require('mysql');

export async function GET(request) {
  const albumId = request.url.split("/")[request.url.split("/").length-1];
  console.log(albumId);
  let connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  });
  connection.connect();
  let result = connection.query('SELECT * from albums WHERE artist_id='+albumId+";", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    connection.end();
    return results;
  });

  return new Response(result);
} 