const fs = require('fs');

fs.writeFile('./output.txt', 'Hello World!', (err) => {
  if (err) {
    console.log('Error : ' + err);
  }
  console.log('output.txt 파일에 데이터 쓰기 완료');
});
