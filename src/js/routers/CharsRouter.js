var Marionette = require('backbone.marionette')

var CharsController = require('../controllers/CharsController')

module.exports = Marionette.AppRouter.extend({

  appRoutes: {
    'char/:event(/)(:class)(/)(:skills)(/)(:name)(/)': 'compose'
  },

  controller: new CharsController()
})
