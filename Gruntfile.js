var _options = {
	packageFile: './bin/app.zip',
	applicationPath: './bin/mt-downloader.app/Contents/Resources'

};


var _config = {

	zip: {
		createPackage: {
			cwd: 'bin/src/',
			src: ['./bin/src/manifest.json',
				'./bin/src/background/bg.min.js',
				'./bin/src/snapshots/*',
				'./bin/src/popup/index.html',
				'./bin/src/popup/site.min.js',
				'./bin/src/popup/site.css'],
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
				'./bin/src/background/bg.min.js': [
					"src/background/UtilKeys.js",
					"src/background/HostsDb.js",
					"src/background/headersManipulator.js",
					"src/background/SuperCacheLiveTabs.js",
					"src/background/ApplicationIcon.js",
					"src/background/MainBackground.js"],
				'./bin/src/popup/site.min.js': ['src/popup/*.js']
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
				"./bin/": "./src/popup/index.html"
			},
			options: {
				replacements: [{
					pattern: /site\.js/g,
					replacement: "site.min.js"
				}]
			}
		}
	},
	copy: {
		css_main: {
			files: [{
				expand: true,
				src: ['./src/popup/*.css'],
				dest: './bin/src/popup/',
				flatten: true
			}]
		},
		images: {
			files: [{
				expand: true,
				src: ['./src/snapshots/*'],
				dest: './bin'
			}]
		}
	}
};

module.exports = function(grunt) {

	grunt.file.delete('./bin');

	grunt.initConfig(_config);
	_config.pkg = grunt.file.readJSON('package.json');


	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-contrib-copy');
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
		srcContent.background.scripts = ['background/bg.min.js'];

		grunt.file.write(dest, JSON.stringify(srcContent));

	});


	grunt.registerTask('pack', ['uglify', 'manifest_merge', 'string-replace', 'copy', 'zip']);


	grunt.registerTask('pack-release', ['uglify', 'manifest_merge', 'string-replace', 'copy', 'zip', 'release']);
};