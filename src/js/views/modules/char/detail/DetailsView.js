var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var SkillCollectionView = require('../../skill/list/SkillCollectionView')
var SkillTreeCollectionView = require('../../skill/tree/SkillTreeCollectionView')

module.exports = Marionette.View.extend({
  template: require('./details.hbs'),

  templateContext: function () {
    return this.model
  },

  ui: {
    changeClassBtn: '.change-class__action',
    infoBtn: '.info__action',
    phs: '.phs',
    phsLabel: '.phs span'
  },

  regions: {
    skills: '.skills__region',
    traits: '.traits__region'
  },

  events: {
    'mouseup @ui.changeClassBtn': function (e) {
      Radio.channel('char').trigger('link:char', {
        eventId: this.model.event.get('id')
      }, e, { replace: true })
    },

    'mouseup @ui.infoBtn': function (e) {
      Radio.channel('app').trigger(
        'link',
        '/events/' + this.model.event.get('id') + '/classes/' + this.model.class.get('id'),
        e
      )
    }
  },

  initialize: function () {
    this.model.skills.on('selection:changed', this.renderPHs.bind(this))
  },

  onRender: function () {
    if (this.model.class) {
      this.showChildView('skills', new SkillTreeCollectionView({
        item: 'habilidades',
        collection: this.model.skills.getTree(),
        eventId: this.model.event.get('id'),
        classId: this.model.class.get('id'),
        tree: true
      }))
      this.showChildView('traits', new SkillCollectionView({
        item: 'rasgos',
        collection: this.model.traits,
        eventId: this.model.event.get('id'),
        classId: this.model.class.get('id')
      }))
    }
    this.renderPHs()
  },

  renderPHs: function () {
    var max = this.model.skills.getMaxPHs()
    var phs = this.model.skills.getPHs()
    var percent = Math.round(phs * 100 / max)

    this.ui.phsLabel.text(phs)
    this.ui.phs.attr('class', 'phs phs--p' + percent)

    if (phs === max) {
      this.ui.phs.addClass('phs--error')
    } else if (phs > 5 && phs <= 15) {
      this.ui.phs.addClass('phs--good')
    } else if (phs > 15) {
      this.ui.phs.addClass('phs--warning')
    }
  }
})
