var Marionette = require('backbone.marionette')

var ClassesController = require('../controllers/ClassesController')

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'events/:eid/classes/:id(/)': 'single'
  },

  controller: new ClassesController()
})
