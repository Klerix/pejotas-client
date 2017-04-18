var _ = require('lodash')

var BaseCollection = require('./BaseCollection')
var SkillModel = require('../models/SkillModel')

var SkillsCollection = BaseCollection.extend({
  model: SkillModel,
  endpoint: 'skills',

  // Order skills as a tree and add offset to each one
  getTree: function () {
    return new SkillsCollection(this.getSonsOf(0))
  },

  getSonsOf: function (id, offset) {
    offset = offset || 0
    var models = []

    var chunk = _.orderBy(this.where({ skill_id: id }), ['attributes.name'], ['asc'])
    _.each(chunk, function (m) {
      m.set('offset', offset)
      models = _.concat(models, [m], this.getSonsOf(m.get('id'), offset + 1))
    }.bind(this))

    return models
  },

  getSelected: function () {
    return new SkillsCollection(this.where({ selected: true }))
  },

  toggleSkill: function (id) {
    if (this.isSkillSelected(id)) {
      this.unselectSkill(id)
    } else {
      this.selectSkill(id)
    }
  },

  selectSkill: function (id) {
    var skill = this.get(id)
    if (skill) {
      skill.set({ selected: true })

      // Add all parents
      this.selectSkill(skill.get('skill_id'))

      this.trigger('selection:changed')
    }
  },

  unselectSkill: function (id) {
    var skill = this.get(id)
    if (skill) {
      skill.set({ selected: false })

      // Remove children
      this.getSonsOf(id).forEach(function (skill) {
        this.unselectSkill(skill.get('id'))
      }.bind(this))

      this.trigger('selection:changed')
    }
  },

  unselectAll: function () {
    this.models.forEach(function (model) {
      model.set('selected', false)
    })
  },

  isSkillSelected: function (id) {
    return this.get(id).get('selected')
  },

  getPHs: function () {
    return _.sum(this.getSelected().pluck('totalcost'))
  },

  getMaxPHs: function () {
    return _.sum(this.pluck('totalcost'))
  }
})

module.exports = SkillsCollection
