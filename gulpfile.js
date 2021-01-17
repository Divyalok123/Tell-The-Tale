const gulp = require('gulp');

//gulp-sass converts sass to css
const sass = require('gulp-sass');

//cssnano compresses it into one line
const cssnano = require('gulp-cssnano');

//gulp-rev renames the file
//so whenever it is sent to the browser .. browser accepts it (after caching the previous one (if done))
const rev = require('gulp-rev');

//to minify javascript files
const uglify = require('gulp-uglify-es').default;

//image compressor
const imagemin = require('gulp-imagemin');

//to delete files and directories
const del = require('del');

//gulp contains tasks which need to be created
//one of the tasks is to minimise the css
gulp.task('css', function(done){
    console.log('Minifying the CSS.');
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass()) //converting
    .pipe(cssnano()) //compressing
    .pipe(gulp.dest('./assets/css')); 

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true 
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//minifying js
gulp.task('js', function(done){
    console.log("Minifying JS.");
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true //if already exits just merge
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//minifying images
gulp.task('images', function(done){
    console.log('Minifying images.');
    gulp.src('./assets/**/*.+(png|jpeg|jpg|gif|svg|ico)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//emptying the public/assets directory
//whenever we are building the project we need to clear the previous build
//and build it from scratch

//for this we use 'del'
gulp.task('clean:assets', function(done){
    console.log('Emptying the assets.');
    del.sync('./public/assets');
    done();
});

//a task to run all the above tasks together (rather than independently)
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done) {
    console.log("Built all tasks");
    done();
});