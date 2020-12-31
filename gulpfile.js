const gulp = require('gulp');

//gulp-sass converts sass to css
const gulpSass = require('gulp-sass');

//cssnano compresses it into one line
const cssnano = require('gulp-cssnano');

//gulp-rev renames the file
//so whenever it is sent to the browser .. browser accepts it (after caching the previous one (if done))
const rev = require('gulp-rev');

//gulp contains tasks which need to be created
//one of the tasks is to minimise the css
gulp.task('css', function(){
    console.log('Minifying the CSS.');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass()) //converting
    .pipe(cssnano()) //compressing
    .pipe(gulp.dest('./assets.css'));
});

