var Marionette = require('backbone.marionette')
var Radio = require('backbone.radio')

var popoverTemplate = require('../partials/popover.hbs')

var SkillItemView = Marionette.View.extend({
  template: require('./item.hbs'),

  className: 'col-12 col-md-6 col-xl-4 mb-3',

  ui: {
    'skill': '.card'
  },

  events: {
    'mouseup @ui.skill': function (e) {
      Radio.channel('app').trigger(
        'link',
        '/events/' + this.options.eventId +
        '/classes/' + this.options.classId +
        '/' + this.model.endpoint + '/' + this.model.get('id'),
        e
      )
    }
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
      title: '<i class="ra ra-help" aria-label="true"></i> ' + this.model.get('name')
    })
  },

  onBeforeDetach: function () {
    this.ui.skill.popover('dispose')
  }
})

module.exports = SkillItemView
