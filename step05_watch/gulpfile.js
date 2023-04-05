//gulp는 이런 경우를 위해, 파일에 변경이 있을 때마다 변경을 감지해서 task 를 실행할 수 있는 기능을 gulp.watch 라는 메서드로 제공해주고 있습니다.

const gulp = require('gulp');
const uglify = require('gulp-uglify');

// JavaScript 파일을 minify
gulp.task('uglify', () => {
return gulp.src('src/*.js') // src 폴더 아래의 모든 js 파일을
.pipe(uglify()) // minify 해서
.pipe(gulp.dest('dist')); // dist 폴더에 저장
});

// 파일 변경 감지
gulp.task('watch', () => {
gulp.watch('src/*.js', gulp.series('uglify'));
});

// gulp를 실행하면 default로 uglify task와 watch task를 실행
gulp.task('default', gulp.series('uglify', 'watch'));