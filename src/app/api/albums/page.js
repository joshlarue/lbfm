'use server'
const mysql = require('mysql');

let connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});
connection.connect();
// connection.query('SELECT * from artists', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

connection.end();