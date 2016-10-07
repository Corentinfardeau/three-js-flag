'use strict';

var gulp    = require('gulp'),
browserSync = require('browser-sync'),
project     = require('../../../project.json'),
config      = require('../config'),
colors		= require('colors'),
notify      = require('gulp-notify');

var serverConfig = {
	server: "./" + project.foldersName.build,
	port: project.port || 3000,
	browser: ['google chrome'],
	notify: false,
	minify: false,
	ghostMode: false,
}

gulp.task('server', ['build'], function(cb) {

	if(config.envOpts.watch){
		browserSync.init(serverConfig);
		gulp.start('watch');
	}else{
		cb()
	}

	switch(config.envOpts.env){
		case 'dev' :
			console.log('PROJECT BUILT IN DEV ENVIRONEMENT'.green);
		break;
		case 'staging' :
			console.log('PROJECT BUILT IN STAGING ENVIRONEMENT'.green);
			process.exit();
		break;
		case 'live' :
			console.log('PROJECT BUILT IN LIVE ENVIRONEMENT'.green);
			process.exit();
		break;
	}


	
});
