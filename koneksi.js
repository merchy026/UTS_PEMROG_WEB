var mysql = require('mysql');

//buat koneksi database
const conn = mysql.createConnection ({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_bengkel'
});

conn.connect((err)=>{
  if(err)  throw err;
  Console.log('Mysql terkoneksi');
});

module.exports = conn;