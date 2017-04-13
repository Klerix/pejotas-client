var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

module.exports = Marionette.View.extend({
  template: require('./notfound.hbs'),

  events: {
    'click .btn': function () {
      Radio.channel('app').trigger('navigate', '/')
    }
  }
})
