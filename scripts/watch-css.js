'use strict';

var exec = require('./exec');
var config = require('./config');

module.exports = function main(entry) {
  return exec([
    'stylus ' + config.stylesheet_src_path + entry + '.styl',
    '--use autoprefixer-stylus',
    '--watch',
    '--sourcemap-inline',
    '--out ' + config.stylesheet_debug_build_path
  ].join(' '));
};
