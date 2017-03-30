var Marionette = require('backbone.marionette')

var TraitsController = require('../controllers/TraitsController')

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'events/:eid/classes/:cid/traits/:id(/)': 'single'
  },

  controller: new TraitsController()
})
