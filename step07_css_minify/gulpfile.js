const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

// CSS 파일을 minify
gulp.task('minifycss', function () {
    return gulp.src('src/css/main.css')
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

// 파일 변경 감지
gulp.task('watch', function () {
    gulp.watch('src/**/*.css', gulp.series('minifycss'));
});

// gulp를 실행하면 default로 minifycss, watch task를 실행
gulp.task('default', gulp.series('minifycss', 'watch'));


//npm init
//npm install gulp-uglify
//npm install gulp-clean-css --save-dev
//npm install gulp-concat --save-dev


//앞서 gulp-uglify 플러그인을 사용해서 JavaScript 파일을 Minify 한 것처럼 CSS 파일도 운영환경을 위해 이렇게 Minify 를 수행해서 배포하게 됩니다. 이런 기능을 제공해주는 대표적인 플러그인은 gulp-clean-css 입니다. gulp-clean-css 플러그인은 단순하게 CSS 파일의 minify뿐 아니라 CSS 파일 내의 @import 도 인식해서 최적화된 형태로 병합해줍니다. gulp-sourcemaps 플러그인과도 함께 사용할 수 있기 때문에 상당히 유용하게 사용할 수 있는 플러그인입니다.












// const gulp = require('gulp');
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const cleanCSS = require('gulp-clean-css');

// // 자바스크립트 파일을 minify
// function js() {
//   return gulp.src('src/**/*.js')
//     .pipe(concat('main.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'));
// }

// // CSS 파일을 minify
// function css() {
//   return gulp.src('src/css/main.css')
//     .pipe(cleanCSS())
//     .pipe(gulp.dest('dist/css'));
// }

// // 파일 변경 감지
// function watch() {
//   gulp.watch('src/**/*.js', js);
//   gulp.watch('src/**/*.css', css);
// }

// // gulp를 실행하면 default 로 js, css task와 watch task를 실행
// exports.default = gulp.series(gulp.parallel(js, css), watch);
