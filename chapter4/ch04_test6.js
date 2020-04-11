const fs = require('fs');

fs.readFile('./package.json', 'utf8', function (err, data) {
  console.log(data);
  console.log(err);
});

console.log('파일 읽도록 요청');
