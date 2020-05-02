const mysql = require('mysql');
const express = require('express');
const dbconfig = require('../config/database');
const pool = mysql.createPool(dbconfig);
const router = express.Router();

//사용자 추가 함수
const addUser = function (id, name, age, password, callback) {
  console.log('addUser 호출됨');
  pool.getConnection((err, conn) => {
    if (err) {
      if (conn) {
        conn.release(); //필수
      }

      callback(err, null);
      return;
    }
    const data = { id: id, name: name, age: age, password: password };

    //sql문을 실행함
    const exec = conn.query('insert into users set? ', data, (err, result) => {
      conn.release();
      console.log('실행 대상 SQL : ' + exec.sql);

      if (err) {
        console.log('SQL 실행 시 오류 발생함.');
        console.dir(err);

        callback(err, null);

        return;
      }

      callback(null, result);
    });
  });
};

router.post('/', (req, res) => {
  console.log('/process/adduser 호출됨');

  const paramId = req.body.id || req.query.id;
  const paramPassword = req.body.password || req.query.password;
  const paramName = req.body.name || req.query.name;
  const paramAge = req.body.age || req.query.age;

  console.log(
    '요청 파라미터 : ' +
      paramId +
      ',' +
      paramPassword +
      ',' +
      paramName +
      ',' +
      paramAge
  );

  if (pool) {
    addUser(paramId, paramName, paramAge, paramPassword, (err, addedUser) => {
      if (err) {
        console.error('사용자 추가중 오류 발생 : ' + err.stack);

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>사용자 추가 중 오류 발생</h2>');
        res.write('<p>' + err.stack + '</p>');
        res.end();

        return;
      }

      if (addedUser) {
        console.dir(addedUser);
        console.log('inserted' + addedUser.affectedRows + 'rows');

        const insertId = addedUser.insertId;
        console.log('추가한 레코드의 아이디 : ' + insertId);

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

module.exports = router;
