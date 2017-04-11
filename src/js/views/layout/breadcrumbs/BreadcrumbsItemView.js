var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var ClassItemView = Marionette.View.extend({
  template: require('./breadcrumb.hbs'),

  tagName: 'li',

  className: 'breadcrumb-item',

  events: {
    'mouseup': function (e) {
      Radio.channel('app').trigger('link', this.model.get('nav'), e)
    }
  },

  onRender: function () {
    if (this.model.get('active')) {
      this.$el.addClass('active')
    }
  }
})

module.exports = ClassItemView
