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
	uglify: {
		dist: {
			files: {
				'bin/src/bg.min.js': ['src/background/*.js'],
				'bin/src/site.min.js': ['src/popup/*.js']
			}
		}
	},
	manifest_merge: {
		foo: {
			pkg: './',
			src: './src',
			dest: './bin/src'
		}
	},
	"string-replace": {
		index: {
			files: {
				"temp": "./src/popup/index.html"
			},
			options: {
				replacements: [{
					pattern: /site\.js/g,
					replacement: "site.min.js"
				}]
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

	grunt.registerMultiTask('manifest_merge', 'Log stuff.', function() {
		var pkg = this.data.pkg + '/package.json';
		var src = this.data.src + '/manifest.json';
		var dest = this.data.dest + '/manifest.json';

		var pkgContent = grunt.file.readJSON(pkg);
		var srcContent = grunt.file.readJSON(src);

		srcContent.name = pkgContent.name;
		srcContent.version = pkgContent.version;
		srcContent.description = pkgContent.description;
		srcContent.background.scripts = ['bg.min.js'];
		srcContent.page_action.default_popup = 'index.html';

		grunt.file.write(dest, JSON.stringify(srcContent));

	});


	//grunt.registerTask('publish', ['string-replace', 'zip']);
};