var PersonajesController = require('./controllers/CharsController'),
    EventosController = require('./controllers/EventsController'),
    HabilidadesController = require('./controllers/SkillsController'),
    RasgosController = require('./controllers/TraitsController');

var Router = Backbone.Router.extend({

    routes: {
        '': EventosController.list,
        'eventos(/)': EventosController.list,
        'habilidades(/)': HabilidadesController.list,
        'habilidades/:id': HabilidadesController.show,
        'rasgos/:id': RasgosController.show,
    }

})

module.exports = Router
