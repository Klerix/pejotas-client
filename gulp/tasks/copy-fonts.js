module.exports = function(gulp, plugins, config) {

    var glob = [
        config.paths.src.fonts + '/**/*'
    ]

    if (config.watch) {
        gulp.watch(glob, ['copy:fonts'])
    }

    return gulp.src(glob)
        .pipe(plugins.plumber())
        .pipe(gulp.dest(config.paths.dist.fonts))

}
