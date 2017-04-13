var Radio = require('backbone.radio')
var Marionette = require('backbone.marionette')

var popoverTemplate = require('../../common/popover.hbs')

module.exports = Marionette.View.extend({
  template: require('../list/item.hbs'),

  className: 'skill col-12 col-md-10',

  ui: {
    skill: '.card',
    icon: 'img.d-flex'
  },

  events: {
    'mouseup @ui.icon': 'onIconClick',

    'mouseup @ui.skill': function (e) {
      this.ui.skill.popover('hide')
      if (e.which === 2 || e.which === 4) {
        this.onIconClick(e)
      } else if (e.which < 2) {
        Radio.channel('char').trigger('skill:toggle', this.model.get('id'))
      }
    }
  },

  onIconClick: function (e) {
    Radio.channel('app').trigger(
      'link',
      '/events/' + this.options.eventId +
      '/classes/' + this.options.classId +
      '/' + this.model.endpoint + '/' + this.model.get('id'),
      e
    )
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render.bind(this))
  },

  onRender: function () {
    this.ui.skill.popover({
      placement: function (context, source) {
        var rect = source.getBoundingClientRect()
        return (rect.top < (window.outerHeight / 2)) ? 'bottom' : 'top'
      },
      trigger: 'hover',
      content: popoverTemplate(this.model.attributes),
      html: true,
      title: '<i class="ra ra-help" aria-label="true"></i> ' + this.model.get('name'),
      delay: 150
    })

    if (this.model.get('offset')) {
      this.$el.addClass('offset-md-' + this.model.get('offset'))
    }

    if (this.model.get('selected')) {
      this.$el.find('.card').addClass('skill--active')
    } else {
      this.$el.find('.card').removeClass('skill--active')
    }
  },

  onBeforeDetach: function () {
    this.ui.skill.popover('dispose')
  }
})
