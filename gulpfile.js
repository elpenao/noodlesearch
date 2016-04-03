// All used modules.
var gulp = require('gulp');
var livereload = require('gulp-livereload');


// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});