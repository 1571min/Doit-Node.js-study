process.on('tick', (count) => {
  console.log('tick이벤트 발생함 : %s', count);
});

setTimeout(() => {
  console.log('2초 후에 tick 이벤트 발생함');
  process.emit('tick', '2');
}, 2000);
