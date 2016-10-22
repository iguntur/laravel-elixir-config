'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var yaml = require('yamljs');
var Elixir = require('laravel-elixir');

var overrides = Object.create(null);
var opts = fs.readdirSync('./').filter(function (fp) {
	return /^(elixir.(json|yml|yaml))$/i.test(fp);
});

var fp = path.join(__dirname, opts.toString());

if (opts.length > 1) {
	throw new Error('Too much config files in project root directory. Use `elixir.json` or `elixir.(yml|yaml)`.');
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

Elixir.configFile(fp);
