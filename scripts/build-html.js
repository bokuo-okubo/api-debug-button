'use strict';

var Promise = require('bluebird');
var ejs = require('ejs');
var fs = require('fs');
var config = require('./config');

module.exports = function main(entry) {
  return new Promise(function (f, r) {
    fs.readFile([config.html_src_path, entry, '.ejs'].join(''), 'utf8', function (err, text) {
      var path = [
        process.env.NODE_ENV === 'production' ? config.html_build_path : config.html_debug_build_path,
        entry,
        '.html'
      ].join('');

      console.log('write: ', path);
      fs.writeFile(path, ejs.render(text, {entry: entry}, {}), function (err) {
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
