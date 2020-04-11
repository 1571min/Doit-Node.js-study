const fs = require('fs');

fs.open('./output.txt', 'w', (err, fd) => {
  if (err) throw err;

  const buf = new Buffer('안녕\n');
  fs.write(fd, buf, 0, buf.length, null, (err, written, buffer) => {
    if (err) throw err;
    console.log(err, written, buffer);

    fs.close(fd, function () {
      console.log('output.txt 파일에 데이터 쓰기 완료');
    });
  });
});
