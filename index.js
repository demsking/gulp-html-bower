/**
 * gulp-html-bower
 * Copyright(c) 2016 Sébastien Demanou
 * MIT Licensed
 */

'use strict';

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
const REGEX = /(href|src)=("|').*(bower_components\/([a-z0-9\.+@~$!;:\/{}()\[\]|=&*£%§-]+\.[\w\d]+))("|')/gi;

module.exports = (options) => {
    options = options || {};
    
    options.prefix = options.prefix || '/';
    options.basedir = options.basedir || path.dirname(file.path);
    options.basedir = path.join(options.basedir, options.prefix);
    
    return es.map((file, done) => {
        file.contents = new Buffer(file.contents.toString().replace(REGEX, (match, prefix, quote, pathname, filename) => {
            mkdirp(path.dirname(path.join(options.basedir, filename)), (err) => {
                if (err) {
                    return done(new gutil.PluginError(PLUGIN_NAME, err));
                }
                
                try {
                    fs.createReadStream(path.join(pathname))
                        .pipe(fs.createWriteStream(path.join(options.basedir, filename)));
                } catch(e) {
                    return done(new gutil.PluginError(PLUGIN_NAME, err));
                }
            });
            
            return prefix + '=' + quote + path.join(options.prefix, filename) + quote;
        }));
        
        done(null, file);
    });
};
