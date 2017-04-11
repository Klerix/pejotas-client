var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

module.exports = Marionette.View.extend({
  className: 'col-12 col-sm-6 col-md-4 col-xl-3',

  template: require('./item.hbs'),

  ui: {
    banner: '.card-img-top',
    createBtn: '.btn-primary',
    infoBtn: '.btn-secondary'
  },

  events: {
    'mouseup @ui.createBtn': 'onCreateChar',
    'mouseup @ui.infoBtn': 'onInfoClick',
    'mouseup @ui.banner': 'onInfoClick'
  },

  onCreateChar: function (e) {
    Radio.channel('char').trigger('link:char', {
      eventId: this.model.get('id')
    }, e)
  },

  onInfoClick: function (e) {
    Radio.channel('app').trigger('link', '/events/' + this.model.get('id'), e)
  }
})
