const fs = require('fs');

fs.open('./output.txt', 'r', (err, fd) => {
  if (err) throw err;

  const buf = new Buffer(10);
  console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));

  fs.read(fd, buf, 0, buf.length, null, (err, bytesRead, buffer) => {
    if (err) throw err;

    const inStr = buffer.toString('utf8', 0, bytesRead);
    console.log('파일에서 읽은 데이터 : %s', inStr);

    console.log(err, bytesRead, buffer);

    fs.close(fd, function () {
      console.log('output.txt 파일에 데이터 읽기 완료');
    });
  });
});
