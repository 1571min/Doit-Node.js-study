const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  errorHandler = require('errorhandler');
const static = require('serve-static');

const expressErrorHandler = require('express-error-handler');

const expressSession = require('express-session');

const MongoClient = require('mongodb').MongoClient;

const app = express();

const router = express.Router();

//데이터 베이스 연결
let database;
function connectDB() {
  const databaseUrl = 'mongodb://localhost:27017';

  MongoClient.connect(databaseUrl, (err, db) => {
    if (err) throw err;

    console.log('데이터 베이스에 연결되었습니다. : ' + databaseUrl);

    database = db.db('local');
  });
}

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  })
);

/*
 * 로그인 라우팅
 */
router.route('/process/login').post((req, res) => {
  console.log('process/login 호출됨');

  const paramId = req.param('id');
  const paramPassword = req.param('password');

  if (database) {
    authUser(database, paramId, paramPassword, (err, docs) => {
      if (err) {
        throw err;
      }

      if (docs) {
        console.dir(docs);
        const username = docs[0].name;
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>로그인 성공</h2>');
        res.write('<div><p>사용자 아이디 :' + paramId + '</p></div>');
        res.write('<div><p>사용자 이름 :' + username + '</p></div>');
        res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
        res.end();
      } else {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>로그인 실패</h2>');
        res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오.</p></div>');
        res.write("<br><br><a href='public/login.html'>다시 로그인하기</a>");
        res.end();
      }
    });
  } else {
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>데이터 베이스 연결 실패</h2>');
    res.end();
  }
});

/*
 * 유저 추가 라우팅
 */
router.route('/process/adduser').post((req, res) => {
  console.log('process/adduser 호출됨');

  const paramId = req.body.id || req.query.id;
  const paramPassword = req.body.password || req.query.password;
  const paramName = req.body.name || req.query.name;

  if (database) {
    addUser(database, paramId, paramPassword, paramName, (err, result) => {
      if (err) {
        throw err;
      }

      if (result && result.insertedCount > 0) {
        console.dir(result);
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 추가 성공</h2>');
        res.end();
      } else {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 추가 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h2>데이터 베이스 연결 실패</h2>');
    res.end();
  }
});

app.use('/', router);
app.use(errorHandler);

/*
 * 서버 시작
 */
http.createServer(app).listen(app.get('port'), () => {
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  connectDB();
});

function authUser(database, id, password, callback) {
  console.log('authUser 호출됨.');

  const users = database.collection('users');

  users.find({ id: id, password: password }).toArray((err, docs) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (docs.length > 0) {
      console.log(
        '아이디 [%s] , 비밀번호 [%s] 가 일치하는 사용자 찾음. ',
        id,
        password
      );
      callback(null, docs);
    } else {
      console.log('일치하는 사용자를 찾지 못함.');
      callback(null, null);
    }
  });
}

function addUser(database, id, password, name, callback) {
  console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

  const users = database.collection('users');

  users.insertMany(
    [
      {
        id: id,
        password: password,
        name: name,
      },
    ],
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }

      if (result.insertedCount > 0) {
        console.log('사용자 레코드 추가됨 : ' + result.insertedCount);
      } else {
        console.log('추가된 레코드가 없음 .');
      }
      callback(null, result);
    }
  );
}
