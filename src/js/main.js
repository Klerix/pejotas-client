var package = require('../../package.json');
var Router = require('./router');

// Create namespace
window.$pjs = window.$pjs || {

    VERSION: package.version,

    server: 'http://localhost:8080/',

    router: new Router(),

};

// Extend $pjs
_.extend($pjs, require('./controllers/MainController'));
require('./views/HbsHelpers');


// extend jquery
$.fn.extend({
    pejotas: function() {
        return $pjs.init(this);
    }
})

module.exports = window.$pjs;
