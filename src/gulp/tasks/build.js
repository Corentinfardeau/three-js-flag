'use strict';

var gulp = require('gulp'),
uglify   = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
sourcemaps  = require('gulp-sourcemaps'),
config   = require('../config');

gulp.task('build', ['clean', 'assets', 'vendors', 'html', 'scripts', 'styles'], function(cb) {

  if (config.envOpts.minify) {

    gulp.src(config.jsDest + '/' + config.mainJS)
      .pipe(uglify({
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true
      }))
      .pipe(gulp.dest(config.jsDest));

      gulp.src(config.cssDest  + 'styles.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
          rebase: false,
          advanced: false,
          aggressiveMerging: false,
          mediaMerging: true, // pack media queries
          processImport: true, // automatically embed @import rules
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.cssDest  + 'styles.css'));

  }

  cb();

});
