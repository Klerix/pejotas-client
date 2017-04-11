var $ = require('jquery')
var _ = require('lodash')
var Backbone = require('backbone')
var Radio = require('backbone.radio')

var TraitsCollection = require('../collections/TraitsCollection')
var SkillsCollection = require('../collections/SkillsCollection')
var ClassesCollection = require('../collections/ClassesCollection')

var CharModel = Backbone.Model.extend({
  initialize: function (options) {
    // models & cols
    this.availableEvents = Radio.channel('events').request('get:collection')
    this._onEventChanged()
    this._onClassChanged()

    // Model changes
    this.on('change', this._updateUrl.bind(this))
    this.on('change:eventId', this._onEventChanged.bind(this))
    this.on('change:classId', this._onClassChanged.bind(this))
    this.on('change:skillIds', this._onSkillsChanged.bind(this))

    // Radio listeners
    var charCh = Radio.channel('char')
    charCh.on('skill:toggle', this.toggleSkill.bind(this))
  },

  fetch: function () {
    var fetch = []
    var opt = { reset: true }
    if (!this.availableEvents.models.length) fetch.push(this.availableEvents.fetch(opt))
    if (this.event && this.event.get('id')) {
      if (!this.event.get('name')) fetch.push(this.event.fetch(opt))
      if (!this.availableClasses.models.length) fetch.push(this.availableClasses.fetch(opt))

      if (this.class && this.class.get('id')) {
        if (!this.class.get('name')) fetch.push(this.class.fetch(opt))
        if (!this.traits.models.length) fetch.push(this.traits.fetch(opt))
        if (!this.skills.models.length) {
          fetch.push(this.skills.fetch(_.extend({
            success: this._onSkillsChanged.bind(this)
          }, opt)))
        }
      }
    }

    return $.when.apply(this, fetch)
  },

  getUrl: function () {
    return '/char/' + Radio.channel('char').request('encode', this.attributes)
  },

  _updateSkills: function () {
    this.attributes.skillIds = this.skills.getSelected().pluck('id')
    this._updateUrl()
  },

  _updateUrl: function () {
    Radio.channel('app').trigger('navigate', this.getUrl(), { trigger: false, replace: true })
  },

  _onEventChanged: function () {
    var ch = Radio.channel('events')
    this.event = ch.request('get:model', this.get('eventId'))
    this.availableClasses = ch.request('get:relation', this.get('eventId'), ClassesCollection)
  },

  _onClassChanged: function () {
    var ch = Radio.channel('classes')
    this.class = ch.request('get:model', this.get('classId'))
    this.traits = ch.request('get:relation', this.get('classId'), TraitsCollection)
    this.skills = ch.request('get:relation', this.get('classId'), SkillsCollection)

    this.skills.on('selection:changed', this._updateSkills.bind(this))
  },

  _onSkillsChanged: function () {
    this.get('skillIds').forEach(function (id) {
      this.skills.get(id).set('selected', true)
    }.bind(this))
  },

  toggleSkill: function (id) {
    if (this.skills) this.skills.toggleSkill(id)
  },

  getPHs: function () {
    return _.sum(this.skills.getSelected().pluck('totalcost'))
  }
})

module.exports = CharModel
