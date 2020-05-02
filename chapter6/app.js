const express = require('express'),
  http = require('http'),
  path = require('path');

const bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  static = require('serve-static'),
  errorHandler = require('errorhandler');

const expressErrorHandler = require('express-error-handler');

const expressSession = require('express-session');

const sqlrouter = require('./routes/index.routes');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(sqlrouter);

http.createServer(app).listen(app.get('port'), () => {
  console.log('서버가 시작되었습니다 . 포트 : ' + app.get('port'));
});
