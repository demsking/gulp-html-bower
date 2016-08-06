/**
 * gulp-html-bower
 * Copyright(c) 2016 Sébastien Demanou
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var es = require('event-stream')
  , gutil = require('gulp-util')
  , mkdirp = require("mkdirp")
  , path = require('path')
  , fs = require('fs');

const PLUGIN_NAME = 'gulp-html-bower';
const REGEX = /(href|src)=("|').*(bower_components\/(.+\.[\w\d]+))("|')/gi;

module.exports = (options) => {
    options = options || {};
    options.dest = options.dest || process.cwd();
    options.base = options.base || '/';
    
    return es.map((file, done) => {
        file.contents = new Buffer(file.contents.toString().replace(REGEX, (match, prefix, quote, pathname, filename) => {
            mkdirp(path.dirname(path.join(options.dest, filename)), (err) => {
                if (err) {
                    return done(new gutil.PluginError(PLUGIN_NAME, err));
                }
                
                try {
                    fs.createReadStream(path.join(pathname))
                        .pipe(fs.createWriteStream(path.join(options.dest, filename)));
                } catch(e) {
                    return done(new gutil.PluginError(PLUGIN_NAME, err));
                }
            });
            
            return prefix + '=' + quote + path.join(options.base, filename) + quote;
        }));
        
        done(null, file);
    });
};
