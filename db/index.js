// 引入mysql
const mysql = require('mysql');

// 连接mysql
const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'123456',
  database:'api_server'
});

module.exports = db;