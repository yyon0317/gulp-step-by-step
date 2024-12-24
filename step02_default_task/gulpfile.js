const gulp = require('gulp');

gulp.task('hello', function () {
    return new Promise((resolve) => {
        console.log('Hello World!');
        resolve(); // 작업 완료
    });
});

gulp.task('default', gulp.series('hello'));



//3에서 4로 버전업이 되면서, gulp.task를 정의 하는 규칙이 조금 바뀌었다.
//간단히 말하면 ==> gulp.task(name, deps, func) 에서 gulp.task(name, gulp.{series|parallel}(deps, func))으로 바꿔주자
//Task를 열거할 때 gulp.series인지 gulp.parallel인지만 수정해주면 된다. 직렬-병렬 실행 기능이 생긴것 같다.