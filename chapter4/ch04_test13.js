const fs = require('fs');
const http = require('http');
const server = http.createServer((res, req) => {
  const instream = fs.createReadStream('./output.txt');
  instream.pipe(res);
});

server.listen('127.0.0.1');
