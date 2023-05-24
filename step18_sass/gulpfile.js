var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass')(require('node-sass'));
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css'); // 업데이트된 부분
var htmlmin = require('gulp-htmlmin'); // 업데이트된 부분
var plumber = require('gulp-plumber');
var series = require('gulp-series'); // 업데이트된 부분
import('inquirer').then(inquirer => {
	// 사용할 코드 작성
  });
  

var errorHandler = function (error) {
	console.error(error.message);
	this.emit('end');
};
var plumberOption = {
	errorHandler: errorHandler
}

gulp.task('minifyhtml', function () {
	return gulp.src('src/**/*.html')
		.pipe(plumber(plumberOption))
		.pipe(htmlmin({ collapseWhitespace: true })) // 업데이트된 부분
		.pipe(gulp.dest('dist'));
});

gulp.task('uglify', function () {
	return gulp.src('src/**/*.js')
		.pipe(plumber(plumberOption))
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('minifycss', function () {
	return gulp.src('src/**/*.scss')
		.pipe(plumber(plumberOption))
		.pipe(sass().on('error', sass.logError)) // 업데이트된 부분
		.pipe(autoprefixer())
		.pipe(cleanCSS()) // 업데이트된 부분
		.pipe(concat('main.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.js', gulp.series('uglify')); // 업데이트된 부분
	gulp.watch('src/**/*.css', gulp.series('minifycss')); // 업데이트된 부분
	gulp.watch('src/**/*.html', gulp.series('minifyhtml')); // 업데이트된 부분
});



gulp.task('default', function (done) {
	inquirer.prompt([
		{
			type: 'list',
			name: 'task',
			message: '어떤 작업을 수행하시겠습니까?',
			choices: [
				{ name: 'JavaScript 빌드', value: 'uglify' },
				{ name: 'CSS 빌드', value: 'minifycss' },
				{ name: 'HTML 빌드', value: 'minifyhtml' },
				new inquirer.Separator(),
				{ name: '전체 빌드', value: 'build' }
			]
		}
	]).then(function (answers) {
		// runSequence(answers.task, done); // 업데이트된 부분
		gulp.series(answers.task)(done); // 업데이트된 부분
	});
});

gulp.task('build', gulp.series('uglify', 'minifycss', 'minifyhtml')); // 업데이트된 부분
