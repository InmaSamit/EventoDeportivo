//conexion con la BD
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  port: process.env.PORT_DB,
  database: process.env.NAME_DB,
});
module.exports = pool.promise();