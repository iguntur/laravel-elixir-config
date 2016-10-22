import fs from 'fs';
import del from 'del';
import test from 'ava';
import yaml from 'yamljs';

const fixtures = {
	json: {viewPath: 'json-viewPath', css: {folder: 'json-css-folder'}},
	yaml: {viewPath: 'yaml-viewPath', css: {folder: 'yaml-css-folder'}}
};

function generateFiles(t, files) {
	return new Promise(resolve => {
		Object.keys(require.cache).forEach(key => delete require.cache[key]);

		[].concat(files).forEach(file => {
			if (/\.(json)$/i.test(file)) {
				fs.writeFileSync(file, JSON.stringify(t.context.from.json, null, '\t'));
			}

			if (/\.(yml|yaml)$/i.test(file)) {
				fs.writeFileSync(file, yaml.stringify(t.context.from.yaml, 2));
			}
		});

		resolve();
	});
}

function compare(t) {
	const n = t.context.newConfig;
	const o = t.context.oldConfig;

	t.notDeepEqual(n, o);
	t.not(n.viewPath, o.viewPath);
	t.not(n.css.folder, o.css.folder);
}

test.beforeEach(async t => {
	t.context.from = fixtures;
	t.context.newConfig = null;
	t.context.file = ext => 'elixir.' + ext;
	await del([t.context.file('*')]);
	t.context.oldConfig = require('laravel-elixir').config;
});

test.afterEach('cleanup', async t => await del([t.context.file('*')]));

test.serial('Cancel overrides - return throws an error', async t => {
	await generateFiles(t, [t.context.file('json'), t.context.file('yml')]);
	t.throws(() => {
		require('laravel-elixir');
		require('./');
	});
});

test.serial('Overrides from `elixir.json`', async t => {
	await generateFiles(t, t.context.file('json'));
	t.context.newConfig = require('laravel-elixir').config;
	require('./'); /* running merge from 'elixir.json' */

	compare(t);
	t.true(t.context.newConfig.viewPath === t.context.from.json.viewPath);
	t.true(t.context.newConfig.css.folder === t.context.from.json.css.folder);
});

test.serial('Overrides from `elixir.yml`', async t => {
	await generateFiles(t, t.context.file('yml'));
	t.context.newConfig = require('laravel-elixir').config;
	require('./'); /* running merge from 'elixir.yml' */

	compare(t);
	t.true(t.context.newConfig.viewPath === t.context.from.yaml.viewPath);
	t.true(t.context.newConfig.css.folder === t.context.from.yaml.css.folder);
});
