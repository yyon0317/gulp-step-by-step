const { series } = require('gulp');

function hello(cb) {
    console.log('Hello');
    cb();
}

function world(cb) {
    console.log('World!');
    cb();
}

exports.default = series(hello, world);
//두번째 파라메터에 ['hello'] 가 추가되어 있는데, 이렇게 두번째 파라메터에 먼저 수행되어야할 task들의 이름을 배열 형태로 넣어두면 해당 task들을 먼저 수행한 후에 해당 task를 수행하게 됩니다.
// Gulp v4에서 새로 추가된 series 메소드를 사용하여 태스크를 연속적으로 실행합니다. series 메소드는 첫 번째 인수부터 차례대로 실행되며, 모든 태스크가 완료된 후에 콜백 함수가 호출됩니다.

//또한, 각 태스크의 마지막에는 콜백 함수를 호출해야 합니다. 이 콜백 함수는 해당 태스크가 완료되었음을 Gulp에 알려줍니다. 이 콜백 함수를 호출하지 않으면 Gulp가 해당 태스크를 계속 실행하고 있을 수 있습니다.