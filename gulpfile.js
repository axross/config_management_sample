var gulp       = require('gulp');
var rename     = require('gulp-rename');
var browserify = require('gulp-browserify');

var configGenerater = require('./config').generateBundle;

gulp.task('config-generate', function() {
  configGenerater(process.env.NODE_ENV);
});

gulp.task('build', ['config-generate'], function() {
  gulp.src('./public/app.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public'));
});
