var _ = require('lodash')
var $ = require('jquery')
var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var ClassesCollectionView = require('../../class/list/ClassCollectionView')
var ClassesCollection = require('../../../../collections/ClassesCollection')

module.exports = Marionette.View.extend({
  template: require('./single.hbs'),

  templateContext: function () {
    return _.extend({}, this.model, {
      back: this.options.back
    })
  },

  regions: {
    classes: '.classes__region'
  },

  ui: {
    backBtn: '.action__back',
    listBtn: '.action__list'
  },

  events: {
    // 'click @ui.backBtn': function (e) {
    //   e.stopPropagation()
    //   window.history.back()
    // }
    // 'click @ui.listBtn': function (e) {
    //   e.stopPropagation()
    //   Radio.channel('app').trigger(
    //     'navigate',
    //     'events/' + this.options.eventId + '/classes/' + this.options.classId
    //   )
    // }
  },

  initialize: function (options) {
    this.eventClasses = Radio
      .channel('events')
      .request('get:relation', this.options.eventId, ClassesCollection)

    this.eventClasses.on('change', this.render.bind(this))

    if (!this.eventClasses.models.length) {
      $.when(this.eventClasses.fetch()).then(function () {
        console.log('Rendering...')
        this.render()
      }.bind(this))
    }
  },

  onRender: function () {
    var col = _.intersectionWith(
      this.model.relations.classes.models,
      this.eventClasses.models,
      function (a, b) {
        return a.get('id') === b.get('id')
      }
    )

    this.showChildView('classes', new ClassesCollectionView({
      collection: new ClassesCollection(col),
      eventId: this.options.eventId,
      item: 'clases'
    }))
  }
})
