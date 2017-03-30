var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var ClassCollectionView = require('../../class/list/ClassCollectionView')

module.exports = Marionette.View.extend({
  template: require('./single.hbs'),

  ui: {
    createBtn: '.btn-primary',
    backBtn: '.btn-secondary'
  },

  regions: {
    classes: '.classes__region'
  },

  events: {
    'click @ui.createBtn': function () {
    },

    'click @ui.backBtn': function (e) {
      e.stopPropagation()
      Radio.channel('app').trigger('navigate', '/')
    }
  },

  onRender: function () {
    var view = new ClassCollectionView({
      collection: this.model.relations.classes,
      eventId: this.model.get('id'),
      item: 'clases'
    })
    this.showChildView('classes', view)
  }
})
