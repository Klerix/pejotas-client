var browserify = require('browserify')
var hbsfy = require('hbsfy')
var watchify = require('watchify')
var rename = require('gulp-rename')
var aliasify = require('aliasify');

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')

module.exports = function(gulp, plugins, config) {

    var entryFile = 'vendor.js'
    var entryPath = config.paths.src.root + '/' + entryFile

    function createBundler() {
        var bundler = browserify({
            entries: entryPath,
            debug: config.development,
            transform: ['aliasify']
        })

        if (config.watch) {
            return watchify(bundler)
        }

        return bundler
    }

    function errorHandler(err) {
        log('error', err, 'red')
        this.emit('end')
    }

    function log(title, msg, color) {
        color = color || 'green'
        plugins.util.log(title, plugins.util.colors[color](msg))
    }

    function doneHandler() {
        log('browserify', 'Vendors Done!', 'green')
    }

    function rebundle() {
        log('browserify', 'Browserifying Vendors...', 'yellow')

        return bundler
            .bundle()
            .on('error', errorHandler)
            .pipe(source(entryFile))
            .pipe(buffer())
            .pipe(plugins.if(config.development, plugins.sourcemaps.init({ loadMaps: true })))
            .pipe(plugins.uglify())
            .pipe(rename("vendor-libs.min.js"))
            .pipe(plugins.if(config.development, plugins.sourcemaps.write('./')))
            .pipe(gulp.dest(config.paths.dist.js))
            .on('end', doneHandler)
    }

    var bundler = createBundler()

    if (config.watch) {
        bundler.on('update', rebundle)
    }

    bundler.on('log', plugins.util.log);

    return rebundle()

}
