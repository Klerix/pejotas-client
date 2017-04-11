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
    'navigate:char': 'navigate',
    'skill:toggle': 'toggleSkill'
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

    if (this.char) {
      this.char.off('change', _updateUrl)
      if (this.char.skills) this.char.skills.off('selection:changed', _updateSkills)
    }

    this.char = new CharModel(data)
    this.char.on('change', _updateUrl.bind(this.char))
    if (this.char.skills) this.char.skills.on('selection:changed', _updateSkills.bind(this.char))

    this.char.fetch().then(function () {
      this.char.markSelectedSkills()
      var view = new CharView({ model: this.char })
      Radio.channel('app').trigger('render:view', view)
      Radio.channel('breadcrumbs').trigger('set', [], 'Editor de Personajes')
    }.bind(this))
  },

  toggleSkill: function (id) {
    if (this.char && this.char.skills) this.char.skills.toggleSkill(id)
  }
})

var _updateUrl = function () {
  Radio.channel('app').trigger('navigate', this.getUrl(), { trigger: false, replace: true })
}

var _updateSkills = function () {
  this.attributes.skillIds = this.skills.getSelected().pluck('id')
  _updateUrl.apply(this)
}

module.exports = CharsController
