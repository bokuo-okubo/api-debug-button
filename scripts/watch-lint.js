'use strict';

var exec = require('./exec');
var config = require('./config');

module.exports = function main() {
  return exec([
    'esw',
    '-w',
    '-f simple-detail',
    config.javascript_src_path
  ].join(' '));
};
