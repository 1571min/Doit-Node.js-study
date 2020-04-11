const url = require('url');
const querystring = require('querystring');
const curUrl = url.parse(
  'http://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty'
);

const curStr = url.format(curUrl);

console.log('주소 문자열 : %s', curStr);
console.dir(curUrl);
/////////////////////////////////////////

const param = querystring.parse(curUrl.query);

console.log('요청 파라미터 중 query 의 값 : % s', param.query);
console.log('원본 요청 파라미터 : %s ', querystring.stringify(param));
