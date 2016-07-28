require('es6-promise').polyfill();
require('events').EventEmitter.prototype._maxListeners = 100;

var gulp = require('gulp')

var plugins = require('gulp-load-plugins')()
var config = require('./gulp/config')

// Import gulp tasks
var taskBrowserifySrc = require('./gulp/tasks/browserify-src')
var taskBrowserifyVendors = require('./gulp/tasks/browserify-vendors')
var taskClean = require('./gulp/tasks/clean')
var taskCopyFonts = require('./gulp/tasks/copy-fonts')
var taskCopyHtml = require('./gulp/tasks/copy-html')
var taskCopyImages = require('./gulp/tasks/copy-images')
var taskCopyCss = require('./gulp/tasks/copy-css')
var taskCss = require('./gulp/tasks/css')

var wrapTask = function(task, done) {
    return task.bind(this, gulp, plugins, config, done)
}

// Tasks assignation
gulp.task('clean', wrapTask(taskClean))
gulp.task('copy:fonts', wrapTask(taskCopyFonts))
gulp.task('copy:html', wrapTask(taskCopyHtml))
gulp.task('copy:images', wrapTask(taskCopyImages))
gulp.task('copy:css', wrapTask(taskCopyCss))
gulp.task('browserify:src', wrapTask(taskBrowserifySrc))
gulp.task('browserify:vendors', wrapTask(taskBrowserifyVendors))
gulp.task('css', wrapTask(taskCss))

gulp.task('default', [
    'clean',
    'copy:fonts',
    'copy:images',
    'copy:html',
    'copy:css',
    'browserify:vendors',
    'browserify:src',
    'css',
])
