/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   29-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 30-06-2017
 */

var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var removeHtmlComments = require('gulp-remove-html-comments');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = {
  materialize: './dev/src/materialize',
  destDir: './dist'
};

gulp.task("material-js", function(){
  return gulp.src(config.materialize + '/js/materialize.min.js')
  .pipe(gulp.dest(config.destDir+ '/js'))
})
gulp.task("material-css", function(){
  return gulp.src(config.materialize + '/css/materialize.min.css')
  .pipe(gulp.dest(config.destDir+ '/css'))
})
gulp.task("material-font", function(){
  return gulp.src(config.materialize + '/fonts/**/*.*')
  .pipe(gulp.dest(config.destDir+ '/fonts'))
})

gulp.task("build-css", function(){
  return gulp.src('./dev/src/css/style.css')
  .pipe(gulp.dest(config.destDir+ '/css'))
  .pipe(reload({stream:true}))
})



// Task to build JS files
gulp.task("build-js", function(){
  // task instruction...
  return browserify("dev/app/app.js",{
     debug: true
   })
   .transform(babelify.configure({
     presets : ["es2015"]
   }))
   .bundle()
   .pipe(source("bundle.js"))
   .pipe(gulp.dest(config.destDir + '/js'))
   .pipe(reload({stream:true}))
});

gulp.task("copy-html", function(){
  return gulp.src(['./dev/www/*.html'])
  .pipe(removeHtmlComments())
  .pipe(gulp.dest(config.destDir))
  .pipe(reload({stream:true}))
});


// gulpfile.js
// Task to run local server
gulp.task("startServer",  function() {
  browserSync.init({
    server: {
        baseDir: config.destDir
    },
    notify: true
  });
});

// Task to watch wich file is changing
// and load the right task
gulp.task('watch', function() {
  // watch js file changes
  gulp.watch('./dev/app/**/*.js', ['build-js']); 
  // watch all html template file changes
  gulp.watch('./dev/www/*.html', ['copy-html']); 
  gulp.watch('./dev/src/css/style.css', ['build-css']); 
});

// 1: Default task. This will be run when no task is passed in arguments to $ gulp
gulp.task("run",[
  'build-js',
  'copy-html',
  'material-js',
  'material-font',
  'material-css',
  'build-css'
]);
gulp.task('default', ['run'], function() {
    gulp.start('startServer', 'watch');
});
