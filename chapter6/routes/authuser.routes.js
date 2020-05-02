const mysql = require('mysql');
const express = require('express');
const dbconfig = require('../config/database');
const pool = mysql.createPool(dbconfig);
const router = express.Router();

//사용자 인증 함수
const authUser = (id, password, callback) => {
  pool.getConnection((err, conn) => {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('데이터 베이스 연결 스레드 아이다 : ' + conn.threadId);

    const columns = ['id', 'name', 'age'];
    const tablename = 'users';

    const exec = conn.query(
      'select ?? from ?? where id = ? and password = ?',
      [columns, tablename, id, password],
      (err, rows) => {
        conn.release();
        console.log('실행 대상 SQL : ' + exec.sql);

        if (rows.length > 0) {
          console.log(
            '아이디 [%s], 패스워드 [%s] 가 일치 하는 사용자 찾음 ',
            id,
            password
          );
          callback(null, rows);
        } else {
          console.log('일치하는 사용자를 찾지 못함.');
          callback(null, null);
        }
      }
    );
  });
};

router.post('/', (req, res) => {
  console.log('/process/adduser 호출됨');

  const paramId = req.body.id || req.query.id;
  const paramPassword = req.body.password || req.query.password;

  console.log('요청 파라미터 : ' + paramId + ',' + paramPassword);

  if (pool) {
    authUser(paramId, paramPassword, (err, rows) => {
      if (err) {
        console.error('사용자 로그인 중 오류 발생 : ' + err.stack);

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 추가 중 오류 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      if (rows) {
        console.dir(rows);
        const username = rows[0].name;

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>로그인 성공</h2>');
        res.write('<div><p>사용자 아이디 :' + paramId + '</p></div>');
        res.write('<div><p>사용자 이름 :' + username + '</p></div>');
        res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
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
module.exports = router;
