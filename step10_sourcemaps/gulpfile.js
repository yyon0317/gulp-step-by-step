const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const chokidar = require('chokidar');

//dist 폴더를 기준으로 웹서버 실행
function server() {
  return browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

//HTML 파일을 minify
function minifyhtml() {
  return gulp.src('src/index.html') //src 폴더 아래의 모든 html 파일을
    .pipe(htmlmin({collapseWhitespace: true})) //minify 해서
    .pipe(gulp.dest('dist')) //dist 폴더에 저장
    .pipe(browserSync.reload({stream: true})); //browserSync 로 브라우저에 반영
}

//자바스크립트 파일을 browserify로 번들링
function uglifyjs() {
  return browserify({entries: ['src/js/main.js'], debug: true})
    .bundle() //browserify로 번들링
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

//CSS 파일을 minify
function minifycss() {
  return gulp.src('src/css/*.css') //src 폴더 아래의 모든 css 파일을
    .pipe(sourcemaps.init({loadMaps: true, debug: true})) //소스맵 생성 준비
    .pipe(concat('main.css')) //병합하고
    .pipe(cleanCSS()) //minify 해서
    .pipe(sourcemaps.write('./')) //생성된 소스맵을 스트림에 추가
    .pipe(gulp.dest('dist/css')) //dist 폴더에 저장
    .pipe(browserSync.reload({stream: true})); //browserSync 로 브라우저에 반영
}

//파일 변경 감지
function watch() {
  gulp.watch('src/js/*.js', uglifyjs);
  gulp.watch('src/css/*.css', minifycss);
  gulp.watch('src/*.html', minifyhtml);
}

//gulp를 실행하면 default 로 minifycss task를 실행
exports.default = gulp.series(gulp.parallel(server, watch));

