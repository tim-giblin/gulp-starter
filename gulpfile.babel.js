import gulp from 'gulp';
import pump from 'pump';
import sass from 'gulp-sass';
import swig from 'gulp-swig';
import clean from 'gulp-clean';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import webpack from 'gulp-webpack';
import imagemin from 'gulp-imagemin';
import cleanCss from 'gulp-clean-css';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import bundles from './Config/gulp.bundle.js';
import config from './Config/gulp.config.js';

gulp.task('browser-sync', () => {
	browserSync.create();
	browserSync.init(config.browserSync);
});

gulp.task('scripts:main', () => {
	return gulp.src(config.paths.scripts.source)
	.pipe(webpack({
		devtool: 'source-map',
		output: {
			filename: 'app.bundle.min.js'
		},
		module: {
			loaders: [{ 
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}],
		},
		plugins: [
		new UglifyJsPlugin()
		]
	}))
	.pipe(gulp.dest(config.paths.scripts.build));
});

gulp.task('scripts:vendor', () => {
	pump([
		gulp.src(bundles.vendor.scripts),
		concat('vendor.bundle.min.js'),
		uglify(),
		gulp.dest(config.paths.scripts.build)
		]);
});

gulp.task('styles:main', () => {
	return gulp.src(config.paths.styles.source)
	.pipe(sourcemaps.init())
	.pipe(sass(config.styles).on('error', sass.logError))
	.pipe(rename('global.min.css'))
	.pipe(autoprefixer(config.autoprefixer))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.paths.styles.build))
	.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('styles:vendor', () => {
	return gulp.src(bundles.vendor.styles)
	.pipe(concat('vendor.bundle.min.css'))
	.pipe(cleanCss({compatibility: 'ie8'}))
	.pipe(gulp.dest(config.paths.styles.build));
});

gulp.task('markup', () => {
	return gulp.src(config.paths.markup.source)
	.pipe(swig({ defaults: { cache: false } }))
	.pipe(gulp.dest(config.paths.markup.build));
});

gulp.task('images', () => {
	return gulp.src(config.paths.images.source)
	.pipe(imagemin())
	.pipe(gulp.dest(config.paths.images.build));
});

gulp.task('clean:build', () => {
	gulp.src(config.clean.build, { read: false })
	.pipe(clean());
});

gulp.task('clean:bower', () => {
	gulp.src(config.clean.bower, { read: false })
	.pipe(clean());
})

gulp.task('default', ['build', 'browser-sync'], () => {
	gulp.watch(config.paths.scripts.watch, ['scripts:main']).on('change', browserSync.reload);
	gulp.watch(config.paths.styles.watch, ['styles:main']).on('change', browserSync.reload);
	gulp.watch(config.paths.markup.watch, ['markup']).on('change', browserSync.reload);
});

gulp.task('build', ['scripts:main', 'styles:main', 'scripts:vendor', 'styles:vendor', 'images', 'markup']);
