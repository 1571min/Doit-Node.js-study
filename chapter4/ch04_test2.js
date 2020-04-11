process.on('exit', () => {
  console.log('exit 이벤트 발생함');
});

setTimeout(() => {
  console.log('2초 후에 시스텝 종료 시도함');
  process.exit();
}, 2000);
