const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifycss = require('gulp-minify-css');
const minifyhtml = require('gulp-minify-html');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const plumber = require('gulp-plumber');

const errorHandler = function (error) {
  console.error(error.message);
  this.emit('end');
};

const plumberOption = {
  errorHandler: errorHandler
};

// Minify HTML files
gulp.task('minifyhtml', function () {
  return gulp.src('src/**/*.html')
    .pipe(plumber(plumberOption))
    .pipe(newer('dist'))
    .pipe(minifyhtml())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }));
});

// Browserify JavaScript files and minify them
gulp.task('uglify', function () {
  return browserify({ entries: ['src/js/main.js'], debug: true })
    .bundle()
    .on('error', errorHandler)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({ loadMaps: true, debug: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }));
});

// Minify CSS files
gulp.task('minifycss', function () {
  return gulp.src('src/**/*.css')
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({ loadMaps: true, debug: true }))
    .pipe(cached('css'))
    .pipe(minifycss())
    .pipe(remember('css'))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

// Watch for changes in files and run corresponding tasks
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', gulp.series('uglify'));
  gulp.watch('src/**/*.css', gulp.series('minifycss'));
  gulp.watch('src/**/*.html', gulp.series('minifyhtml'));
});


// Run a local server with browserSync and run 'uglify', 'minifycss', and 'minifyhtml' tasks before starting the server
gulp.task('server', gulp.series('uglify', 'minifycss', 'minifyhtml', function () {
	return browserSync.init({
	  server: {
		baseDir: './dist'
	  }
	});
  }));
  

// Run 'server' and 'watch' tasks by default
gulp.task('default', gulp.series('server', 'watch'));



