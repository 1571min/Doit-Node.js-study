const express = require('express');
var mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('Root');
});

app.get('/persons', (req, res) => {
  connection.query('SELECT * from Persons', function (err, rows, fields) {
    if (err) throw err;

    console.log('The solution is ', rows, fields);
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
