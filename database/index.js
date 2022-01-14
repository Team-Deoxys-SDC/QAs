const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'questionsAndAnswers'
})

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to server from database');
  }
});

module.exports = connection;