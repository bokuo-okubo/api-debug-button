'use strict';

var exec = require('./exec');
var config = require('./config');

module.exports = function main(entry, callback) {
  return exec([
    'NODE_ENV=production',
    'stylus',
    config.stylesheet_src_path + entry + '.styl',
    '--compress',
    '--use autoprefixer-stylus',
    '--out ' + config.stylesheet_build_path
  ].join(' '), callback);
};
