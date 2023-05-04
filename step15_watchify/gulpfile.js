const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const mergeStream = require('merge-stream');
const gutil = require('gulp-util');

//dist 폴더를 기준으로 웹서버 실행
gulp.task('server', gulp.series('build:javascript', 'build:html', function () {
	return browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
}));

//HTML 파일을 dist 로 복사
gulp.task('build:html', function () {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
});

//자바스크립트 파일을 browserify로 번들링
gulp.task('build:javascript', function () {

	var entries = [{
		src: 'src/js/first.js',
		filename: 'first.js'
	}, {
		src: 'src/js/second.js',
		filename: 'second.js'
	}, {
		src: 'src/js/third.js',
		filename: 'third.js'
	}];

	return mergeStream.apply(null, entries.map(function (entry) {
		var target = watchify(browserify({entries: entry.src, debug: true, cache: {}, packageCache: {}}))
			.transform(babelify, {presets: ['@babel/preset-env', '@babel/preset-react']});

		var bundle = function () {
			console.log(gutil.colors.green(entry.filename), 'bundling..');
			console.time(gutil.colors.green(entry.filename));

			return target.bundle()
			.on('error', function (err) {
				//browserify bundling 과정에서 오류가 날 경우 gulp가 죽지않도록 예외처리
				console.error(err);
				this.emit('end');
			})
			.pipe(source(entry.filename)) //vinyl object 로 변환
			.pipe(buffer()) //buffered vinyl object 로 변환
			.pipe(sourcemaps.init({loadMaps: true, debug: true})) //소스맵 생성 준비
			.pipe(uglify()) //minify 해서
			.pipe(sourcemaps.write('./')) //생성된 소스맵을 스트림에 추가
			.pipe(gulp.dest('dist/js')) //dist 폴더에 저장
			.on('end', function () {
				console.timeEnd(gutil.colors.green(entry.filename));
			})
			.pipe(browserSync.reload({stream: true})); //browserSync 로 브라우저에 반영
		};

		target.on('update', bundle);
		return bundle();
	}));
});


//파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/**/*.html', gulp.series('build:html'));
});

//gulp를 실행하면 default 로 minifycss task를 실행
gulp.task('default', gulp.series('server', 'watch'));

//- npm install gulp-uglify browser-sync browserify babelify watchify vinyl-source-stream vinyl-buffer gulp-sourcemaps merge-stream gulp-util


