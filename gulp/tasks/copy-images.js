module.exports = function (gulp, plugins, config) {

  var glob = [
    config.paths.src.images + '/**/*'
  ]

  if (config.watch) {
    gulp.watch(glob, [ 'copy:images' ])
  }

  return gulp.src(glob)
    .pipe(plugins.plumber())
    .pipe(gulp.dest(config.paths.dist.images))

}
