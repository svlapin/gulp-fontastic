'use strict';

var fs = require('fs');
var request = require('request');
var _ = require('underscore');
var through = require('through2'); 
var mkdirp = require('mkdirp');

var PLUGIN_NAME = 'gulp-fontastic';

// Default options
var options = {
    font_dir: 'public/fonts/',
    font_path: '/fonts/',
    style_path: 'scss/',
    file_name: '_fontastic',
    scss: true
};

module.exports = function(opt) {

    options = _.extend(options, opt);

    function transform(file, encoding, cb) {
        mkdirp(options.font_dir);
        mkdirp(options.style_path);
        request('https://file.myfontastic.com/' + options.key + '/icons.css', function (error, response, body) {

            var content = response.body;
            var results = content.match(/([0-9]+).eot/);
            var hash = results[1];

            var url = 'https://file.myfontastic.com/'+ options.key + '/fonts/' + hash;

            var font_name = hash;
            if (options.font_name) {
                font_name = options.font_name;
            }

            request(url + '.eot').pipe(fs.createWriteStream(options.font_dir + font_name + '.eot'));
            request(url + '.woff').pipe(fs.createWriteStream(options.font_dir + font_name + '.woff'));
            request(url + '.ttf').pipe(fs.createWriteStream(options.font_dir + font_name + '.ttf'));
            request(url + '.svg').pipe(fs.createWriteStream(options.font_dir + font_name + '.svg'));

            var re = new RegExp(url, 'g');
            content = content.replace(re, options.font_path + font_name);

            var extension = "css";
            if (options.scss === true) {
                extension = "scss";
            }

            return fs.writeFile(options.style_path + options.file_name + '.' + extension, content);
        });
        return cb();
    }
    return through.obj(transform);
};
