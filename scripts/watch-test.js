'use strict';

var exec = require('./exec');
var config = require('./config');

module.exports = function main() {
  return exec([
    'karma',
    'start',
    config.karma_conf_path
  ].join(' '));
};