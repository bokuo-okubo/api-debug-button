'use strict';

var exec = require('./exec');
var config = require('./config');

module.exports = function main() {
  return exec([
    'browser-sync',
    'start',
    '--config ' + config.bs_config_path
  ].join(' '));
};
