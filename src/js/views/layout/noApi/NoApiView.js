var Marionette = require('backbone.marionette')

var NoApiView = Marionette.View.extend({
  template: require('./noapi.hbs')
})

module.exports = NoApiView
