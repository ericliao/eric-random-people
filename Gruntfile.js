module.exports = function (grunt) {
    'use strict';

    //
    // Load all Grunt tasks
    // @see {@link https://github.com/sindresorhus/load-grunt-tasks|load-grunt-tasks}
    //
    require('load-grunt-tasks')(grunt);
    //
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * A Grunt task that copies bower components from the bower_components folder to the targetDir.
         * Use exportsOverride in bower.json to specify what files to copy over if the default
         * is not sufficent
         * @example grunt bower
         * @see {@link https://github.com/yatskevich/grunt-bower-task|grunt-bower-task}
         */
        bower: {
            install: {
                options: {
                    targetDir: 'vendor',
                    cleanTargetDir: true
                }
            }
        },
        /**
         * A Grunt task that compiles JavaScript files using Browserify.
         * @example grunt browserify
         * @example grunt browserify:app
         * @see {@link https://github.com/jmreidy/grunt-browserify|grunt-browserify}
         * @see {@link http://browserify.org|browserify}
         */
        browserify: {
            options: {
                watch: true,
                browserifyOptions: {
                    insertGlobals: true,
                    debug: true
                }
            },
            app: {
                src: 'src/app.js',
                dest: 'dist/app-min.js'
            }
        },
        /**
         * Clean directories
         * @see {@link https://github.com/gruntjs/grunt-contrib-clean|grunt-contrib-clean}
         * @example grunt clean
         */
        clean: ['vendor', 'dist'],
        /**
         * Copies files and directories to /vendor.
         * @see {@link https://github.com/gruntjs/grunt-contrib-copy|grunt-contrib-copy}
         * @example copy:bower
         */
        copy: {
            bower: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.*'],
                        cwd: 'vendor',
                        dest: 'dist',
                        filter: 'isFile'
                    }
                ]
            }
        },
        /**
         * Precompile handlebar templates
         * @see {@link https://github.com/gruntjs/grunt-contrib-handlebars|grunt-contrib-handlebars}
         * @example grunt handlebars
         */
        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function (path) {
                        return path.replace(/^src\/(?:templates|views)\/(.*)\.handlebars$/, '$1');
                    }
                },
                files: {
                    'dist/handlebar-templates.js': 'src/templates/*.handlebars'
                }
            }
        },
        /**
         * Configure jshint
         * @see {@link https://github.com/gruntjs/grunt-contrib-jshint|grunt-contrib-jshint}
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ]
        },
        /**
         * Watch files and call tasks when they change
         * @see {@link https://github.com/gruntjs/grunt-contrib-watch|grunt-contrib-watch}
         */
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['common']
            },
            handlebars: {
                files: ['src/templates/*.handlebars'],
                tasks: ['handlebars']
            }
        },
        /**
         * Minify JS. Also removes console.*
         * @see {@link https://github.com/gruntjs/grunt-contrib-uglify|grunt-contrib-uglify}
         */
        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: true
                },
            },
            js: { // uglify all top level js files
                expand: true,
                cwd: 'dist',
                src: '*.js',
                dest: 'dist'
            }
        },
        /**
         * Start connect server at http://localhost:9000/.
         * @see {@link https://github.com/gruntjs/grunt-contrib-connect|grunt-contrib-connect}
         * @example grunt connect
         */
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000
                }
            }
        },
    });

    grunt.registerTask('common', '', function () {
        grunt.task.run([
            'clean',
            'bower',
            'copy:bower',
            'handlebars',
            'browserify:app',
            'jshint'
        ]);
    });
    grunt.registerTask('dev', '', function () {
        grunt.config.set('env', 'dev');
        grunt.task.run([
            'common',
            'connect:server',
            'watch'
        ]);
    });
    grunt.registerTask('deploy', '', function () {
        grunt.config.set('env', 'deploy');
        grunt.task.run([
            'common',
            'uglify:js'
        ]);
    });
};