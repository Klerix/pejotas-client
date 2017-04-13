var Marionette = require('backbone.marionette')

var EventsController = require('../controllers/EventsController')

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    '(/)': 'list',
    'events(/)': 'list',
    'events/:id(/)': 'single'
  },

  controller: new EventsController()
})
