var gulp        = require('gulp');
var browserSync =   require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into css & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


//Move the javascript files into /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

//Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: "localhost/fc/index.php",
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("components/php/*.php").on('change', browserSync.reload);
    //gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);