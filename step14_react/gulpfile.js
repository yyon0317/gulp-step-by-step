const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps  = require('gulp-sourcemaps');

//dist 폴더를 기준으로 웹서버 실행 /////앞으로
function server() {
	return browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
}

//HTML 파일을 dist 로 복사
function buildHtml() {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
}

//자바스크립트 파일을 browserify로 번들링
function buildJavascript() {
	 // mkdirp를 사용하여 'dist/js' 디렉토리를 생성합니다.
	return browserify({entries: ['src/js/main.js'], debug: true})
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.on('error', function (err) {
			//browserify bundling 과정에서 오류가 날 경우 gulp가 죽지않도록 예외처리
			console.error(err);
			this.emit('end');
		})
		.pipe(source('main.js')) //vinyl object 로 변환
		.pipe(buffer()) //buffered vinyl object 로 변환
		.pipe(sourcemaps.init({loadMaps: true, debug: true})) //소스맵 생성 준비
		.pipe(uglify()) //minify 해서
		.pipe(sourcemaps.write('./')) //생성된 소스맵을 스트림에 추가
		.pipe(gulp.dest('dist/js')) //dist 폴더에 저장
		.pipe(browserSync.reload({stream: true})); //browserSync 로 브라우저에 반영
}

//파일 변경 감지
function watch() {
	gulp.watch('src/**/*.js', buildJavascript);
	gulp.watch('src/**/*.html', buildHtml);
}


//gulp를 실행하면 default 로 minifycss task를 실행
exports.default = gulp.series(gulp.parallel(server, watch));



//기존의 Gulp 3.x 버전에서 Gulp 4.x 버전으로 업그레이드를 해야합니다. Gulp 4.x 버전은 task dependency를 정의할 때 사용하는 방법이 바뀌었기 때문에, gulp.task()의 2번째 인자로 배열 대신 함수를 사용합니다. 또한, gulp.task()를 사용할 때 함수를 이름 없이 직접 정의하는 것이 아니라, gulp.series() 또는 gulp.parallel()을 사용하여 task를 조합하는 방식으로 바뀌었습니다.
// gulp.task()를 사용하지 않고, function으로 task를 정의하고 exports로 내보내고 있습니다. 또한, gulp.series()와 gulp.parallel()을 사용하여 task를 조합하고 있습니다.