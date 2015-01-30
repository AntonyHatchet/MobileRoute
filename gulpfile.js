var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

gulp.task('style', function () {
    gulp.src('assets/stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});

gulp.task('jade', function() {
    gulp.src('assets/template/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/'))
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('assets/stylus/style.styl', ['style']);
    gulp.watch('assets/template/index.jade', ['jade']);
});