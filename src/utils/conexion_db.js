//conexion con la BD
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  port: process.env.PORT_DB,
  database: process.env.NAME_DB,
  dateStrings: true
});

console.log(`Server running!!`);

module.exports = pool.promise();