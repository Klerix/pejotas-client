module.exports = function(gulp, plugins, config) {

    var glob = [
        config.paths.src.css + '/vendor/*.css'
    ]

    if (config.watch) {
        gulp.watch(glob, ['copy:css'])
    }

    return gulp.src(glob)
        .pipe(plugins.plumber())
        .pipe(gulp.dest(config.paths.dist.css))

}
