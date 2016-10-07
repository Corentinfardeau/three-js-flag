'use strict';

var rm = require('rimraf'),
project = require('../../../project.json');

require('gulp').task('clean', function(cb) {
  rm.sync(project.foldersName.build);
  cb();
});