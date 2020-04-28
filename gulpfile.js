const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src('scss/**/*.+(scss|sass)')
        /*.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
                overrideBrowserslist: [
                "last 2 versions"
                ],
                cascade: false
        }))
        .pipe(gulp.dest("css"))*/

        //for draft
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

         //for docs
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});


gulp.task('watch', function () {
    gulp.watch('scss/**/*.+(scss|sass|css)', gulp.parallel('styles'))
    gulp.watch('js/*.js').on('change', browserSync.reload)
    gulp.watch('*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function(){
    return gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('docs/'));
});

gulp.task('scripts', function(){
    return gulp.src('js/**/*.js')
        .pipe(gulp.dest('docs/js'));
});

gulp.task('fonts', function(){
    return gulp.src('fonts/**/*')
        .pipe(gulp.dest('docs/fonts'));
});

gulp.task('icons', function(){
    return gulp.src('icons/**/*')
        .pipe(gulp.dest('docs/icons'));
});

gulp.task('mailer', function(){
    return gulp.src('mailer/**/*')
        .pipe(gulp.dest('docs/mailer'));
});

gulp.task('images', function(){
    return gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'));