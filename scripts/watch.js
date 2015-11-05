'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var watch_js = require('./watch-js');
var watch_css = require('./watch-css');
var watch_lint = require('./watch-lint');
var watch_test = require('./watch-test');
var browser = require('./browser-sync');
var entryPoint = require('./entry-point');
var html = require('./build-html');
var path = require('path');
global.appRoot = path.resolve(__dirname, '..');

function main() {
  var entries = entryPoint();
  Promise.all(
    _.map(entries, function (entry) {
      watch_js(entry);
      watch_css(entry);
      watch_lint(entry);
      watch_test(entry);
    }.bind(this))
  )
    .then(function () {
      return Promise.all(
        _.map(entries, function(entry){
          return html(entry);
        })
      );
    })
    .then(function () {
      browser();
    }
  );
}

main();
