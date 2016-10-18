# laravel-elixir-config

> Overrides laravel elixir configuration from `elixir.json`.


This is for laravel elixir version ^6.0.x

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
- Documentation for Elixir repositories can be found on the [Github](https://github.com/laravel/elixir)


## License

MIT @ [Guntur](guntur.starmediateknik.com)
