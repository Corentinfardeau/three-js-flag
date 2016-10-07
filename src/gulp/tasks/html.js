'use strict';

var gulp    = require('gulp'),
browserSync = require('browser-sync'),
template    = require('gulp-template'),
project     = require('../../../project.json'),
config      = require('../config');

var paths = project.env[config.envOpts.env];

gulp.task('html', function(){

  gulp.src(project.foldersName.entry + '/**/*.html')
  	.pipe(template(paths))
	.pipe(gulp.dest('./' + project.foldersName.build + '/'))
	.pipe(browserSync.reload({stream:true}));
});
