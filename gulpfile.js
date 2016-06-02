const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const jasmine = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');
//Run server side test
gulp.task('test:server', ['pre-test'], function(){
   return gulp.src([
       'api/**/*.spec.js',
       'components/**/*.spec.js'
   ])
   .pipe(jasmine({includeStackTrace:true}))
   .on('error', function(error) {
       console.log('Server side tests failed');
       console.log(error);
       process.exit(1);
   })
   .pipe(istanbul.writeReports({
     dir: 'reports/coverage/server'
   }))
   .pipe(istanbul.enforceThresholds({
       thresholds: {
         globals: {
          statements: 100,
          branches: 100,
          lines: 100,
          functions: 100
         }
       }
   }));
});

gulp.task('pre-test', function(){
    return gulp.src([
        'api/**/*.js',
        'components/**/*.js'
    ])
    .pipe(istanbul({
        includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});
