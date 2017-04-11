var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var SkillCollectionView = require('../../skill/list/SkillCollectionView')
var EventCollectionView = require('../../event/list/EventCollectionView')

module.exports = Marionette.View.extend({
  template: require('./single.hbs'),

  regions: {
    traits: '.traits__region',
    skills: '.skills__region',
    events: '.events__region'
  },

  ui: {
    createBtn: '.action__char',
    listBtn: '.action__list',
    backBtn: '.action__back'
  },

  events: {
    'mouseup @ui.createBtn': function (e) {
      Radio.channel('char').trigger('link:char', {
        eventId: this.options.eventId,
        classId: this.model.get('id')
      }, e)
    }

    // 'click @ui.listBtn': function (e) {
    //   e.stopPropagation()
    //   Radio.channel('app').trigger('navigate', 'events/' + this.options.eventId)
    // },

    // 'click @ui.backBtn': function (e) {
    //   e.stopPropagation()
    //   window.history.back()
    // }
  },

  onRender: function () {
    this.showChildView('traits', new SkillCollectionView({
      collection: this.model.relations.traits,
      eventId: this.options.eventId,
      classId: this.model.get('id'),
      item: 'rasgos'
    }))
    this.showChildView('skills', new SkillCollectionView({
      collection: this.model.relations.skills,
      eventId: this.options.eventId,
      classId: this.model.get('id'),
      item: 'habilidades'
    }))
    this.showChildView('events', new EventCollectionView({
      collection: this.model.relations.events,
      eventId: this.options.eventId,
      classId: this.model.get('id'),
      item: 'eventos'
    }))
  }
})
