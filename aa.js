var gulp = require('gulp'),

	less = require('gulp-less').

	cssmin = require('gulp-minify-css'),

	autoprefixer = require('gulp-autoprefixer'),

	rev = require('gulp-rev'),

	rename = require('gulp-rename'),

	imagemin = require('gulp-imagemin'),

	useref = require('gulp-useref'),

	gulpif = require('gulp-if'),

	uglify = require('gulp-uglify'),

	reCollerctor = require('gulp-rev-collector');




//处理css
gulp.task('css', function () {

	return gulp.src('./public/less/main.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(autoprefixer())
		.pipe(rev())
		.pipe(gulp.dest('./release/public/css'))
		.pipe(rev.manifest())
		.pipe(rename('css-manifest.json'))
		.pipe(gulp.dest('./release/rev'));

});

//处理图片
gulp.task('image',function(){
	return gulp.src(['./public/images/**/*','./uploads/*'],{base:'./'})
		.pipe(imagemin())
		.pipe(rev())
		.pipe(gulp.dest('./release'))
		.pipe(rev.manifest())
		.pipe(rename('image-manifest.json'))
		.pipe(gulp.dest('./release/rev'));
})

//处理js
gulp.task('useref',function(){
	return gulp.src('./index.html')
		.pipe(useref())
		.pipe(gulpif('*.js',uglify()))
		.pipe(gulpif('*.js',rev()))
		.pipe(gulp.dest('./release'))
		.pipe(rev.manifest())
		.pipe(rename('js-manifest.json'))
		.pipe(gulp.dest('./release/rev'));
})

//其它
gulp.task('other',function(){
	return gulp.src(['./api/*','./public/fonts/*','./public/libs/*','./views/*','./favicon.ico'],{base:'./'})
		.pipe(gulp.dest('./release'));
})

//替换
gulp.task('rev',['css','image','useref'],function(){
	gulp.src(['./release/rev/*.json','./release/index.html'])
		.pipe(reCollerctor())
		.pipe(gulp.dest('./release'));
})

gulp.task('default',['rev','other']);