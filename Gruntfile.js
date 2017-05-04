'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        template: {
            compile: {
                options: {
                    data: {
                        v: 1
                    }
                },
                files: [
                    { src: ['**/*.html', '!template/**/*.html'], dest: 'dist', expand: true, cwd: 'src' }
                ]
            }
        }
    });

    grunt.registerMultiTask('template', 'template inheritance and sub template', function() {
        var path = require('path');
        var template = require('art-template');

        var options = this.options({
            //模板根目录
            root: '/',
            //默认后缀名
            extname: '.html',
            data: {}
        });
        template.defaults.root = options.root;
        template.defaults.extname = options.extname;

        this.files.forEach(function(f) {
            var fileList = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }

            }).map(function(filepath) {
                var _html = template(path.resolve(__dirname, filepath), options.data);
                grunt.file.write(f.dest, _html);
            });
        });

    });
    grunt.registerTask('default', ['template']);
};