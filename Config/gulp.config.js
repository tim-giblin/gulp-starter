module.exports = {
	paths: {
		scripts: {
			watch: './Assets/app/scripts/**/*.js',
			source: './Assets/app/scripts/main.class.js',
			build: './Assets/dist/scripts',
		},
		styles: {
			watch: './Assets/app/styles/**/*.scss',
			source: './Assets/app/styles/**/*.scss',
			build: './Assets/dist/styles',
		},
		markup: {
			watch: './Assets/app/markup/**/*.html',
			source: './Assets/app/markup/*.html',
			build: './Assets/dist',
		},
		images: {
			watch: './Assets/app/images/*.{png,gif,jpg,jpeg,svg}',
			source: './Assets/app/images/*.{png,gif,jpg,jpeg,svg}',
			build: './Assets/dist/images',
		}
	},
	browserSync: {
		server: { 
			baseDir: "./Assets/dist/"
		}
	},
	autoprefixer: {
		browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
		cascade: false
	},
	styles: {
		outputStyle: 'compressed'
	},
	clean: {
		build: './Assets/dist',
		bower: './Assets/app/bower',
	}
}
