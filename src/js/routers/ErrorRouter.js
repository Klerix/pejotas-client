var Backbone = require('backbone')
var Marionette = require('backbone.marionette')

var ErrorController = require('../controllers/ErrorController')

module.exports = Marionette.AppRouter.extend({
  controller: new ErrorController(),
  initialize: function () {
    Backbone.history.on('routeNotFound', this.controller.e404.bind(this))
  }
})
