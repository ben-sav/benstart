//Gruntfile

module.exports = function (grunt) {

	var lessMainFile = 'app/css/less/main.less',
		bootstrapMainFile = 'bower_components/bootstrap/less/bootstrap.less',
		jquery = 'bower_components/jquery/dist/jquery.js',
		jsBootstrap = 'bower_components/bootstrap/js/*.js',
		jsFiles = 'app/js/dev/*.js',
		html5 = 'bower_components/html5-boilerplate/dist/';


	//Initializing the configuration object

	grunt.initConfig({

		copy: {
			start: {
				files: [
					{
						expand: true,
						cwd: html5,
						src: ['**'],
						dest: 'app/',
						filter: 'isFile'
					}
				]
			}
		},

		less: {
			prod: {
				options: {
					compress: true
				},
				files: {
					'app/css/main.css': lessMainFile,
					'app/css/bootstrap.css': bootstrapMainFile
				}
			},
			dev: {
				options: {
					compress: false
				},
				files: {
					'app/css/main.css': lessMainFile
				}
			},
			bootstrap: {
				options: {
					compress: false  // for dev purpose
				},
				files: {
					'app/css/bootstrap.css': bootstrapMainFile
				}
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			all: {
				src: [
					jquery,
					jsBootstrap,
					jsFiles
				],
				dest: 'app/js/main.js'
			}
		},

		uglify: {
			options: {
				mangle: true  // false if you want the names of your functions and variables unchanged
			},
			prod: {
				files: {
					'app/js/main.js': 'app/js/main.js'
				}
			}
		},

		watch: {
			js: {
				options: {
					livereload: true
				},
				files: [
					'app/js/dev/**'
				],
				tasks: [
					'concat:all'
				]
			},
			less: {
				options: {
					livereload: true
				},
				files: [
					'app/css/less/*.less'
				],
				tasks: [
					'less:dev'
				]
			},
			lessBootstrap: {
				options: {
					livereload: true
				},
				files: [
					'bower_components/bootstrap/less/*.less'
				],
				tasks: [
					'less:bootstrap'
				]
			}
		}
	});

// Plugin loading
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

// Task definition
	grunt.registerTask('start', [
		'copy:start',
		'less:dev',
		'less:bootstrap',
		'concat:all',
		'watch'
	]);
	grunt.registerTask('default', [
		'less:dev',
		'less:bootstrap',
		'concat:all',
		'watch'
	]);
	grunt.registerTask('prod', [
		'less:prod',
		'concat:all',
		'uglify:prod',
	]);

};