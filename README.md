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

#### Update the `gulpfile.js`.
``` js
const elixir = require('laravel-elixir');

// ...
require('laravel-elixir-config');
```

#### Create `elixir.json` or `elixir.yml` file in the project root directory.

Examples

* `elixir.json`
``` json
{
    "assetsPath": "assets",
    "css": {
        "outputFolder": "assets/css",
        "sass": {
            "pluginOptions": {
                "includePaths": [
                    "node_modules",
                    "bower_components"
                ]
            }
        }
    },
    "js": {
        "outputFolder": "assets/js"
    }
}
```

* `elixir.yml`
``` yml
assetsPath: assets
css:
    outputFolder: assets/css
    sass:
        pluginOptions:
            includePaths:
                - node_modules
                - bower_components
js:
    outputFolder: assets/js
```


## API

If you want something different or separate your config file, you can use this API.

### elixir.configFile(path)

> This will be replace the `elixir.(json|yml)` if it exists from your custom **path**.

#### path

- Type: `string`
- Extension: `.json`, `.yml`, `.yaml`

Example
> ``` js
> const elixir = require('laravel-elixir');
>
> // ...
> require('laravel-elixir-config');
>
> elixir.configFile('./customFile.json');
> ```


## Tips

#### 😄 Make happy the `gulpfile.js`.

``` js
const elixir = require('laravel-elixir');

require('laravel-elixir-config');

elixir((mix) => {
    // copy fonts
    mix.copy(elixir.config.fonts.sourceFolder, elixir.config.fonts.outputFolder);

    // copy images
    mix.copy(elixir.config.images.sourceFolder, elixir.config.images.outputFolder);
});
```

* `elixir.yml`
``` yml
fonts:
    sourceFolder:
        - node_modules/bootstrap-sass/assets/fonts/bootstrap
        - node_modules/font-awesome/fonts
    outputFolder: public/assets/fonts
images:
    sourceFolder: resources/assets/img
    outputFolder: public/assets/img
```

#### YAML

Indent style must be `space`. See the spec [YAML version 1.2](http://yaml.org/spec/1.2/2009-07-21/spec.html#id2576668)


## Related

- [yamljs](https://github.com/jeremyfa/yaml.js) - Standalone JavaScript YAML 1.2 Parser & Encoder.
- [laravel-blade-jade](https://github.com/iguntur/laravel-blade-jade) - Create laravel blade views using [jade](https://jade-lang.com)


## Official Documentations

- Documentation for Elixir can be found on the [Laravel website](http://laravel.com/docs/elixir).
- [Laravel elixir](https://github.com/laravel/elixir) source code.


## License

MIT @ [Guntur Poetra](http://guntur.starmediateknik.com)
