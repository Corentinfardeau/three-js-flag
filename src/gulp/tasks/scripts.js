'use strict';

var gulp    = require('gulp'),
buffer      = require('vinyl-buffer'),
uglify      = require('gulp-uglify'),
watchify    = require('watchify'),
source      = require('vinyl-source-stream'),
sourcemaps  = require('gulp-sourcemaps'),
assign      = require('lodash.assign'),
browserify  = require('browserify'),
rename      = require('gulp-rename'),
browserSync = require('browser-sync'),
babel       = require('babelify'),
config      = require('../config.js'),
onError     = require('../utils/on-error');

var customOpts = {
  entries: [config.jsEntry + '/' + config.mainJS],
  debug: config.envOpts.debug
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform("babelify", {presets: ["es2015"]}));

gulp.task('scripts', bundle);
b.on('update', bundle);

function bundle() {
  return b.bundle()
    .on('error', onError)
    .pipe(source(config.mainJS))
    .pipe(buffer())
    .pipe(gulp.dest(config.jsDest))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.jsDest))
    .pipe(browserSync.reload({stream:true}))
    
}
