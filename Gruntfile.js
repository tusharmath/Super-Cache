var _options = {
	packageFile: './bin/app.zip',
	applicationPath: './bin/mt-downloader.app/Contents/Resources'

};


var _config = {

	zip: {
		createPackage: {
			src: ['./src'],
			dest: _options.packageFile
		}
	},
	'string-replace': {
		dist: {
			files: [{
				'./src/manifest.json': './src/manifest.template.json'
			}],

			options: {
				replacements: [{
					pattern: /\!\{version\}/g,
					replacement: '<%= pkg.version %>'
				},{
					pattern: /\!\{name\}/g,
					replacement: '<%= pkg.name %>'
				},{
					pattern: /\!\{description\}/g,
					replacement: '<%= pkg.description %>'
				}]
			}
		}
	}
};

module.exports = function(grunt) {
	grunt.initConfig(_config);
	_config.pkg = grunt.file.readJSON('package.json');
	grunt.loadNpmTasks('grunt-zip');

	//grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.registerTask('default', ['zip']);
};