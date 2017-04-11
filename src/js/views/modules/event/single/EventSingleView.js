var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var ClassCollectionView = require('../../class/list/ClassCollectionView')

module.exports = Marionette.View.extend({
  template: require('./single.hbs'),

  ui: {
    createBtn: '.action__char',
    listBtn: '.action__list',
    backBtn: '.action__back'
  },

  regions: {
    classes: '.classes__region'
  },

  events: {
    'mouseup @ui.createBtn': function (e) {
      Radio.channel('char').trigger('link:char', {
        eventId: this.model.get('id')
      }, e)
    }

    // 'click @ui.listBtn': function (e) {
    //   e.stopPropagation()
    //   Radio.channel('app').trigger('navigate', '/')
    // },

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
