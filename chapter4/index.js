const http = require('http');
const message =[];
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify('Hello world'));
});

console.log('Listening on http://localhost:3000');
server.listen(3000, 'localhost');
