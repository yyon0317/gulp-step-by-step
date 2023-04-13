const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifycss = require('gulp-clean-css');
const minifyhtml = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

// 자바스크립트 파일을 minify
gulp.task('uglify', function () {
    return gulp.src('src/**/*.js') //src 폴더 아래의 모든 js 파일을
        .pipe(concat('main.js')) //병합하고
        .pipe(uglify()) //minify 해서
        .pipe(gulp.dest('dist/js')) //dist 폴더에 저장
        .pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
});

gulp.task('minifycss', function () {
    return gulp.src('src/**/*.css')
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));
});


gulp.task('minifyhtml', function () {
    return gulp.src('src/**/*.html')
        .pipe(minifyhtml({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream:true}));
});

//dist 폴더를 기준으로 웹서버 실행
gulp.task('server', gulp.series('uglify', 'minifycss', 'minifyhtml', function() {
    return browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
}));

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', gulp.series('uglify'));
    gulp.watch('src/**/*.css', gulp.series('minifycss'));
    gulp.watch('src/**/*.html', gulp.series('minifyhtml'));
});

gulp.task('default', gulp.parallel('server', 'watch'));
