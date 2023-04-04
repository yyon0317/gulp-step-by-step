const gulp = require('gulp');
const uglify = require('gulp-uglify');

//자바스크립트 파일을 minify
function minifyJS() {
	return gulp.src('src/*.js') //src 폴더 아래의 모든 js 파일을
		.pipe(uglify()) //minify 해서
		.pipe(gulp.dest('dist')); //dist 폴더에 저장
}

//gulp를 실행하면 default 로 uglify task를 실행
exports.default = gulp.series(minifyJS);

//src 하위의 모든 디렉토리의 js 확장자를 가진 파일
//'src/**/*.js'
//foo 디렉토리와 bar 디렉토리Gulp 4에서는 태스크를 정의하기 위해 gulp.task() 대신 exports 객체를 사용하며, 태스크 함수는 익명 함수가 아닌 이름 있는 함수로 정의해야 합니다. 또한, gulp.series()를 사용하여 여러 태스크를 연결합니다.에서 js 확장자를 가진 파일
//['foo/*.js', 'bar/*.js']

