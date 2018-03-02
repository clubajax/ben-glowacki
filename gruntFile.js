'use strict';

const path = require('path');

module.exports = function (grunt) {
    
	const nm = path.resolve(__dirname, 'node_modules'),
		sourceMaps = true,
        watchPort = 35755;

    grunt.initConfig({

		less: {
			dev: {
				options: {
					paths: ['./less']
				},
				files: {
					'./css/main.css': './less/main.less'
				}
			}
		},
        
        watch: {
			less: {
				//files: ['./css/main.css'],
				files: ['./less/**/*.less'],
				tasks: ['less'],
				options: {
					// keep from refreshing the page
					// the page does not care if a less file has changed
					livereload: false
				}
			},
			// css module is needed for css reload
			// watch the main file. When it changes it will notify the page
			// the livereload.js file will check if this is CSS - and if so, reload
			// the stylesheet, and not the whole page
			css: {
				files: './css/main.css'
			},
			html: {
				files: ['./*.html'],
				tasks: ['dev-log']
			},
            // scripts: {
            //     files: ['tests/src/*.js', 'src/*.js'],
            //     tasks: ['build-dev']
            // },
            options: {
                livereload: watchPort
            }
        },

        'http-server': {
            main: {
                // where to serve from (root is least confusing)
                root: '.',
                // port (if you run several projects at once these should all be different)
                port: '8300',
                // host (0.0.0.0 is most versatile: it gives localhost, and it works over an Intranet)
                host: '0.0.0.0',
                cache: -1,
                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: false
                // route requests to another server:
                //proxy: dev.machine:80
            }
        },

        concurrent: {
            target: {
                tasks: ['watch', 'http-server'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // watch build task
    grunt.registerTask('build-dev', function (which) {
		grunt.task.run('less');

    });

    // The general task: builds, serves and watches
    grunt.registerTask('dev', function (which) {
        grunt.task.run('build-dev');
        grunt.task.run('concurrent:target');
    });

    // alias for server
    grunt.registerTask('serve', function (which) {
        grunt.task.run('http-server');
    });

	grunt.registerTask('dev-log', function (which) {
		console.log('watch triggered');
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
};