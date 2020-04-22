const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles', function () {
    return gulp.src('scss/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
                overrideBrowserslist: [
                "last 2 versions"
                ],
                cascade: false
        }))
        .pipe(gulp.dest("css"))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
                overrideBrowserslist: [
                "last 2 versions"
                ],
                cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});


gulp.task('watch', function () {
    gulp.watch('scss/**/*.+(scss|sass)', gulp.parallel('styles'))
    gulp.watch('*.html').on('change', browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'))