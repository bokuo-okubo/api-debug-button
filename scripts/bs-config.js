'use strict';

var mock = require('./bs-mock');
var config = require('./config');

module.exports = {
  "server"    : {
    baseDir  : config.debug_path,
    directory: true
  },
  "files"     : config.debug_path,
  "startPath" : config.debug_dir,
  "middleware": function (req, res, next) {
    if ((mock[req.method] || {})[req.url]) {
      console.log(['[API Mock]', req.method, req.url].join(':'));
      res.setHeader("Content-Type", "application/json");
      res.end(mock[req.method][req.url]);
    }
    next();
  }
};
