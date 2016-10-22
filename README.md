# laravel-elixir-config [![Build Status](https://travis-ci.org/iguntur/laravel-elixir-config.svg?branch=master)](https://travis-ci.org/iguntur/laravel-elixir-config) [![npm](https://img.shields.io/npm/v/laravel-elixir-config.svg?style=flat-square)](https://npmjs.com/package/laravel-elixir-config)

> Overrides [laravel-elixir](https://github.com/laravel/elixir) configuration from **`elixir.json`** or **`elixir.yml`**.


## Why?

> Since [laravel-elixir](https://github.com/laravel/elixir) version **^6.0.x**, overrides the configuration from **`elixir.json`** has been removed. See [#648](https://github.com/laravel/elixir/issues/648).

- Set the config in your Gulpfile instead.
- Write the config with `json` or `yaml` format, everything you like.
- Assign an object


## Install

``` bash
npm install --save-dev laravel-elixir-config
```


## Usage

create `elixir.json` file in project path

Example

``` json
{
    "assetsPath": "assets"
}
```


``` js
// Gulpfile.js

const elixir = require('laravel-elixir');

// ...
require('laravel-elixir-config');
```

## Official Documentations

- Documentation for Elixir can be found on the [Laravel website](http://laravel.com/docs/elixir).
- [Laravel elixir](https://github.com/laravel/elixir) source code.


## License

MIT @ [Guntur Poetra](http://guntur.starmediateknik.com)
