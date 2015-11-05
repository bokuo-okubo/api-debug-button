'use strict';

var Promise = require('bluebird');
var ejs = require('ejs');
var fs = require('fs');
var config = require('./config');
var global = Function("return this")();
var assign = require('object-assign');
var path = require('path');

module.exports = function main(entry) {
  global.template = global.template || '';

  // set global template
  require(path.join(
    global.appRoot,
    config.javascript_build_path,
    entry
  ));

  return new Promise(function (f, r) {
    fs.readFile([config.html_src_path, entry, '.ejs'].join(''), 'utf8', function (err, text) {
      var path = [
        process.env.NODE_ENV === 'production' ? config.html_build_path : config.html_debug_build_path,
        entry,
        '.html'
      ].join('');

      console.log('write: ', path);
      fs.writeFile(path, ejs.render(text, assign({}, global, {entry: entry}), {}), function (err) {
        if (err) {
          console.log('exec error: ' + err);
          r(err);
        } else {
          f();
        }
      });
    });
  }.bind(this));
};
