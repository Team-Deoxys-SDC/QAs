const mysql = require('mysql2')

const connection = mysql.createPool({
  host: '34.235.127.115',
  user: 'dbuser',
  password: '',
  port: 3306,
  database: 'questionsAndAnswers'
})

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connected to server from database');
//   }
// });

module.exports = connection;