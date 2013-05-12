var _options = {
	packageFile: './bin/app.zip',
	applicationPath: './bin/mt-downloader.app/Contents/Resources'

};


var _config = {

	zip: {
		createPackage: {
			src: ['./src/*/*','./src/*','!./src/manifest.template.json'],
			dest: _options.packageFile
		}
	},
	release: {
		options: {
			npm: false
		}
	},
	'string-replace': {
		manifest: {
			files: [{
				'./src/manifest.json': './src/manifest.template.json'
			}],

			options: {
				replacements: [{
					pattern: /\!\{version\}/g,
					replacement: '<%= pkg.version %>'
				}, {
					pattern: /\!\{name\}/g,
					replacement: '<%= pkg.name %>'
				}, {
					pattern: /\!\{description\}/g,
					replacement: '<%= pkg.description %>'
				}]
			}
		}
	},
	uglify: {
		dist: {
			files: {
				'bin/src/bg.min.js': ['src/background/*.js'],
				'bin/src/site.min.js': ['src/popup/*.js']
			}
		}
	}
};

module.exports = function(grunt) {
	grunt.initConfig(_config);
	_config.pkg = grunt.file.readJSON('package.json');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-release');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.registerTask('publish', ['release', 'string-replace', 'zip']);
};