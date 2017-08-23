/**
 * jQuery classList extension
 * Author & copyright: Michał Gołębiowski-Owczarek <m.goleb@gmail.com>
 *
 * Source: https://github.com/mgol/jquery.classList
 * Released under the MIT license (see the LICENSE.txt file)
 */

'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        eslint: {
            all: {
                src: [
                    '*.js',
                    'src/*.js',
                ],
            },
        },

        copy: {
            all: {
                files: {
                    'dist/jquery.class_list.js': 'src/jquery.class_list.js',
                },
            },
        },

        uglify: {
            all: {
                options: {
                    banner: '/*! jQuery classList extension; license: see LICENSE.txt */',
                    sourceMap: true,
                },
                files: {
                    'dist/jquery.class_list.min.js': 'dist/jquery.class_list.js',
                },
            },
        },
    });

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', [
        'eslint',
    ]);

    grunt.registerTask('test', ['lint']);

    grunt.registerTask('build', [
        'copy',
        'uglify',
    ]);

    grunt.registerTask('default', [
        'test',
        'build',
    ]);
};
