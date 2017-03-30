var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var ClassItemView = Marionette.View.extend({
  template: require('./item.hbs'),

  className: 'col-12 col-sm-6 col-md-4 col-xl-3',

  ui: {
    createBtn: '.btn-primary',
    infoBtn: '.btn-secondary'
  },

  events: {
    'click @ui.createBtn': function (e) {

    },

    'click @ui.infoBtn': function (e) {
      e.stopPropagation()
      Radio.channel('app').trigger(
        'navigate',
        '/events/' + this.options.eventId + '/' + this.model.endpoint + '/' + this.model.get('id')
      )
    }
  }
})

module.exports = ClassItemView
