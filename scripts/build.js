'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var build_js = require('./build-js');
var build_css = require('./build-css');
var build_partial = require('./build-partial');
var entryPoint = require('./entry-point');
var global = Function("return this")();
var path = require('path');
global.appRoot = path.resolve(__dirname, '..');

function main() {
  var entries = entryPoint();
  _.map(entries, function (entry) {
    build_js(entry, function () {
      build_css(entry, function () {
        build_partial(entry);
      }.bind(this));
    }.bind(this));
  }.bind(this));
}

main();
