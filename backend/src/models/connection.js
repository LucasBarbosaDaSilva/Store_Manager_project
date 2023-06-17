const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  password: process.env.MYSQL_PASSWORD || 'password',
  user: process.env.MYSQL_USERNAME || 'root',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  port: process.env.MYSQL_PORT || 3306,
});

module.exports = connection;