var Marionette = require('backbone.marionette')

var EmptyView = Marionette.View.extend({
  tagName: 'blockquote',
  className: 'mb-3',

  template: require('./empty.hbs'),

  initialize: function (options) {
    this.templateContext = {
      item: options.item || 'elementos'
    }
  }
})

module.exports = EmptyView
