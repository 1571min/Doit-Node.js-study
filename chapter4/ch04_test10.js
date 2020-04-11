const output = '안녕1!';
const buffer1 = new Buffer(10);
const len = buffer1.write(output, 'utf8');

console.log(
  '첫번째 버퍼의 문자열 : %s \n 버퍼의 길이 : %d',
  buffer1.toString(),
  len
);

const buffer2 = new Buffer('안녕2!', 'utf8');

console.log(
  '두번째 버퍼의 문자열 : %s \n 버퍼의 길이 : %d',
  buffer2.toString(),
  buffer2.length
);

console.log('%s', Buffer.isBuffer(buffer1));

const byteLen = Buffer.byteLength(output);
const str1 = buffer1.toString('utf8', 0, byteLen);
const str2 = buffer2.toString('utf8');
console.log('buffer 1 : %s ,buffer2 : %s', str1, str2);

const buffer3 = Buffer.concat([buffer2, buffer1]);
console.log(buffer3.toString('utf8'));
