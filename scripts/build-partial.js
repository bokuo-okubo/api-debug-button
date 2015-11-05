'use strict';

var Promise = require('bluebird');
var config = require('./config');
var fs = require('fs');
var global = Function("return this")();
var path = require('path');

module.exports = function main(entry) {

  // set global template
  require(path.join(
    global.appRoot,
    config.javascript_build_path,
    entry
  ));

  return new Promise(function (f, r) {
    var path = [
      process.env.NODE_ENV === 'production' ? config.html_build_path : config.html_debug_build_path,
      '_',
      entry,
      '.html'
    ].join('');

    console.log('write: ', path);
    fs.writeFile(path, global.template, function (err) {
      if (err) {
        console.log('exec error: ' + err);
        r(err);
      } else {
        f();
      }
    });

  }.bind(this));
};
