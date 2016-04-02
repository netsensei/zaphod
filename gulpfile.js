var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prefixer = require("gulp-autoprefixer");

gulp.task('reload', ['sass'], function () {
    // Empty
});

gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
               require('node-bourbon').includePaths,
               require('node-neat').includePaths[1]
            ],
            noCache: true,
            outputStyle: "compressed",
            lineNumbers: false,
            loadPath: './public/css/*',
            sourceMap: true
        }))
        .on("error", function(err) {
            gutil.log(err.message);
            return this.emit('end');
        })
        .pipe(prefixer({
            browsers: ['last 3 version', '> 2%']
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch(['scss/**/*.scss'], ['reload']);
});

gulp.task('default', ['watch', 'browser-sync']);
