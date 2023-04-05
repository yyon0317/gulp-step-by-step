//npm install gulp-uglify
//앞서 gulp-uglify 플러그인을 사용해서 JavaScript 파일을 Minify할 수 있게 되었지만, 일반적으로 운영환경에서는 이렇게 Minify된 파일들을 병합해서 하나의 파일로 만들어서 배포하게 됩니다. 이런 기능을 제공해주는 대표적인 플러그인은 gulp-concat 입니다. gulp-sourcemaps 플러그인과도 함께 사용할 수 있기 때문에 상당히 유용하게 사용할 수 있는 플러그인입니다.
//파일병합

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// 자바스크립트 파일을 minify
function minifyJs() {
return gulp
.src('src/*.js') // src 폴더 아래의 모든 js 파일을
.pipe(concat('main.js')) // main.js 라는 파일명로 모두 병합한 뒤에,
.pipe(uglify()) // minify 해서
.pipe(gulp.dest('dist')); // dist 폴더에 저장
}

// 파일 변경 감지
function watchFiles() {
gulp.watch('src/*.js', minifyJs);
}

// gulp를 실행하면 default 로 uglify, watch task를 실행
exports.default = gulp.series(minifyJs, watchFiles);

