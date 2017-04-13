var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')
var Clipboard = require('clipboard')

var ClassCollectionView = require('../../class/list/ClassCollectionView')
var DetailsView = require('./DetailsView')

module.exports = Marionette.View.extend({
  template: require('./char.hbs'),

  templateContext: function () {
    return this.model
  },

  ui: {
    name: '.char__name',

    event: '.char__event',
    eventChangeBtn: '.action__event',

    printBtn: '.action__print',

    shareBtn: '.action__share',
    shareModal: '.share__modal',
    shareCopyBtn: '.share-copy__action',
    shareLink: '.modal__share-link',

    chooseClassLbl: '.body__choose-class-label'
  },

  regions: {
    details: {
      replaceElement: true,
      el: '.details__region'
    }
  },

  events: {
    'input @ui.name': function (e) {
      e.stopPropagation()
      this.model.set('name', this.ui.name.val())
    },

    'mouseup @ui.eventChangeBtn': function (e) {
      Radio.channel('app').trigger('link', '/', e)
    },

    'click @ui.shareBtn': function (e) {
      e.stopPropagation()
      this.ui.shareLink.val(window.location)
      this.ui.shareModal.modal()
    }
  },

  onRender: function () {
    /* eslint no-new: "off" */// (This lib does not support it)
    new Clipboard('.modal__share-copy-btn')

    if (this.model.class) {
      this.showChildView('details', new DetailsView({ model: this.model }))
      this.ui.chooseClassLbl.hide()
    } else {
      this.showChildView('details', new ClassCollectionView({
        choosable: true,
        collection: this.model.availableClasses,
        eventId: this.model.event.get('id'),
        item: 'clases'
      }))
      this.ui.chooseClassLbl.show()
    }
  }
})
