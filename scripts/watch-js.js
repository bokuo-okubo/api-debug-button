'use strict';

var exec = require('./exec');
var args = require('./args');
var config = require('./config');

module.exports = function main(entry) {
  return exec([
    'NODE_PATH=' + (args.options.browserify_paths || config.browserify_paths),
    'watchify',
    '-e ' + config.javascript_src_path + entry + '.js',
    '-t babelify',
    '-o ' + config.javascript_debug_build_path + entry + '.js',
    '-d',
    '-v'
  ].join(' '));
};
