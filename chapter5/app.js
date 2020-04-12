const express = require('express');
const http = require('http');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('this is test');
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('익스프레스 서버를 시작합니다 : ' + app.get('port'));
});
