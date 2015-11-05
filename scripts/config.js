'use strict';

var config = {
  javascript_src_path        : 'src/javascripts/',
  javascript_debug_build_path: 'dist/javascripts/',
  javascript_build_path      : 'dist/javascripts/',
  javascript_spec_path       : 'src/spec/',
  stylesheet_src_path        : 'src/stylesheets/',
  stylesheet_debug_build_path: 'dist/stylesheets/',
  stylesheet_build_path      : 'dist/stylesheets/',
  html_src_path              : 'src/',
  html_build_path            : 'dist/',
  html_debug_build_path      : 'dist/',
  debug_path                 : 'dist/',
  debug_dir                  : '',
  karma_conf_path            : 'karma.conf.js',
  bs_config_path             : 'scripts/bs-config',
  mock_dir                   : 'mock',

  entries: [
    'index'
  ]
};

config.browserify_paths = [
  config.javascript_src_path,
  './node_modules',
  './'
].join(':');

module.exports = config;
