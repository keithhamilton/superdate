var gulp = require('gulp');
var babel = require('gulp-babel');
var shell = require('gulp-shell');

gulp.task('clean', shell.task([
  'rm index.js test.js'
]))

gulp.task('build', ['clean'], function () {
    return gulp.src('src/*')
        .pipe(babel())
        .pipe(gulp.dest('.'));
});

gulp.task('test', ['build'], shell.task([
  'node test.js'
]))
