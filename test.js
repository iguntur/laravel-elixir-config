import fs from 'fs';
import test from 'ava';
import elixir from 'laravel-elixir';

const fixtures = {
	appPath: "foo",
	viewPath: "bar",
	css: {
		folder: "baz"
	}
};

function writeFile(config) {
	return new Promise(resolve => {
		fs.writeFileSync('elixir.json', JSON.stringify(config, null, '\t'));
		resolve();
	});
}

test('overrides', async t => {
	await writeFile(fixtures);

	require('./');
	t.true(elixir.config.appPath === fixtures.appPath);
	t.true(elixir.config.viewPath === fixtures.viewPath);
	t.true(elixir.config.css.folder === fixtures.css.folder);
});
