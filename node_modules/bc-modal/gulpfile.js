var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('bundle', function () {
  gulp
    .src('./src/modal.js')
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(gulp.dest('./dist/js/'));

  gulp.src('./src/scss/*.scss').pipe(gulp.dest('./dist/scss/'));
});
