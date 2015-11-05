'use strict';

var args = require('./args');
var entries = require('./config').entries;
var _ = require('lodash');

module.exports = function () {
  if (!!args.options.entry) {
    if (!_.contains(entries, args.options.entry)) throw new Error('Invalid EntryPoint');
    return [args.options.entry];
  } else {
    return entries;
  }
};
