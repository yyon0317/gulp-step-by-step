const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifycss = require('gulp-minify-css');
const minifyhtml = require('gulp-minify-html');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const inquirer = require('inquirer');

const errorHandler = function (error) {
  console.error(error.message);
  this.emit('end');
};

const plumberOption = {
  errorHandler: errorHandler
};

gulp.task('minifyhtml', function () {
  return gulp.src('src/**/*.html')
    .pipe(plumber(plumberOption))
    .pipe(minifyhtml())
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
  return gulp.src('src/**/*.css')
    .pipe(plumber(plumberOption))
    .pipe(minifycss())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', gulp.series('uglify'));
  gulp.watch('src/**/*.css', gulp.series('minifycss'));
  gulp.watch('src/**/*.html', gulp.series('minifyhtml'));
});

gulp.task('build', gulp.series('uglify', 'minifycss', 'minifyhtml'));

gulp.task('default', function (done) {
  inquirer
    .prompt([
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
    ])
    .then(function (answers) {
      runSequence(answers.task, done);
    })
    .catch(function (error) {
      console.error(error);
      done();
    });
});
