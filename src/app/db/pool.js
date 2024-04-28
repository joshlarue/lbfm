import mysql from 'mysql2/promise';
/* const pool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  port     : process.env.MYSQL_PORT,
  ssl      : 'required'
}); */

const pool = mysql.createPool('mysql://doadmin:AVNS_6Iam5vDViJL3lnvtb35@db-lbfm-do-user-16333960-0.c.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUIRED');

export default pool;
