const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Saurav@2999',
  database: 'todosql'
});

connection.connect((err)=> {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports=connection;