var gulp = require('gulp');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
var cssbeautify = require('gulp-cssbeautify');
var autoprefixer = require('gulp-autoprefixer');
var minifier = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var htmlBeautify = require('gulp-html-beautify');

var pathDev = 'app_dev/';
var pathProd = 'app_prod/';

/*----------------------------------------*\
|   	          	All Task                 |
\*----------------------------------------*/

/*===--Bootstrap Customizer (sass fo css)--===*/
gulp.task('Bootstrap', function(){
	return gulp.src('librairies/bootstrap-4.3.1/scss/bootstrap.scss')
	.pipe(sass())
	.pipe(gulp.dest('librairies/bootstrap-4.3.1/dist/css/'));
});
/*===-- Bootstrap Minifier&&Rename --===*/
gulp.task('BootstrapMinifier', function(){
	return gulp.src('librairies/bootstrap-4.3.1/dist/css/bootstrap.css')
	.pipe(minifier({
		restructure: false,
		sourceMap: false,
		debug: false
	}))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('librairies/bootstrap-4.3.1/dist/css/'));
});



/*===--Pug--===*/
gulp.task('pug', function buildHML(){
	return gulp.src(pathDev+'home.pug')
	.pipe(pug())
	.pipe(htmlBeautify())
	.pipe(gulp.dest(pathProd));

});


/*===-- Sass --===*/
gulp.task('sass', function(){
	return gulp.src(pathDev+'styles/sass/style.scss')
	.pipe(sass())
	.pipe(csscomb())
	.pipe(cssbeautify())
	.pipe(autoprefixer({
		browsers: ['last 4 versions'],
		cascade: false
	}))/*	*/
	.pipe(gulp.dest(pathDev+'styles/css/'));
});
/*===-- Css Minifier&&Rename --===*/
gulp.task('minifier', function(){
	return gulp.src(pathDev+'styles/css/style.css')
	.pipe(minifier())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest(pathProd+'css/'));
});


/*===--Imagemin--===*/
gulp.task('imagemin', function(){
	return gulp.src(pathDev+'images/*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
			]
		})
		]))
	.pipe(gulp.dest(pathProd+'images/'));
});



/*===--Watch --===*/
gulp.task('watch', function(){
	gulp.watch(pathDev+'home.pug', gulp.series('pug'));

	gulp.watch('librairies/bootstrap-4.3.1/scss/bootstrap.scss', gulp.series('Bootstrap'));
	gulp.watch('librairies/bootstrap-4.3.1/dist/css/bootstrap.css', gulp.series('BootstrapMinifier'));

	gulp.watch(pathDev+'styles/sass/style.scss', gulp.series('sass'));
	gulp.watch(pathDev+'styles/css/style.css', gulp.series('minifier'));
	gulp.watch(pathDev+'images/*', gulp.series('imagemin'));
});


/*===--Task default--===*/
gulp.task('default', gulp.parallel('watch'));