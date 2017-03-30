var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var ClassItemView = Marionette.View.extend({
  template: require('./breadcrumb.hbs'),

  tagName: 'li',

  events: {
    'click': function (e) {
      e.stopPropagation()
      Radio.channel('app').trigger('navigate', this.model.get('nav'))
    }
  },

  initialize: function (options) {
    this.className = 'breadcrumb-item'
    if (options.model.get('active')) {
      this.className += ' active'
    }
  }
})

module.exports = ClassItemView
