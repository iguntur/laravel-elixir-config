import fs from 'fs';
import test from 'ava';
import yaml from 'yamljs';
import pathExists from 'path-exists';

const fixtures = {
	json: { appPath: "json-appPath", viewPath: "json-viewPath", css: { folder: "json-css-folder" } },
	yaml: { appPath: "yaml-appPath", viewPath: "yaml-viewPath", css: { folder: "yaml-css-folder" } }
};

function requireJson(t) {
	return new Promise(resolve => {
		if (pathExists.sync('elixir.yml')) fs.unlinkSync('elixir.yml');
		require('./').fileName('elixir.json');
		resolve();
	});
}

function requireYaml(t) {
	return new Promise(resolve => {
		if (pathExists.sync('elixir.json')) fs.unlinkSync('elixir.json');
		require('./').fileName('elixir.yml');
		resolve();
	});
}

test.beforeEach(t => {
	fs.writeFileSync('elixir.json', JSON.stringify(fixtures.json, null, '\t'));
	fs.writeFileSync('elixir.yml', yaml.stringify(fixtures.yaml, 4));

	t.context.Elixir = require('laravel-elixir').config;
	t.context.config = {
		json: JSON.parse(fs.readFileSync('elixir.json', 'utf8')),
		yaml: yaml.load('elixir.yml')
	};
});

test.serial('throws', t => {
	t.throws(() => require('./'));
});

test.serial('JSON: overrides', async t => {
	await requireJson(t);

	t.true(t.context.Elixir.appPath === t.context.config.json.appPath);
	t.true(t.context.Elixir.viewPath === t.context.config.json.viewPath);
	t.true(t.context.Elixir.css.folder === t.context.config.json.css.folder);
});

test.serial('YAML: overrides', async t => {
	await requireYaml(t);

	t.true(t.context.Elixir.appPath === t.context.config.yaml.appPath);
	t.true(t.context.Elixir.viewPath === t.context.config.yaml.viewPath);
	t.true(t.context.Elixir.css.folder === t.context.config.yaml.css.folder);
});

test.after('cleanup', t => {
	['elixir.json', 'elixir.yml'].forEach(f => {
		if (pathExists.sync(f)) fs.unlinkSync(f);
	});
});
