var gulp = require('gulp');
var connect = require('gulp-connect');
var install = require('gulp-install');
 
gulp.task('connect', function() {
  connect.server();
});

gulp.task('install', function () {
  gulp.src(['./package.json'])
  .pipe(install());
});

gulp.task('default', ['install', 'connect']);
