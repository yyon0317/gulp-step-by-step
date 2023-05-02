const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const minifycss = require('gulp-clean-css');
const minifyhtml = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps  = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const plumber = require('gulp-plumber');
const { series } = require('gulp');

const errorHandler = function (error) {
	console.error(error.message);
	this.emit('end');
};

const plumberOption = {
	errorHandler: errorHandler
}

//dist 폴더를 기준으로 웹서버 실행
// browser-sync 로컬 서버
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "./dist"
		},
		port: 8080
	});
});

//HTML 파일을 minify
gulp.task('minifyhtml', function () {
	return gulp.src('src/**/*.html') //src 폴더 아래의 모든 html 파일을
		.pipe(plumber(plumberOption)) //빌드 과정에서 오류 발생시 gulp가 죽지않도록 예외처리
		.pipe(newer('dist')) //dist에 있는 결과물보다 새로운 파일만 다음 단계로 진행
		.pipe(minifyhtml()) //minify 해서
		.pipe(gulp.dest('dist')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

//자바스크립트 파일을 browserify로 번들링
gulp.task('uglify', function () {
	return browserify({entries: ['src/js/main.js'], debug: true})
		.bundle() //browserify로 번들링
		.on('error', errorHandler) //browserify bundling 과정에서 오류가 날 경우 gulp가 죽지않도록 예외처리
		.pipe(source('main.js')) //vinyl object 로 변환
		.pipe(buffer()) //buffered vinyl object 로 변환
		.pipe(plumber(plumberOption)) //빌드 과정에서 오류 발생시 gulp가 죽지않도록 예외처리
		.pipe(sourcemaps.init({loadMaps: true, debug: true})) //소스맵 생성 준비
		.pipe(uglify()) //minify 해서
		.pipe(sourcemaps.write('./')) //생성된 소스맵을 스트림에 추가
		.pipe(gulp.dest('dist/js')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

//CSS 파일을 minify
gulp.task('minifycss', function () {
	return gulp.src('src/**/*.css') //src 폴더 아래의 모든 css 파일을
		.pipe(plumber(plumberOption)) //빌드 과정에서 오류 발생시 gulp가 죽지않도록 예외처리
		.pipe(sourcemaps.init({loadMaps: true, debug: true})) //소스맵 생성 준비
		.pipe(cached('css')) //파일들을 캐시하고 캐시된 것보다 새로운 파일만 다음 단계로 진행
		.pipe(minifycss()) //새로운 파일만 minify (@import된 파일이 수정된 경우 최상위 파일은 캐시된 상태 그대로이므로 minifycss를 타지 않아 정상적으로 종속성 관리가 이루어지지 않는 점을 주의!)
		.pipe(remember('css')) //minify된 새로운 파일과 캐시된 나머지 내용들을 다시 스트림으로
		.pipe(concat('main.css')) //병합하고
		.pipe(sourcemaps.write('./')) //생성된 소스맵을 스트림에 추가
		.pipe(gulp.dest('dist/css')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

// 파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/**/*.js', gulp.series('uglify'));
	gulp.watch('src/**/*.css', gulp.series('minifycss'));
	gulp.watch('src/**/*.html', gulp.series('minifyhtml'));
});
	
// 빌드
gulp.task('build', gulp.series('uglify', 'minifycss', 'minifyhtml'));
	
// gulp를 실행하면 수행할 default 작업
gulp.task('default', gulp.series('build', gulp.parallel('browser-sync', 'watch')));

	
// 웹서버 구동
gulp.task('server', function () {
	connect.server({
	  root: 'dist',
	  port: 3000,
	  livereload: true
	});
  });