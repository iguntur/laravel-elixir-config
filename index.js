'use strict';

var fs = require('fs');
var _ = require('lodash');
var yaml = require('yamljs');
var Elixir = require('laravel-elixir');

var overrides = Object.create(null);
var opts = fs.readdirSync('./').filter(function (fp) {
	return /^(elixir.(json|yml|yaml))$/i.test(fp);
});

if (opts.length > 1) {
	throw new Error('Too much elixir config files. Use `elixir.json` or `elixir.(yml|yaml)`');
}

/**
 * Allow for config overrides, via an elixir.(json|yml|yaml) file.
 *
 * @param {string} file
 */
Elixir.configFile = function (file) {
	if (/\.(json)$/i.test(file)) {
		overrides = JSON.parse(fs.readFileSync(file, 'utf8'));
	}

	if (/\.(yml|yaml)$/i.test(file)) {
		overrides = yaml.load(file);
	}

	_.merge(Elixir.config, overrides);
};

Elixir.configFile(opts.toString());

module.exports.fileName = function (file) {
	file = file || opts.toString();

	Elixir.configFile(file);
};
