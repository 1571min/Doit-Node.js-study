const Calc = require('./calc3');

const clac = new Calc();
clac.emit('stop');

console.log(clac.add(2, 3));

console.log(Calc.title + '에 스탑 이벤트 전달함');
