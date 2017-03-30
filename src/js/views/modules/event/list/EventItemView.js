var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

module.exports = Marionette.View.extend({
  className: 'col-12 col-sm-6 col-md-4 col-xl-3',

  template: require('./item.hbs'),

  ui: {
    createBtn: '.btn-primary',
    infoBtn: '.btn-secondary'
  },

  events: {
    'click @ui.createBtn': function (e) {
    },

    'click @ui.infoBtn': function (e) {
      e.stopPropagation()
      Radio.channel('app').trigger('navigate', '/events/' + this.model.get('id'))
    }
  }
})
