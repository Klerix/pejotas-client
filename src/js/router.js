var EventsController = require('./controllers/EventsController'),
    SkillsController = require('./controllers/SkillsController'),
    TraitsController = require('./controllers/TraitsController'),
    CharsController = require('./controllers/CharsController');

var Router = Backbone.Router.extend({
    routes: {
        '': EventsController.list,
        'eventos(/)': EventsController.list,
        'habs(/)': SkillsController.list,
        'habs/:id(/)': SkillsController.show,
        'rasgos(/)': TraitsController.list,
        'rasgos/:id(/)': TraitsController.show,
        'pj/:code(/)': CharsController.compose,
    },


});

module.exports = Router;
