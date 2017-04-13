var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var NotFoundView = require('../views/layout/notFound/NotFoundView')
var NoApiView = require('../views/layout/noApi/NoApiView')

module.exports = Marionette.Object.extend({
  channelName: 'errors',

  radioEvents: {
    'show:404': 'e404',
    'show:503': 'e503'
  },

  e404: function () {
    Radio.channel('app').trigger('render:view', new NotFoundView())
    Radio.channel('breadcrumbs').trigger('set', [], 'Error 404')
  },

  e503: function () {
    Radio.channel('app').trigger('render:view', new NoApiView())
    Radio.channel('breadcrumbs').trigger('set', [], 'Error 504')
  }
})
