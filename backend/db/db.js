const mysql = require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

connection.connect((err)=> {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports=connection;