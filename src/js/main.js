require('./vendor');
require('./jquery');

var Router = require('./router');
var ApplicationRouter = new Router();

Backbone.history.start({
    pushState: true,
    root: '/eventos'
});
