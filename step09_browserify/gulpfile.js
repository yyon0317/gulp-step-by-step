const { src, dest } = require('gulp');
const uglify = require('gulp-uglify-es').default;
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

function bundleJavaScript() {
  return browserify('src/js/main.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest('dist/js/'));
}

exports.default = bundleJavaScript;

//npm init
//npm install gulp-uglify
//npm install gulp-uglify-es --save-dev
//npm install --save-dev browserify
//npm install vinyl-source-stream
//npm install --save-dev vinyl-buffer