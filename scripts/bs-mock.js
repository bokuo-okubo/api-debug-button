'use strict';

var config = require('./config');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var _ = require('lodash');

var blacklist = [
  '.',
  '..',
  '.keep',
  '.DS_Store'
];

var mapping = {};

function substitute(method, real, file) {
  var ext = path.extname(real);

  var noFormat = path.join(path.dirname(real), path.basename(real, ext)).toString();
  var payload = fs.readFileSync(file).toString();

  if (!mapping[method]) mapping[method] = {};
  mapping[method][real] = mapping[method][noFormat] = payload;
}

function placeit(method, file) {
  var regExp = new RegExp(method + '/');
  if (regExp.test(file)) {
    var real = file.replace(regExp, '').replace(config.mock_dir, '');
    substitute(method, real, file)
  }
}

function gen(p) {
  _.each(fs.readdirSync(p), function (fileOrDir) {
    if (_.contains(blacklist, fileOrDir)) return;

    var f = path.join(p, fileOrDir).toString();

    if (fs.statSync(f).isDirectory()) {
      return gen(f);
    } else {
      placeit('GET', f);
      placeit('POST', f);
      placeit('PUT', f);
      placeit('DELETE', f);
    }
  });
}

gen(config.mock_dir);

console.log('API MOCK MAPPING');
_.each(mapping, function (route, method) {
  _.each(_.keys(route), function (key) {
    console.log(method, ':', key);
  });
});

module.exports = mapping;