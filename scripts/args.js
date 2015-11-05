'use strict';

var argv = require('argv');

argv.option({
	name: 'entry',
	short: 'e',
	type : 'string',
	description :'エントリーポイントを指定します',
	example: "'script --entry=value' or 'script -e value'"
});

argv.option({
	name: 'browserify_paths',
	short: 'b',
	type : 'string',
	description :'Browserifyのパスを指定します',
	example: "'script --browserify_paths=./src/javascripts:./node_modules:./' or 'script -e ./src/javascripts:./node_modules:./'"
});

module.exports = argv.run();
