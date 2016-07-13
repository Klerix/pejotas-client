var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var concat = require('gulp-concat')

module.exports = function(gulp, plugins, config) {

    var glob = config.paths.src.css + '/styles/*.css';

    var postCssProcessors = [
        autoprefixer({ browsers: ['> 0.1%', 'not IE <= 8'] }),
        cssnano({
            discardComments: {
                removeAll: true
            }
        })
    ]

    if (config.watch) {
        gulp.watch(glob, ['css'])
    }

    function errorHandler(err) {
        plugins.util.log(err)
        this.emit('end')
    }

    return gulp.src(glob)
        .pipe(plugins.plumber({ errorHandler: errorHandler }))
        .pipe(plugins.if(config.development, plugins.sourcemaps.init()))
        .pipe(concat('pejotas.min.css'))
        .pipe(plugins.postcss(postCssProcessors))
        .pipe(plugins.if(config.development, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(config.paths.dist.css))

}
