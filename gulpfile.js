var gulp = require('gulp'),
    connect = require('gulp-connect'),
    install = require('gulp-install'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    livereload = require('gulp-livereload'),
    exec = require('child_process').exec;

gulp.task('server', function (cb) {
  exec('mongod', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  exec('node ./server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', function () {
  // livereload.listen();
  // gulp.watch('./public/css/*.css');
  // gulp.watch('./public/**/*.html');
  // gulp.watch('./public/js/**/*.js', ['browserify']);
});

gulp.task('install', function () {
  gulp.src(['./package.json'])
      .pipe(install());
});

gulp.task('browserify', function() {
  // Grabs the app.js file
    return browserify('./public/js/app.js')
      // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/app/main/'));
});

// gulp.task('default', ['install', 'watch', 'browserify', 'server']);
gulp.task('default', ['install', 'server']);
