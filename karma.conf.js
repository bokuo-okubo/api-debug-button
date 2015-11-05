'use strict';

var cfg = require('./scripts/config');

process.env.PHANTOMJS_BIN = require('phantomjs').path;

module.exports = function (config) {
  var preprocessors = {};
  preprocessors[cfg.javascript_src_path + "**/*.js"] = ['browserify'];
  preprocessors[cfg.javascript_spec_path + "**/*.js"] = ['browserify'];

  var conf = {

    files: [
      'node_modules/es6-promise/dist/es6-promise.min.js',//phantomjsにpromiseをpolyfillするために必要
      'node_modules/react-tools/src/test/phantomjs-shims.js',//phantomjsにbindをpolyfillするために必要
      cfg.javascript_spec_path + "**/*.js"
    ],

    frameworks: ['browserify', 'jasmine'],

    preprocessors: preprocessors,

    //タイムアウトエラーが出るのを回避
    captureTimeout            : 60000,
    browserDisconnectTimeout  : 20000,
    browserDisconnectTolerance: 0,
    browserNoActivityTimeout  : 20000,

    browserify: {
      debug      : true,
      "transform": [
        ["babelify", {}]
      ],
      extensions : ['.js', '.jsx'],
      paths      : [cfg.javascript_src_path, cfg.javascript_spec_path, "node_modules"],
      bundleDelay: 1000  // WAR for karma-browserify race condition
    },

    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],

    //reporters: ['spec']
    reporters: ['progress']

  };

  config.set(conf);
};
