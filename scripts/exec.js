'use strict';

var Promise = require('bluebird');
var exec = require('child_process').exec;
var is = require('is_js');

module.exports = function (cmd, callback) {
  return new Promise(function (f, r) {
    console.log('execute: \"' + cmd + '\"');

    var proc = exec(cmd, {maxBuffer: 1024 * 1000}, function (error, stdout, stderr) {
      if (stdout) console.log('stdout: ' + stdout);
      if (stderr) console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
        r(error);
      } else {
        f();
      }
    });

    proc.stdout.on('data', function (data) {
      process.stdout.write(data);
    });

    proc.on('close', function(){
      callback && callback();
    });
  });
};
