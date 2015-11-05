'use strict';

var exec = require('./exec');
var args = require('./args');
var config = require('./config');

module.exports = function main(entry, callback) {
  return exec([
    'NODE_ENV=production',
    'NODE_PATH=' + (args.options.browserify_paths || config.browserify_paths),
    'browserify',
    '-e ' + config.javascript_src_path + entry + '.js',
    '-t babelify',
    '-t envify',
    '-o ' + config.javascript_build_path + entry + '.js'
  ].join(' '), callback);
};
