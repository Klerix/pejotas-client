var dependencies = {
    "js/jquery.min.js": "node_modules/jquery/dist/jquery.min.js",

    "css/font-awesome.min.css": "node_modules/font-awesome/css/font-awesome.min.css",
    "fonts/fontawesome-webfont.eot": "node_modules/font-awesome/fonts/fontawesome-webfont.eot",
    "fonts/fontawesome-webfont.svg": "node_modules/font-awesome/fonts/fontawesome-webfont.svg",
    "fonts/fontawesome-webfont.ttf": "node_modules/font-awesome/fonts/fontawesome-webfont.ttf",
    "fonts/fontawesome-webfont.woff": "node_modules/font-awesome/fonts/fontawesome-webfont.woff",
    "fonts/fontawesome-webfont.woff2": "node_modules/font-awesome/fonts/fontawesome-webfont.woff2",

    "js/navigo.min.js": "node_modules/navigo/lib/navigo.min.js",
    "js/navigo.min.js.map": "node_modules/navigo/lib/navigo.min.js.map",
};

var source = ["src/js/lib.js", "src/js/core/**/*.js", "src/js/**/*.js"];
var sourceCss = ["src/css/**/*.css"];




var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');

var package = require('./package.json');
package.name = "pejotas";


gulp.task('default', ['watch']);
gulp.task('build', build);
gulp.task('watch', function() {
    gulp.watch([
        source,
        sourceCss
    ]).on('change', function(file) {
        build();
    });
});

function build() {
    buildDependencies();
    buildCss();
    buildSource(source, package.name);
}

function buildDependencies() {
    Log.building("Dependencies");

    for (var k in dependencies) {
        gulp.src(dependencies[k])
            .pipe(concat(k))
            .pipe(gulp.dest("web/static/"))
    }
}

function buildCss() {
    Log.building(package.name + ".css");

    gulp.src(sourceCss)
        .pipe(header(printHeader() + "\n"))
        .pipe(concat(package.name + ".css"))
        .pipe(gulp.dest("web/static/css/"))

    .pipe(cleanCSS())
        .pipe(header(printHeader()))
        .pipe(rename(package.name + ".min.css"))
        .pipe(gulp.dest("web/static/css/"));
}

function buildSource(src, target) {
    Log.building(target + ".js");

    gulp.src(src)
        .pipe(header(printHeader() + "\n"))
        .pipe(replace('[VER]', package.version))
        .pipe(concat(target + ".js"))
        .pipe(gulp.dest("web/static/js/"))

    .pipe(uglify()).on("error", Log.uglifyError)
        .pipe(header(printHeader()))
        .pipe(rename(target + ".min.js"))
        .pipe(gulp.dest("web/static/js/"));
}

function printHeader() {
    return "/**\n" +
        " * " + package.name + " " + package.version + "\n" +
        " * @license ARV Klerix @ 2016 \n" +
        " * @author: " + package.author + "\n" +
        " */\n";
}

var Log = {
    uglifyError: function(err) {
        process.stdout.write(Log.timeStamp() +
            "\x1b[31mError\x1b[0m on '\x1b[36muglify\x1b[0m' at file " +
            "\x1b[35m" + err.message.replace(": ", "\n\x1b[0m") +
            ": \x1b[36m" + err.lineNumber +
            "\n\n\x1b[0m");
    },
    warn: function(msg) {
        process.stdout.write(Log.timeStamp() +
            "\x1b[33mWarn\x1b[0m '\x1b[36m" + msg + "\x1b[0m'.\n");
    },
    building: function(msg) {
        process.stdout.write(Log.timeStamp() +
            "Building\x1b[0m '\x1b[36m" + msg + "\x1b[0m'.\n");
    },
    msg: function(msg) {
        process.stdout.write(Log.timeStamp() +
            "\x1b[32mMessage\x1b[0m '\x1b[36m" + msg + "\x1b[0m'.\n");
    },
    timeStamp: function() {
        var now = new Date();
        return "[\x1b[30m" + ("0" + now.getHours()).slice(-2) +
            ":" + ("0" + now.getMinutes()).slice(-2) +
            ":" + ("0" + now.getSeconds()).slice(-2) +
            "\x1b[0m] ";
    }
}
