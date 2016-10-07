'use strict';

var project = require('../../project.json'),
flags     = require('minimist')(process.argv.slice(2));

var envOpts = {}; 

if (flags.watch) {
    envOpts.watch = true;
    envOpts.debug = true;
    envOpts.minify = false;
    envOpts.env = 'dev';
}

if (flags.staging) {
    envOpts.watch = false;
    envOpts.debug = false;
    envOpts.minify = true;
    envOpts.env = 'staging';
}

if (flags.live) {
    envOpts.watch = false;
    envOpts.debug = false;
    envOpts.minify = true;
    envOpts.env = 'live';
}

var options = {
    
    cssEntry   : project.foldersName.entry + '/styles/',
    cssDest    : project.foldersName.build + '/styles/',
    jsEntry    : project.foldersName.entry + '/scripts/',
    jsDest     : project.foldersName.build + '/scripts/',
    jsVendorsEntry  : project.foldersName.entry + '/vendors/',
    mainJS     : 'app.js',
    imageEntry : project.foldersName.entry + '/assets/images/',
    imageDest  : project.foldersName.build + '/assets/images/',
    copyBase   : project.foldersName.entry + '/assets/',
    copyDest   : project.foldersName.build + '/assets/',
    jsVendorsDest   : project.foldersName.build + '/vendors/',
    envOpts    : envOpts

}

module.exports = options;