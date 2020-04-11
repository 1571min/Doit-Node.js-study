const util = require('util');
const EventEmitter = require('events').EventEmitter;

const Calc = function () {
  let self = this;

  this.on('stop', () => {
    console.log('Calc에 stop event 전달됨');
  });
};

util.inherits(Calc, EventEmitter);

Calc.prototype.add = function (a, b) {
  return a + b;
};

module.exports = Calc;
module.exports.title = 'calculator';
