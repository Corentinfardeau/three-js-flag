'use strict';

var project = require('./project.json');
var path = require('path');
var fs = require('fs');

// Dynamically start all tasks
fs.readdirSync('./' + project.foldersName.entry + '/gulp/tasks/')
    .forEach(function(task) {
        if (path.extname(task) !== '.js') return;
        require('./' + project.foldersName.entry + '/gulp/tasks/' + task);
    });