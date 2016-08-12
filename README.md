# Laravel Elixir Config

Overrides laravel elixir configuration from `elixir.json`.

This is for laravel elixir version ^6.0.0-9

### Install

``` bash
npm install --save-dev laravel-elixir-config
```

### Usage

create `elixir.json` file in project path

Example

``` json
{
    "assetsPath": "assets"
}
```


``` javascript
// Gulpfile.js

var Elixir = require('laravel-elixir');

require('laravel-elixir-config');

```

### Official Documentation

Documentation for Elixir can be found on the [Laravel website](http://laravel.com/docs/elixir).
Documentation for Elixir repositories can be found on the [Github](https://github.com/laravel/elixir)

### License
MIT License