const express = require('express');
const mysql = require('mysql');
const http = require('http');
mysql.createPool();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1224',
  port: 3306,
  database: 'my_db',
});

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  connection.connect();
  connection.query('SELECT * from persons', (err, rows, fields) => {
    if (!err) {
      console.log('The solution is : ', rows);
      res.send('this is test : ', rows);
    } else {
      console.log('Error while performing Query.', err);
      res.send('database error');
    }
  });
  connection.end();
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('익스프레스 서버를 시작합니다 : ' + app.get('port'));
});
