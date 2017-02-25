var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    ts = require('gulp-typescript'),
    webpack = require('gulp-webpack');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
   console.log('Compiling TypeScript');

    var tsResult = tsProject.src({base: './src'}) 
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./build'));
});

gulp.task('webpack', function () {
    gulp.src('./src/client/index.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./public'))
});

gulp.task('default', ['typescript','webpack'], function () {

    gulp.watch('./src/server/**/*.ts', ['typescript']);

    livereload.listen();

    nodemon({
        script: './build/server/index.js',
        ext: 'js',
    }).on('restart', function () {
        setTimeout(function () {
            console.log("reload!");
            livereload.reload();
        }, 500);
    });

});