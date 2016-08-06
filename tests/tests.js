'use strict';

var fs = require('fs'),
    path = require('path'),
    gutil = require('gulp-util'),
    mocha = require('mocha'),
    assert = require('assert'),
    htmlBower = require('../');

var file = fs.readFileSync(path.join(__dirname, './src/index.html'));

describe('gulp-html-bower', () => {
    var fakeFile;
    
    beforeEach(() => {
        fakeFile = new gutil.File({
            base: 'tests/src',
            cwd: 'tests/',
            path: 'tests/src/index.html',
            contents: new Buffer(file)
        });
    });
    
    it('should find and copy bower instructions using default options', (next) => {
        var stream = htmlBower();
        
        stream.write(fakeFile);
        next();
    });
    
    it('should find and copy bower instructions using user options', (next) => {
        var stream = htmlBower({
            base: '/vendor',
            dest: '/tmp/dest/vendor',
        });
        
        stream.write(fakeFile);
        next();
    });
    
    it('should failed', (next) => {
        var stream = htmlBower({
            base: '/vendor',
            dest: '/root/dest/vendor',
        });
        
        stream.write(fakeFile);
        next();
    });
});
