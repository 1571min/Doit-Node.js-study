const fs = require('fs');

const data = fs.readFileSync('./package.json', 'utf8');

console.log(data);
console.log('파일 읽도록 요청');
