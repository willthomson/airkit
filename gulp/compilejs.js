var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');


/**
 * Compiles js code using browserify and uglify.
 * @param {Array.<string>} sources List of JS source files.
 * @param {string} outdir Output directory.
 * @param {string} outfile Output file name.
 */
function compilejs(sources, outdir, outfile) {
  var bundler = browserify({
    entries: sources,
    debug: false
  });
  return rebundle_(bundler, outdir, outfile);
}


/**
 * Watches JS code for changes and triggers compilation.
 * @param {Array.<string>} sources List of JS source files.
 * @param {string} outdir Output directory.
 * @param {string} outfile Output file name.
 */
function watchjs(sources, outdir, outfile) {
  var bundler = watchify(browserify({
    entries: sources,
    debug: false,
    // Watchify options:
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  bundler.on('update', function() {
    gutil.log('recompiling js...');
    rebundle(bundler);
    gutil.log('finished recompiling js');
  });
  return rebundle_(bundler, outdir, outfile);
}


function rebundle_(bundler, outdir, outfile) {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'browserify error'))
    .pipe(source(outfile))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(outdir));
}


module.exports = {
  compilejs: compilejs,
  watchjs: watchjs
};
