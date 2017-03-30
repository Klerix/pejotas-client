var Marionette = require('backbone.marionette')

var EmptyView = Marionette.View.extend({
  tagName: 'blockquote',

  template: require('./empty.hbs'),

  initialize: function (options) {
    this.templateContext = {
      item: options.item || 'elementos'
    }
  }
})

module.exports = EmptyView
