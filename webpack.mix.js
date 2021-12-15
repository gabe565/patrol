let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('dist')
    .copy('static', 'dist')
    .autoload({
        jquery: ['$', 'jQuery', 'window.jQuery'],
        'popper.js/dist/umd/popper.js': ['Popper']
    })
    .js('src/js/app.js', 'js')
    .vue()
    .sass('src/sass/app.scss', 'css')
    .sourceMaps()
    .webpackConfig({devtool: 'source-map'});
