var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var ClassCollectionView = require('../../class/list/ClassCollectionView')

module.exports = Marionette.View.extend({
  template: require('./single.hbs'),

  ui: {
    createBtn: '.action__char',
    listBtn: '.action__list-skills'
  },

  regions: {
    classes: '.classes__region'
  },

  events: {
    'mouseup @ui.createBtn': function (e) {
      Radio.channel('char').trigger('link:char', {
        eventId: this.model.get('id')
      }, e)
    },

    'mouseup @ui.listBtn': function (e) {
      Radio.channel('app').trigger('link', '/skills', e)
    }

    // 'click @ui.backBtn': function (e) {
    //   e.stopPropagation()
    //   window.history.back()
    // }
  },

  onRender: function () {
    this.showChildView('classes', new ClassCollectionView({
      collection: this.model.relations.classes,
      eventId: this.model.get('id'),
      item: 'clases'
    }))
  }
})
