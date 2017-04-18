var _ = require('lodash')
var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var popoverTemplate = require('../../common/popover.hbs')

var ClassItemView = Marionette.View.extend({
  template: require('./item.hbs'),

  templateContext: function () {
    return _.extend({}, this.model.attributes, this.options)
  },

  className: 'col-12 col-sm-6 col-lg-4 col-xl-3',

  ui: {
    card: '.card',
    icon: 'img',
    createBtn: '.btn-primary',
    infoBtn: '.btn-secondary'
  },

  events: {
    'mouseup @ui.icon': function (e) {
      if (this.options.choosable) {
        this.onCreateChar(e)
      } else {
        this.onInfoClick(e)
      }
    },

    'mouseup @ui.card': function (e) {
      if (this.options.choosable) {
        this.onCreateChar(e)
      }
    },
    'mouseup @ui.createBtn': 'onCreateChar',
    'mouseup @ui.infoBtn': 'onInfoClick'
  },

  onCreateChar: function (e) {
    var options = this.options.choosable ? { replace: true } : {}
    Radio.channel('char').trigger('link:char', {
      eventId: this.options.eventId,
      classId: this.model.get('id')
    }, e, options)
  },

  onInfoClick: function (e) {
    Radio.channel('app').trigger(
      'link',
      '/events/' + this.options.eventId + '/' + this.model.endpoint + '/' + this.model.get('id'),
      e
    )
  },

  onRender: function () {
    this.ui.card.popover({
      placement: function (context, source) {
        var rect = source.getBoundingClientRect()
        return (rect.top < (window.outerHeight / 2)) ? 'bottom' : 'top'
      },
      trigger: 'hover',
      content: popoverTemplate(this.model.attributes),
      html: true,
      title: '<i class="ra ra-help" aria-label="true"></i> ' + this.model.get('name'),
      delay: 300
    })
  },

  onBeforeDetach: function () {
    this.ui.card.popover('dispose')
  }
})

module.exports = ClassItemView
