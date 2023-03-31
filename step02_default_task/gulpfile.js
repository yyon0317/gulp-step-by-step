var gulp = require('gulp');

// hello world 라고 콘솔에 찍는 task
gulp.task('hello', function () {
	return console.log('Hello World!');
});

//gulp를 실행하면 default 로 hello task 실행
gulp.task('default', gulp.series(['hello']));


//3에서 4로 버전업이 되면서, gulp.task를 정의 하는 규칙이 조금 바뀌었다.
//간단히 말하면 ==> gulp.task(name, deps, func) 에서 gulp.task(name, gulp.{series|parallel}(deps, func))으로 바꿔주자
//Task를 열거할 때 gulp.series인지 gulp.parallel인지만 수정해주면 된다. 직렬-병렬 실행 기능이 생긴것 같다.