var _ = require('lodash')
var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var Base64 = require('../helpers/Base64')
var CharView = require('../views/modules/char/detail/CharView')
var CharModel = require('../models/CharModel')

var skillsConcat = '+'

var CharsController = Marionette.Object.extend({
  channelName: 'char',

  radioRequests: {
    'encode': 'encode',
    'decode': 'decode'
  },

  radioEvents: {
    'link:char': 'link',
    'navigate:char': 'navigate'
  },

  encode: function (char) {
    var o = _.extend({
      eventId: 0,
      classId: 0,
      skillIds: [],
      name: 'Nuevo'
    }, char)

    var text = Base64.fromInt(o.eventId) +
      '/' + Base64.fromInt(o.classId) +
      '/' + _.join(_.map(o.skillIds, Base64.fromInt), skillsConcat) +
      '/' + o.name

    return text
  },

  decode: function (char) {
    var o = _.extend({
      eventId: '0',
      classId: '0',
      skillIds: '',
      name: 'Nuevo'
    }, char)

    return {
      eventId: Base64.toInt(o.eventId),
      classId: Base64.toInt(o.classId),
      skillIds: _.map(_.without(_.split(o.skillIds, skillsConcat), ''), Base64.toInt),
      name: o.name
    }
  },

  link: function (char, e, options) {
    var nav = this.encode(char)
    Radio.channel('app').trigger('link', '/char/' + nav, e, options)
  },

  navigate: function (char, options) {
    var nav = this.encode(char)
    Radio.channel('app').trigger('navigate', '/char/' + nav, options)
  },

  compose: function (eid, cid, sids, name) {
    var data = this.decode({
      eventId: eid || '0',
      classId: cid || '0',
      skillIds: sids || '',
      name: name || 'Nuevo'
    })

    var char = new CharModel(data)
    char.fetch().then(function () {
      var view = new CharView({ model: char })
      Radio.channel('app').trigger('render:view', view)
      Radio.channel('breadcrumbs').trigger('set', [], 'Editor de Personajes')
    })
  }
})

module.exports = CharsController
